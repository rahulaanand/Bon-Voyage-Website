using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Travellers.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Travellers.Context;


namespace Travellers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly TravelContext _context;

        private const string TravellerRole = "Traveller";

        public TokenController(IConfiguration configuration, TravelContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("Traveller")]
        public async Task<ActionResult<LoginDTO>> PostTraveller(Traveller credentials)
        {
            if (credentials != null && !string.IsNullOrEmpty(credentials.TravelerName) && !string.IsNullOrEmpty(credentials.Password))
            {
                var traveller = await _context.Travellers.FirstOrDefaultAsync(x =>
                    x.TravelerName == credentials.TravelerName && x.Password == credentials.Password);

                if (traveller != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("TravelerId", traveller.TravelerId.ToString()),
                        new Claim("TravelerName", traveller.TravelerName),
                        new Claim(ClaimTypes.Role, TravellerRole)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:ValidIssuer"],
                        _configuration["Jwt:ValidAudience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: signIn);
                    LoginDTO login = new LoginDTO();
                    login.Token = new JwtSecurityTokenHandler().WriteToken(token);
                    login.Id = traveller.TravelerId;
                    return Ok(login);
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
