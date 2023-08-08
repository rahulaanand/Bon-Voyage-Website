using System.ComponentModel.DataAnnotations;

namespace Tour_Package.Models
{
    public class SpotImages
    {
        [Key]

        public int SpotId { get; set; }

        public string? image1 { get; set; }

        public string? image2 { get; set; }

        public string? image3 { get; set; }

        public string? image4 { get; set; }

        public string? image5 { get; set; }

        public TourPackages? TourPackages { get; set; }
    }
}
