using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ErrorController : ControllerBase
{
    [HttpGet("bad-request")]
    public IActionResult BadRequestError()
    {
        return BadRequest();//400
    }

    [HttpGet("unauhtorized")]
    public IActionResult UnAuthorizeError()
    {
        return Unauthorized(); //401
    }

    [HttpGet("not-found")]
    public IActionResult NotFoundError()
    {
        return NotFound();//404
    }

    [HttpGet("validation-error")]
    public IActionResult ValidationError()
    {
        ModelState.AddModelError("Validation Error 1", "Validaiton error details");
        ModelState.AddModelError("Validation Error 2", "Validaiton error details");
        return ValidationProblem();
    }

    [HttpGet("server-error")]
    public IActionResult ServerError()
    {
        throw new Exception("Server Error!"); //
    }
}