using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MakemyTrip.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MakemyTrip.Context;

namespace MakemyTrip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AdminContext _context;

        private const string AdminRole = "Admin";
        private const string AgentRole = "Agent";

        public TokenController(IConfiguration configuration, AdminContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("Admin")]
        public async Task<IActionResult> PostAdmin(Admin adminData)
        {
            if (adminData != null && !string.IsNullOrEmpty(adminData.Admin_Email) && !string.IsNullOrEmpty(adminData.Admin_Password))
            {
                if (adminData.Admin_Email == "admin@gmail.com" && adminData.Admin_Password == "Admin@123")
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Admin_Id", "1"),
                        new Claim("Admin_Email", adminData.Admin_Email),
                        new Claim("Admin_Password", adminData.Admin_Password),
                        new Claim(ClaimTypes.Role, AdminRole)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:ValidIssuer"],
                        _configuration["Jwt:ValidAudience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
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

        [HttpPost("Agents")]
        public async Task<IActionResult> PostAgent(TravelAgent _userData)
        {
            if (_userData != null && !string.IsNullOrEmpty(_userData.AgentName) && !string.IsNullOrEmpty(_userData.AgentPassword))
            {
                var agent = await _context.TravelAgents.FirstOrDefaultAsync(x =>
                    x.AgentName == _userData.AgentName && x.AgentPassword == _userData.AgentPassword);

                if (agent != null && agent.Status == "Accepted")
                {
                    var claims = new[]
                    {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("AgentId", agent.AgentId.ToString()),
                new Claim("AgentName", agent.AgentName),
                new Claim("AgentPassword", agent.AgentPassword),
                new Claim(ClaimTypes.Role, AgentRole)
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
                    login.Id = agent.AgentId;
                    return Ok(login);
                }
                else if (agent != null && agent.Status != "Accepted")
                {
                    return BadRequest("Agent is not accepted.");
                }
                else
                {
                    return BadRequest("Invalid credentials.");
                }
            }
            else
            {
                return BadRequest();
            }
        }


    }
}
