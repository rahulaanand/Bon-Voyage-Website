using System;
using System.ComponentModel.DataAnnotations;

namespace Travellers.Models
{
    public enum ConfirmationStatus
    {
        [Display(Name = "Requested")]
        Requested,

        [Display(Name = "Confirmed")]
        Confirmed,

        [Display(Name = "Cancelled")]
        Cancelled = 0
    }

    public class Booking
    {
        [Key]
        [RegularExpression("^[0-9]{8}$")]
        public string? BookingId { get; set; }

        // Foreign key to Traveller
        [Required]
        public int TravellerId { get; set; }

        // Navigation property to Traveller
        public Traveller? Traveller { get; set; }

        public int PackageId { get; set; }

        public string Residence { get; set; }

        public int NumberOfPeople { get; set; }

        public ConfirmationStatus IsConfirmed { get; set; }

        public DateTime? BookingDate { get; set; }

        public Booking()
        {
            IsConfirmed = ConfirmationStatus.Requested;
            BookingDate = DateTime.Now; 
        }
    }
}
