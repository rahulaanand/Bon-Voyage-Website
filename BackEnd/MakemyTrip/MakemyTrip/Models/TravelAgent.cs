using System.ComponentModel.DataAnnotations;

namespace MakemyTrip.Models
{
    public class TravelAgent
    {
        [Key]
        public int AgentId { get; set; }
        public string? AgentName { get; set; }
        public string? AgentEmail { get; set; }
        public string? AgentPassword { get; set; }
        public string? Description { get; set; }
        public long PhoneNumber { get; set; }
        public string? AgencyImage { get; set; }
        public string? Status { get; set; }
    }
}
