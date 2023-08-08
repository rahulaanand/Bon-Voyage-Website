using System.ComponentModel.DataAnnotations;

namespace MakemyTrip.Models
{
    public class ImageGallery
    {
        [Key]
        public int TourId { get; set; }
        public string? TourName { get; set; }
        public string? LocationImage { get; set; }
        public string? Description { get; set; }
    }
}
