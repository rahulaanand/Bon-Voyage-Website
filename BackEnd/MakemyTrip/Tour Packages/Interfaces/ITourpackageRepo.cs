using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Tour_Packages.Models;

namespace Tour_Packages.Interface
{
    public interface ITourpackageRepo
    {
        IEnumerable<TourPackages> GetTourPackages();
        Task<TourPackages> CreateTourPackage(TourPackages tourPackage, IFormFile imageFile);

        Task<TourPackages> GetTourPackageById(int id);
        public int GetTourPackageCount();
        Task DeleteTourPackage(TourPackages tourPackage);

        public Task<ICollection<TourPackages>> GetTourPackageByTourId(int tourId);

        Task<TourPackages> GetTourAndPackageByIds(int tourId, int packageId); // New method

    }
}
