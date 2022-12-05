using SPA_Project_M9_02.Models;
using System.ComponentModel.DataAnnotations;

namespace SPA_Project_M9_02.ViewModels
{
    public class TourPackageViewModel
    {
        public int TourPackageId { get; set; }
        public PakageCategory PackageCategory { get; set; }
        [Required, StringLength(50), Display(Name = "Package Name")]
        public string PackageName { get; set; } = default!;
        [Required, Display(Name = "Cost Per Person"), DisplayFormat(DataFormatString = "{0:0.00}", ApplyFormatInEditMode = true)]
        public decimal CostPerPerson { get; set; }
        [Required, Display(Name = "Tour Time")]
        public int TourTime { get; set; }
        public bool CanDelete { get; set; }
    }
}
