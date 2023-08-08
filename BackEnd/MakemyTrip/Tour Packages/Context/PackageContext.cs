using Microsoft.EntityFrameworkCore;
using Tour_Packages.Models;

namespace Tour_Packages.Context
{
    public class PackageContext : DbContext
    {
        public PackageContext(DbContextOptions<PackageContext> options) : base(options)
        {
        }

        public DbSet<TourPackages> TourPackages { get; set; }
        public DbSet<Spot> Spots { get; set; }
        public DbSet<Itinerary> Itineraries { get; set; }

    }
}
