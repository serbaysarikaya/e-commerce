using API.Extensions;
using API.Data;
using API.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Entity;
using Iyzipay.Model;
using Iyzipay;
using Iyzipay.Request;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public OrdersController(DataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpGet()]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            return await _context.Orders
                                        .Include(i => i.OrderItems)
                                        .OrderToDTO()
                                        .Where(i => i.CustomerId == User.Identity!.Name)
                                        .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO?>> GetOrder(int id)
        {
            return await _context.Orders
                               .Include(i => i.OrderItems)
                               .OrderToDTO()
                               .Where(i => i.CustomerId == User.Identity!.Name && i.Id == id)
                               .FirstOrDefaultAsync();
        }
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder([FromBody] CreateOrderDTO orderDTO)
        {
            // Kullanıcının sepetini al
            var cart = await _context.Carts
                                     .Include(i => i.CartItems)
                                     .ThenInclude(i => i.Product)
                                     .FirstOrDefaultAsync(i => i.CustomerId == User.Identity!.Name);

            if (cart == null)
                return BadRequest(new ProblemDetails { Title = "Problem Getting cart" });

            // Sipariş öğelerini oluştur
            var items = new List<Entity.OrderItem>();
            foreach (var item in cart.CartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null) continue; // Ürün yoksa geç

                var orderItem = new Entity.OrderItem
                {
                    ProductId = product.Id,
                    ProductName = product.Name!,
                    ProductImage = product.ImageUrl!,
                    Price = product.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
                product.Stock -= item.Quantity; // Stok güncelleme
            }

            decimal subTotal = items.Sum(i => i.Price * i.Quantity);
            int deliveryFree = 0; // Teslimat ücreti burada ayarlanabilir

            // Yeni siparişi oluştur
            var order = new Order
            {
                OrderItems = items,
                CustomerId = User.Identity!.Name,
                FirstName = orderDTO.FirstName,
                LastName = orderDTO.LastName,
                Phone = orderDTO.Phone,
                City = orderDTO.City,
                AddressLine = orderDTO.AddressLine,
                SubTotal = subTotal,
                DeliveryFree = deliveryFree
            };

            // Ödeme işlemi
            var paymentResult = await ProcessPayment(orderDTO, cart);

            if (paymentResult.Status == "failure")
            {
                return BadRequest(new ProblemDetails { Title = paymentResult.ErrorMessage });
            }

            order.ConversationId = paymentResult.ConversationId;
            order.BasketId = paymentResult.BasketId;

            _context.Orders.Add(order);
            _context.Carts.Remove(cart);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order.Id);

            return BadRequest(new ProblemDetails { Title = "Problem getting order" });
        }
     

        private async Task<Payment> ProcessPayment(CreateOrderDTO model, Cart cart)
        {
            Options options = new Options();
            options.ApiKey = _config["PaymentAPI:APIKey"];
            options.SecretKey = _config["PaymentAPI:SecretKey"];
            options.BaseUrl = "https://sandbox-api.iyzipay.com";

            CreatePaymentRequest request = new CreatePaymentRequest();
            request.Locale = Locale.TR.ToString();
            request.ConversationId = Guid.NewGuid().ToString();

            // 🔹 Basket toplamını doğru hesaplayalım
            decimal totalBasketPrice = cart.CartItems.Sum(item => item.Product.Price * item.Quantity);

            request.Price = cart.CalculateTotal().ToString("F2",System.Globalization.CultureInfo.InvariantCulture);
            request.PaidPrice = cart.CalculateTotal().ToString("F2", System.Globalization.CultureInfo.InvariantCulture);
            request.Currency = Currency.TRY.ToString();
            request.Installment = 1;
            request.BasketId = cart.CartId.ToString();
            request.PaymentChannel = PaymentChannel.WEB.ToString();
            request.PaymentGroup = PaymentGroup.PRODUCT.ToString();

            PaymentCard paymentCard = new PaymentCard();
            paymentCard.CardHolderName = model.CardName;
            paymentCard.CardNumber = model.CardNumber;
            paymentCard.ExpireMonth = model.CardExpireMounth;
            paymentCard.ExpireYear = model.CardExpireYear;
            paymentCard.Cvc = model.CardCvc;
            paymentCard.RegisterCard = 0;
            request.PaymentCard = paymentCard;

            Buyer buyer = new Buyer();
            buyer.Id = Guid.NewGuid().ToString();
            buyer.Name = model.FirstName;
            buyer.Surname = model.LastName;
            buyer.GsmNumber = model.Phone;
            buyer.Email = "email@email.com";
            buyer.IdentityNumber = "74300864791";
            buyer.LastLoginDate = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");
            buyer.RegistrationDate = DateTime.UtcNow.AddYears(-1).ToString("yyyy-MM-dd HH:mm:ss");
            buyer.RegistrationAddress = model.AddressLine;
            buyer.Ip =  "85.34.78.112";
            buyer.City = model.City;
            buyer.Country = "Türkiye";
             buyer.ZipCode = "34732";
            request.Buyer = buyer;

            Address shippingAddress = new Address();
            shippingAddress.ContactName = model.FirstName + " " + model.LastName;
            shippingAddress.City = model.City;
            shippingAddress.Country = "Türkiye";
            shippingAddress.Description = model.AddressLine;
            shippingAddress.ZipCode = "34732";
            request.ShippingAddress = shippingAddress;

            Address billingAddress = new Address();
            billingAddress.ContactName = model.FirstName + " " + model.LastName;
            billingAddress.City = model.City;
            billingAddress.Country = "Türkiye";
            billingAddress.Description = model.AddressLine;
            billingAddress.ZipCode = "34732";
            request.BillingAddress = billingAddress;

            List<BasketItem> basketItems = new List<BasketItem>();

            foreach (var item in cart.CartItems)
            {
                BasketItem basketItem = new BasketItem();
                basketItem.Id = item.ProductId.ToString();
                basketItem.Name = item.Product.Name;
                basketItem.Category1 =  "Genel";
                basketItem.ItemType = BasketItemType.PHYSICAL.ToString();

              
                basketItem.Price = ((double)item.Product.Price * item.Quantity).ToString("F2",System.Globalization.CultureInfo.InvariantCulture);

                basketItems.Add(basketItem);
            }

            request.BasketItems = basketItems;

       Payment payRequest=     await Payment.Create(request, options);
            return payRequest;
        }

    }
}