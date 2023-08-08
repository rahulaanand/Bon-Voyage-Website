using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravellersController : ControllerBase
    {
        private readonly ITravelRepo _travelRepo;

        public TravellersController(ITravelRepo travelRepo)
        {
            _travelRepo = travelRepo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Traveller>> GetTravellers()
        {
            try
            {
                var travellers = _travelRepo.GetTravellers();
                return Ok(travellers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Traveller> AddTraveller(Traveller traveller)
        {
            try
            {
                var addedTraveller = _travelRepo.PostTraveller(traveller);
                return Ok(addedTraveller);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{travellerId}")]
        public IActionResult UpdateTraveller(int travellerId, Traveller traveller)
        {
            try
            {
                if (travellerId != traveller.TravelerId)
                    return BadRequest("Invalid traveller ID");

                _travelRepo.PostTraveller(traveller);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{travellerId}")]
        public IActionResult DeleteTraveller(int travellerId)
        {
            try
            {
                _travelRepo.DeleteTraveller(travellerId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetTravellerById(int id)
        {
            var traveller = _travelRepo.GetTravellerById(id);
            if (traveller == null)
            {
                return NotFound();
            }
            return Ok(traveller);
        }
    }
}
