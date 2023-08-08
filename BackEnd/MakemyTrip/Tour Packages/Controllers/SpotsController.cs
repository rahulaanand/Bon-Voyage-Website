using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Tour_Packages.Context;
using Tour_Packages.Models;

namespace Tour_Packages.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotsController : ControllerBase
    {
        private readonly PackageContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public SpotsController(PackageContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Spots
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Spot>>> GetSpots()
        {
            if (_context.Spots == null)
            {
                return NotFound();
            }

            return await _context.Spots
                .Include(x => x.TourPackage)
                .ToListAsync();
        }

        // GET: api/Spots/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Spot>> GetSpot(int id)
        {
            if (_context.Spots == null)
            {
                return NotFound();
            }

            var spot = await _context.Spots.FindAsync(id);

            if (spot == null)
            {
                return NotFound();
            }

            return spot;
        }

        // PUT: api/Spots/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpot(int id, Spot spot)
        {
            if (id != spot.SpotId)
            {
                return BadRequest();
            }

            _context.Entry(spot).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpotExists(id))
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

        // POST: api/Spots
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Spot>> PostSpot([FromForm] Spot spot, IFormFile image1, IFormFile image2, IFormFile image3, IFormFile image4, IFormFile image5)
        {
            if (spot == null)
            {
                return BadRequest("Invalid Spot");
            }

            try
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");

                // Handle the first image (image1)
                if (image1 != null && image1.Length > 0)
                {
                    var fileName1 = Guid.NewGuid().ToString() + Path.GetExtension(image1.FileName);
                    var filePath1 = Path.Combine(uploadsFolder, fileName1);

                    using (var stream = new FileStream(filePath1, FileMode.Create))
                    {
                        await image1.CopyToAsync(stream);
                    }

                    spot.Image1 = fileName1;
                }

                // Handle the second image (image2)
                if (image2 != null && image2.Length > 0)
                {
                    var fileName2 = Guid.NewGuid().ToString() + Path.GetExtension(image2.FileName);
                    var filePath2 = Path.Combine(uploadsFolder, fileName2);

                    using (var stream = new FileStream(filePath2, FileMode.Create))
                    {
                        await image2.CopyToAsync(stream);
                    }

                    spot.Image2 = fileName2;
                }

                // Handle the third image (image3)
                if (image3 != null && image3.Length > 0)
                {
                    var fileName3 = Guid.NewGuid().ToString() + Path.GetExtension(image3.FileName);
                    var filePath3 = Path.Combine(uploadsFolder, fileName3);

                    using (var stream = new FileStream(filePath3, FileMode.Create))
                    {
                        await image3.CopyToAsync(stream);
                    }

                    spot.Image3 = fileName3;
                }

                // Handle the fourth image (image4)
                if (image4 != null && image4.Length > 0)
                {
                    var fileName4 = Guid.NewGuid().ToString() + Path.GetExtension(image4.FileName);
                    var filePath4 = Path.Combine(uploadsFolder, fileName4);

                    using (var stream = new FileStream(filePath4, FileMode.Create))
                    {
                        await image4.CopyToAsync(stream);
                    }

                    spot.Image4 = fileName4;
                }

                // Handle the fifth image (image5)
                if (image5 != null && image5.Length > 0)
                {
                    var fileName5 = Guid.NewGuid().ToString() + Path.GetExtension(image5.FileName);
                    var filePath5 = Path.Combine(uploadsFolder, fileName5);

                    using (var stream = new FileStream(filePath5, FileMode.Create))
                    {
                        await image5.CopyToAsync(stream);
                    }

                    spot.Image5 = fileName5;
                }
                var r1 = _context.TourPackages.Find(spot.TourPackage.PackageId);
                spot.TourPackage = r1;
                _context.Spots.Add(spot);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetSpot", new { id = spot.SpotId }, spot);
            }
            catch (DbUpdateException ex)
            {
                // Log or inspect the inner exception message
                var innerExceptionMessage = ex.InnerException?.Message;

                // You can also log the entire exception details if required
                // var fullExceptionMessage = ex.ToString();

                // Handle the error accordingly
                return BadRequest($"Error occurred while saving entity changes. Inner Exception: {innerExceptionMessage}");
            }
            catch (Exception ex)
            {
                // Handle other exceptions
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Spots/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpot(int id)
        {
            if (_context.Spots == null)
            {
                return NotFound();
            }

            var spot = await _context.Spots.FindAsync(id);
            if (spot == null)
            {
                return NotFound();
            }

            _context.Spots.Remove(spot);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SpotExists(int id)
        {
            return (_context.Spots?.Any(e => e.SpotId == id)).GetValueOrDefault();
        }
    }
}
