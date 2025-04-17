using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) :   IdentityDbContext<AppUser,AppRole,string>(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Product>().HasData(
        new List<Product>{
            new Product{Id=1, Name="IPhone 15",Description="Telefon caıklmaası", ImageUrl="1.jpg",Price=600000,Stock=100,IsActive= true},
            new Product{Id=2, Name="IPhone 15 Pro",Description="Telefon caıklmaası", ImageUrl="2.jpg",Price=650000,Stock=75,IsActive= true},
            new Product{Id=3, Name="IPhone 15 Pro max",Description="Telefon caıklmaası", ImageUrl="3.jpg",Price=180000,Stock=85,IsActive= true},
            new Product{Id=4, Name="IPhone 16 ",Description="Telefon caıklmaası", ImageUrl="4.jpg",Price=90000,Stock=60,IsActive= true},
            new Product{Id=5, Name="IPhone 15 pro",Description="Telefon caıklmaası", ImageUrl="5.jpg",Price=85000,Stock=90,IsActive= true},
        });
    }
}