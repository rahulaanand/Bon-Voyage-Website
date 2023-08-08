using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Tour_Packages.Context;
using Tour_Packages.Interface;
using Tour_Packages.Models;

namespace Tour_Packages.Services
{
    public class TourPackageRepo : ITourpackageRepo
    {
        private readonly PackageContext _packageContext;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public TourPackageRepo(PackageContext packageContext, IWebHostEnvironment webHostEnvironment)
        {
            _packageContext = packageContext;
            _webHostEnvironment = webHostEnvironment;
        }

        public IEnumerable<TourPackages> GetTourPackages()
        {
            return _packageContext.TourPackages.Include(t => t.spot).Include(t => t.Itinerary).ToList();
        }

        public async Task<TourPackages> CreateTourPackage([FromForm] TourPackages tour, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            tour.Image = fileName;
            _packageContext.TourPackages.Add(tour);
            await _packageContext.SaveChangesAsync();

            return tour;
        }

        public async Task<TourPackages> GetTourPackageById(int id)
        {
            return await _packageContext.TourPackages
                                         .Include(t => t.spot)
                                         .Include(t => t.Itinerary)
                                         .FirstOrDefaultAsync(t => t.PackageId == id);
        }

        public int GetTourPackageCount()
        {
            return _packageContext.TourPackages.Count();
        }

        public async Task<ICollection<TourPackages>> GetTourPackageByTourId(int tourId)
        {
            return await _packageContext.TourPackages
                                         .Include(t => t.spot)
                                         .Include(t => t.Itinerary)
                                         .Where(t => t.TourId == tourId).ToListAsync();
        }

        public async Task<TourPackages> GetTourAndPackageByIds(int tourId, int packageId)
        {
            return await _packageContext.TourPackages
                                         .Include(t => t.spot)
                                         .Include(t => t.Itinerary)
                                         .FirstOrDefaultAsync(t => t.TourId == tourId && t.PackageId == packageId);
        }

        public async Task DeleteTourPackage(TourPackages tourPackage)
        {
            _packageContext.TourPackages.Remove(tourPackage);
            await _packageContext.SaveChangesAsync();
        }
    }
}
