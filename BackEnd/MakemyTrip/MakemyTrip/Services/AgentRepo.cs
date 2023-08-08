using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MakemyTrip.Context;
using MakemyTrip.Models;
using MakemyTrip.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace MakemyTrip.Repo
{
    public class AgentRepo : IAgentRepo
    {
        private readonly AdminContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AgentRepo(AdminContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public IEnumerable<TravelAgent> GetTravelAgents()
        {
            return _context.TravelAgents.ToList();
        }

        public TravelAgent GetTravelAgentById(int agentId)
        {
            return _context.TravelAgents.FirstOrDefault(a => a.AgentId == agentId);
        }

        public async Task<TravelAgent> CreateTravelAgent([FromForm] TravelAgent agent, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }
            agent.Status = "Requested";

            agent.AgencyImage = fileName;


            _context.TravelAgents.Add(agent);
            await _context.SaveChangesAsync();

            return agent;
        }
        public async Task<TravelAgent> UpdateTravelAgent(int agentId, TravelAgent agent)
        {
            var existingAgent = await _context.TravelAgents.FindAsync(agentId);
            if (existingAgent == null)
            {
                return null;
            }

            existingAgent.AgentName = agent.AgentName;
            existingAgent.AgentEmail = agent.AgentEmail;
            existingAgent.AgentPassword = agent.AgentPassword;
            existingAgent.Description = agent.Description;
            existingAgent.PhoneNumber = agent.PhoneNumber;

            await _context.SaveChangesAsync();

            return existingAgent;
        }

        public TravelAgent DeleteTravelAgent(int agentId)
        {
            var agent = _context.TravelAgents.FirstOrDefault(a => a.AgentId == agentId);
            if (agent != null)
            {
                _context.TravelAgents.Remove(agent);
                _context.SaveChanges();
                return agent;
            }
            return null;
        }

        public async Task<AgentDTO> UpdateStatus(int agentId, AgentDTO statusDTO)
        {
            var agent = await _context.TravelAgents.FirstOrDefaultAsync(a => a.AgentId == agentId);
            if (agent != null)
            {
                if (agent.Status == "Requested")
                {
                    agent.Status = "Accepted";
                    await _context.SaveChangesAsync();
                    return statusDTO;
                }
                return statusDTO;
            }
            return null;
        }

        public async Task<ActionResult<AgentDTO>> DeclineStatus(int agentId, AgentDTO statusDTO)
        {
            var agent = await _context.TravelAgents.FirstOrDefaultAsync(a => a.AgentId == agentId);
            if (agent != null)
            {
                if (agent.Status == "Accepted" || agent.Status == "Requested")
                {
                    agent.Status = "Declined";
                    await _context.SaveChangesAsync();
                    return statusDTO;
                }
            }
            return null; 
        }



        public async Task<List<TravelAgent>> GetRequestedAgents()
        {
            var requestedAgents = await _context.TravelAgents.Where(agent => agent.Status == "Requested").ToListAsync();
            if (requestedAgents != null)
            {
                return requestedAgents;
            }
            return null;
        }

        public async Task<List<TravelAgent>> GetAcceptedAgents()
        {
            var acceptedAgents = await _context.TravelAgents.Where(agent => agent.Status == "Accepted").ToListAsync();
            if (acceptedAgents != null)
            {
                return acceptedAgents;
            }
            return null;
        }
    }
}
