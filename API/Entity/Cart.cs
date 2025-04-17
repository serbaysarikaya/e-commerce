using System.ComponentModel.DataAnnotations;

namespace API.Entity;

public class Cart
{
    [Key]
    public int CartId { get; set; }
    public string CustomerId { get; set; } = null!;
    public List<CartItem> CartItems { get; set; } = new List<CartItem>();

    public void AddItems(Product product, int quantity)
    {
        var item = CartItems.Where(x => x.ProductId == product.Id).FirstOrDefault();

        if (item == null)
        {
            CartItems.Add(new CartItem { Product = product, Quantity = quantity });
        }
        else
        {

            item.Quantity += quantity;
        }

    }

    public void DeleteItems(int productId, int quantity)
    {
        var item = CartItems.Where(p => p.ProductId == productId).FirstOrDefault();

        if (item == null) return;

        item.Quantity -= quantity;

        if (item.Quantity == 0)
        {
            CartItems.Remove(item);
        }

    }

    internal void AddItem(Product product, int quantity)
    {
        throw new NotImplementedException();
    }

    public double CalculateTotal()
    {
        return (double)CartItems.Sum(x => x.Product.Price * x.Quantity);
    }
}
public class CartItem
{
    [Key]
    public int CartItemId { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public int CartId { get; set; }
    // public Cart Cart { get; set; } = null!;
    public int Quantity { get; set; } = 0;


}