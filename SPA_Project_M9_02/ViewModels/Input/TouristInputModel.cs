using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPA_Project_M9_02.ViewModels.Input
{
    public class TouristInputModel
    {
        public int TouristId { get; set; }
        [Required, StringLength(50), Display(Name = "Tourist Name")]
        public string TouristName { get; set; } = default!;
        [Required, Column(TypeName = "date"), Display(Name = "Booking Date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime BookingDate { get; set; }
        [Required, StringLength(50), Display(Name = "Tourist Occupation")]
        public string TouristOccupation { get; set; } = default!;
        public int TourPackageId { get; set; }
    }
}
