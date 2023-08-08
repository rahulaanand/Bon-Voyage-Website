using System.Collections.Generic;
using System.Threading.Tasks;
using MakemyTrip.Models;
using MakemyTrip.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace MakemyTrip.Repo
{
    public interface IAgentRepo
    {
        public IEnumerable<TravelAgent> GetTravelAgents();
        public TravelAgent GetTravelAgentById(int agentId);
        Task<TravelAgent> CreateTravelAgent([FromForm] TravelAgent agent, IFormFile imageFile);
        Task<TravelAgent> UpdateTravelAgent(int agentId, TravelAgent agent);
        public TravelAgent DeleteTravelAgent(int agentId);
        public Task<AgentDTO> UpdateStatus(int agentId, AgentDTO statusDTO);
        public Task<ActionResult<AgentDTO>> DeclineStatus(int agentId, AgentDTO statusDTO);

        public Task<List<TravelAgent>> GetRequestedAgents();
        public Task<List<TravelAgent>> GetAcceptedAgents();
    }
}
