using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Travellers.Models
{
    public class Traveller
    {
        [Key]
        public int TravelerId { get; set; }

        public string TravelerName { get; set; }

        public string? TravelerEmail { get; set; }

        public long PhoneNumber { get; set; }

        public string Password { get; set; }

        // Navigation property to Bookings
        public ICollection<Booking>? Bookings { get; set; }
    }
}
