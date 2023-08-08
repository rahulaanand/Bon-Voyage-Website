using MakemyTrip.Models;
using Microsoft.EntityFrameworkCore;

namespace MakemyTrip.Context
{
    public class AdminContext : DbContext
    {
        public  DbSet<Admin> Admins { get; set; }

        public DbSet< TravelAgent> TravelAgents { get; set; }

        public DbSet<ImageGallery> ImageGallery { get; set; }   
        public AdminContext(DbContextOptions<AdminContext> options) : base(options) 
        {
            
        }
    }
}
