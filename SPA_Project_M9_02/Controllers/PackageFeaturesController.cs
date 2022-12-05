using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPA_Project_M9_02.Models;
using SPA_Project_M9_02.Repositories.Interfaces;
using SPA_Project_M9_02.ViewModels;

namespace SPA_Project_M9_02.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageFeaturesController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepo<PackageFeature> repo;

        public PackageFeaturesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<PackageFeature>();
        }

        // GET: api/PackageFeatures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PackageFeature>>> GetPackageFeatures()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<PackageFeatureViewModel>>> GetPackageFeature()
        {
            var data = await this.repo.GetAllAsync(x => x.Include(t => t.TourPackages));
            return data.Select(t => new PackageFeatureViewModel
            {
                PackageFeatureId = t.PackageFeatureId,
                TransportMode = t.TransportMode,
                HotelBooking = t.HotelBooking,
                Status = t.Status,
                TourPackageId = t.TourPackageId,
                PackageName = t.TourPackages.PackageName,
                CanDelete=t.GetHashCode() > 0,
            }).ToList();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<PackageFeature>> GetPackageFeature(int id)
        {
            var order = await this.repo.GetAsync(o => o.PackageFeatureId == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
        // PUT: api/PackageFeatures/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, PackageFeature packagefeature)
        {
            if (id != packagefeature.PackageFeatureId)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(packagefeature);

            try
            {
                await this.unitOfWork.CompleteAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;

            }

            return NoContent();
        }

        // POST: api/PackageFeatures
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PackageFeature>> PostPackageFeature(PackageFeature packagefeature)
        {
            await this.repo.AddAsync(packagefeature);
            await this.unitOfWork.CompleteAsync();

            return packagefeature;
        }

        // DELETE: api/PackageFeatures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackageFeature(int id)
        {
            var packageFeature = await this.repo.GetAsync(o => o.PackageFeatureId == id);
            if (packageFeature == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(packageFeature);
            await this.unitOfWork.CompleteAsync();

            return NoContent();
        }
    }
}
