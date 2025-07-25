using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;


public class TokenService(UserManager<AppUser> userManager, IConfiguration config)
{
    private readonly UserManager<AppUser> _userManager = userManager;
    private readonly IConfiguration _config = config;

    public async Task<string> GenerateToken(AppUser user)
    {
        var claim = new List<Claim>()
        {
            new Claim(ClaimTypes.Email,user.Email!),
            new Claim(ClaimTypes.NameIdentifier,user.Id!),
            new Claim(ClaimTypes.Name,user.UserName!),
        };

        var roles = await _userManager.GetRolesAsync(user);

        foreach (var role in roles)
        {
            claim.Add(new Claim(ClaimTypes.Role, role));
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["JWTSecurity:SecretKey"]!));

        var tokenSettings = new SecurityTokenDescriptor
        {
               Subject = new ClaimsIdentity(claim),
               Expires =DateTime.Now.AddDays(30),
               SigningCredentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha256Signature),
    
        };

        var token = tokenHandler.CreateToken(tokenSettings);

        return  tokenHandler.WriteToken(token);

    }

}