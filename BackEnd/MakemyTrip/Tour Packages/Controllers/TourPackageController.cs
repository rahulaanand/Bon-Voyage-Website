using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tour_Packages.Interface;
using Tour_Packages.Models;

namespace Tour_Packages.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourPackageController : ControllerBase
    {
        private readonly ITourpackageRepo _tourPackageRepo;

        public TourPackageController(ITourpackageRepo tourPackageRepo)
        {
            _tourPackageRepo = tourPackageRepo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TourPackages>> Get()
        {
            try
            {
                return Ok(_tourPackageRepo.GetTourPackages());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<TourPackages>> Post([FromForm] TourPackages tourPackage, IFormFile imageFile)
        {
            try
            {
                var createdTourPackage = await _tourPackageRepo.CreateTourPackage(tourPackage, imageFile);
                return CreatedAtAction("Get", new { id = createdTourPackage.PackageId }, createdTourPackage);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TourPackages>> GetPackageById(int id)
        {
            try
            {
                var tourPackage = await _tourPackageRepo.GetTourPackageById(id);

                if (tourPackage == null)
                {
                    return NotFound(); // Return 404 if the tour package with the given ID is not found.
                }

                return Ok(tourPackage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("count")]
        public ActionResult<int> GetTourPackageCount()
        {
            try
            {
                int count = _tourPackageRepo.GetTourPackageCount();
                return Ok(count);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Agent/{agentId}")]
        public ActionResult<IEnumerable<TourPackages>> GetTourPackagesByAgentId(int agentId)
        {
            try
            {
                var tourPackages = _tourPackageRepo.GetTourPackages().Where(x => x.AgentId == agentId).ToList();
                return Ok(tourPackages);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("TourId/{id}")]
        public async Task<ActionResult<ICollection<TourPackages>>> GetTourPackageByTourId(int id)
        {
            try
            {
                var tourPackage = await _tourPackageRepo.GetTourPackageByTourId(id);

                if (tourPackage == null)
                {
                    return NotFound(); // Return 404 if the tour package with the given TourId is not found.
                }

                return Ok(tourPackage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("TourAndPackage/{tourId}/{packageId}")]
        public async Task<ActionResult<TourPackages>> GetTourAndPackage(int tourId, int packageId)
        {
            try
            {
                var tourPackage = await _tourPackageRepo.GetTourAndPackageByIds(tourId, packageId);

                if (tourPackage == null)
                {
                    return NotFound(); // Return 404 if the tour package with the given TourId and PackageId is not found.
                }

                return Ok(tourPackage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePackageById(int id)
        {
            try
            {
                var tourPackage = await _tourPackageRepo.GetTourPackageById(id);

                if (tourPackage == null)
                {
                    return NotFound(); // Return 404 if the tour package with the given ID is not found.
                }

                await _tourPackageRepo.DeleteTourPackage(tourPackage); // Assuming you have a method to delete the tour package in your repository.

                return NoContent(); // Return 204 No Content if the delete is successful.
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
