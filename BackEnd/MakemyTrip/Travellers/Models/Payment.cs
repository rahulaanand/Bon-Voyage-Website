using System.ComponentModel.DataAnnotations;

namespace Travellers.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }

        [Required]
        public string BookingId { get; set; } 

        [Required]
        public string CardNumber { get; set; }

        [Required]
        public int ExpiryMonth { get; set; }

        [Required]
        public int ExpiryYear { get; set; }

        [Required]
        public string NameOnCard { get; set; }

        [Required]
        [Range(100, 999)]
        public int CVVNumber { get; set; }

        // Navigation property to Booking
        public Booking? Booking { get; set; }
    }
}
