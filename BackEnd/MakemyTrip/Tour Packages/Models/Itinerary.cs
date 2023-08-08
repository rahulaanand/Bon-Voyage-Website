using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tour_Packages.Models
{
    public class Itinerary
    {
        [Key]
        public int ItineraryId { get; set; }

        public string ItineraryDetails { get; set; }

        public TourPackages TourPackage { get; set; }
    }
}
