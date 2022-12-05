using System.ComponentModel.DataAnnotations;

namespace SPA_Project_M9_02.ViewModels
{
    public class TravelAgentViewModel
    {
        public int TravelAgentId { get; set; }
        [Required, StringLength(50), Display(Name = "Agent Name")]
        public string AgentName { get; set; } = default!;
        [Required, StringLength(50), DataType(DataType.EmailAddress)]
        public string Email { get; set; } = default!;
        [Required, StringLength(70), Display(Name = "Agent Address")]
        public string AgentAddress { get; set; } = default!;
        public bool CanDelete { get; set; }
    }
}
