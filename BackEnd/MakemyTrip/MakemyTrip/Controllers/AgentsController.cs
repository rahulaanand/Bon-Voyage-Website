using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MakemyTrip.Models;
using MakemyTrip.Models.DTOs;
using MakemyTrip.Repo;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MakemyTrip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentsController : ControllerBase
    {
        private readonly IAgentRepo _agentRepo;

        public AgentsController(IAgentRepo agentRepo)
        {
            _agentRepo = agentRepo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TravelAgent>> GetTravelAgents()
        {
            var agents = _agentRepo.GetTravelAgents();
            return Ok(agents);
        }

        [HttpGet("{id}")]
        public ActionResult<TravelAgent> GetTravelAgent(int id)
        {
            var agent = _agentRepo.GetTravelAgentById(id);
            if (agent == null)
            {
                return NotFound();
            }
            return Ok(agent);
        }

        [HttpPost]
        public async Task<ActionResult<TravelAgent>> Post([FromForm] TravelAgent agent, IFormFile imageFile)
        {

            try
            {
                var createagent = await _agentRepo.CreateTravelAgent(agent, imageFile);
                return Created("Get", createagent);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TravelAgent>> PutTravelAgent(int id, TravelAgent agent)
        {
            var updatedAgent = await _agentRepo.UpdateTravelAgent(id, agent);
            if (updatedAgent == null)
            {
                return NotFound();
            }
            return Ok(updatedAgent);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTravelAgent(int id)
        {
            var deletedAgent = _agentRepo.DeleteTravelAgent(id);
            if (deletedAgent == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut("UpdateStatus/{id}")]
        public async Task<ActionResult<AgentDTO>> UpdateStatus(int id, AgentDTO statusDTO)
        {
            var result = await _agentRepo.UpdateStatus(id, statusDTO);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPut("DeclineStatus/{id}")]
        public async Task<ActionResult<AgentDTO>> DeclineStatus(int id, AgentDTO statusDTO)
        {
            var result = await _agentRepo.DeclineStatus( id, statusDTO);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpGet("RequestedAgents")]
        public async Task<ActionResult<List<TravelAgent>>> GetRequestedAgents()
        {
            var result = await _agentRepo.GetRequestedAgents();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("AcceptedAgents")]
        public async Task<ActionResult<List<TravelAgent>>> GetAcceptedAgents()
        {
            var result = await _agentRepo.GetAcceptedAgents();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
