using SPA_Project_M9_02.Models;

namespace SPA_Project_M9_02.ViewModels
{
    public class PackageFeatureViewModel
    {
        public int PackageFeatureId { get; set; }
       
        public TransPortMode TransportMode { get; set; }
        
        public string HotelBooking { get; set; } = default!;
        public bool Status { get; set; }
      
        public int TourPackageId { get; set; }
        public string PackageName { get; set; } = default!;
        public bool CanDelete { get; set; }
    }
}
