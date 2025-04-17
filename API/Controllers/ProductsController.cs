using API.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ProductsController(DataContext data) : ControllerBase
{
    private readonly DataContext _data = data;

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _data.Products.ToListAsync();

        if (products == null)
        {
            return NotFound();
        }

        return Ok(products);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProducts(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }
        var product = await _data.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }
}