using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Travellers.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }

        // Foreign Key to Traveller entity
        public int TravellerId { get; set; }

        // Navigation property to Traveller entity
        public Traveller? Traveller { get; set; }

        public int PackageId { get; set; }

        public int Rating { get; set; }

        public string Description { get; set; }
    }
}
