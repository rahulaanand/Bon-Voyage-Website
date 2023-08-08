using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tour_Packages.Context;
using Tour_Packages.Models;

namespace Tour_Packages.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItinerariesController : ControllerBase
    {
        private readonly PackageContext _context;

        public ItinerariesController(PackageContext context)
        {
            _context = context;
        }

        // GET: api/Itineraries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Itinerary>>> GetItineraries()
        {
            var itineraries = await _context.Itineraries
                             .Include(x => x.TourPackage)
                                .ToListAsync();
            return Ok(itineraries);
        }

        // GET: api/Itineraries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Itinerary>> GetItinerary(int id)
        {
            var itinerary = await _context.Itineraries.FindAsync(id);
            if (itinerary == null)
            {
                return NotFound();
            }
            return Ok(itinerary);
        }

        // POST: api/Itineraries
        [HttpPost]
        public async Task<IActionResult> PostItinerary(Itinerary itinerary)
        {
            if (itinerary == null)
            {
                return BadRequest("Itinerary object is null.");
            }
            var r1 = _context.TourPackages.Find(itinerary.TourPackage.PackageId);
            itinerary.TourPackage = r1;
            _context.Itineraries.Add(itinerary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItinerary", new { id = itinerary.ItineraryId }, itinerary);
        }

        // PUT: api/Itineraries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItinerary(int id, Itinerary itinerary)
        {
            if (id != itinerary.ItineraryId)
            {
                return BadRequest();
            }

            _context.Entry(itinerary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItineraryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Itineraries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItinerary(int id)
        {
            var itinerary = await _context.Itineraries.FindAsync(id);
            if (itinerary == null)
            {
                return NotFound();
            }

            _context.Itineraries.Remove(itinerary);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItineraryExists(int id)
        {
            return _context.Itineraries.Any(e => e.ItineraryId == id);
        }
    }
}
