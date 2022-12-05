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
    public class TourPackagesController : ControllerBase
    {
        IUnitOfWork unitOfWork;
        IGenericRepo<TourPackage> repo;

        public TourPackagesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<TourPackage>();
        }

        // GET: api/TravelAgents
        public async Task<ActionResult<IEnumerable<TourPackage>>> GetTourPackages()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<TourPackageViewModel>>> GetTourPackageViewModels()
        {
            var data = await this.repo.GetAllAsync();
            return data.Select(t => new TourPackageViewModel
            {
                TourPackageId = t.TourPackageId,
                PackageCategory = t.PackageCategory,
                PackageName = t.PackageName,
                CostPerPerson = t.CostPerPerson,
                TourTime = t.TourTime,
                CanDelete = t.PackageFeatures.Count == 0
            }).ToList();
        }
        [HttpGet("WithTourist")]
        public async Task<ActionResult<IEnumerable<TourPackage>>> GetPackageFeatures()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        // GET: api/TravelAgents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TourPackage>> GetTourPackage(int id)
        {
            var customer = await this.repo.GetAsync(c => c.TourPackageId == id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }
        [HttpGet("{id}/WithTourists")]
        public async Task<ActionResult<TourPackage>> GetTourPackageWithTourists(int id)
        {
            var customer = await this.repo.GetAsync(c => c.TourPackageId == id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }
        // PUT: api/TravelAgents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTourPackage(int id, TourPackage tourpackage)
        {
            if (id != tourpackage.TourPackageId)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(tourpackage);

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

        // POST: api/TravelAgents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TourPackage>> PostTourPackage(TourPackage tourpackage)
        {
            await this.repo.AddAsync(tourpackage);
            await unitOfWork.CompleteAsync();

            return tourpackage;
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTourPackage(int id)
        {
            var travelagent = await repo.GetAsync(c => c.TourPackageId == id);
            if (travelagent == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(travelagent);
            await unitOfWork.CompleteAsync();

            return NoContent();
        }
    }
}
