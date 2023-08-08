using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tour_Packages.Models
{
    public class TourPackages
    {
        [Key]

        public int PackageId { get; set; }
        public int AgentId { get; set; }
        public int TourId { get; set; }
        public string? PackageName { get; set; }
        public int? Price { get; set; }
        public string? Duration { get; set; }
        public string? Description { get; set; }
        public string? HotelName { get; set; }
        public string? VacationType { get; set; }
        public string? Image { get; set; }
        public ICollection<Spot>? spot { get; set; }
        public ICollection<Itinerary>? Itinerary { get; set; }
    }
}
