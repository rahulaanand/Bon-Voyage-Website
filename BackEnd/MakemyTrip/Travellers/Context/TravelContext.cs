using Microsoft.EntityFrameworkCore;
using Travellers.Models;

namespace Travellers.Context
{
    public class TravelContext : DbContext
    {
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Traveller> Travellers { get; set; }
        public DbSet<Payment> Payment { get; set; } 
        public DbSet<Feedback> Feedbacks { get; set; }


        public TravelContext(DbContextOptions<TravelContext> options) : base(options)
        {
        }
    }
}
