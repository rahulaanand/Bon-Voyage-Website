using System.ComponentModel.DataAnnotations;

namespace Tour_Package.Models
{
    public class TourPackages
    {
        [Key]
        public int PackageId { get; set; }
        public int AgentId { get; set; } 
        public string PackageName { get; set; }
        public string Speciality { get; set; }
        public string Hotel { get; set; }
        public string Iternary { get; set; }
        public int Price { get; set; }
        public string VacationType { get; set; }
        public string VacationDuration { get; set; }
        public ICollection<SpotImages> SpotImages { get; set; }

    }
}
