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
using SPA_Project_M9_02.ViewModels.Input;

namespace SPA_Project_M9_02.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TouristsController : ControllerBase
    {
        private IWebHostEnvironment env;
        IUnitOfWork unitOfWork;
        IGenericRepo<Tourist> repo;
        public TouristsController(IUnitOfWork unitOfWork, IWebHostEnvironment env)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<Tourist>();
            this.env = env;
        }

        // GET: api/Tourists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tourist>>> GetTourists()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<TouristViewModel>>> GetTouristViewModels()
        {
            var data = await this.repo.GetAllAsync(p => p.Include(x => x.TourPackages));
            return data.ToList().Select(p => new TouristViewModel
            {
                TouristId = p.TouristId,
                TouristName = p.TouristName,
                BookingDate = p.BookingDate,
                TouristOccupation = p.TouristOccupation,
                TouristPicture=p.TouristPicture,
                TourPackageId = p.TourPackageId,
                PackageName = p.TourPackages.PackageName,
                CanDelete = p.GetHashCode() > 0

            }).ToList();
        }
        // GET: api/Tourists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tourist>> GetTourist(int id)
        {
            var product = await this.repo.GetAsync(x => x.TouristId == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Tourists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Tourist tourist)
        {
            if (id != tourist.TouristId)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(tourist);

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
        [HttpPut("{id}/VM")]
        public async Task<IActionResult> PutProductViewModel(int id, TouristInputModel tourist)
        {
            if (id != tourist.TouristId)
            {
                return BadRequest();
            }

            var existing = await this.repo.GetAsync(p => p.TouristId == id);
            if (existing != null)
            {
                existing.TouristName = tourist.TouristName;
                existing.BookingDate = tourist.BookingDate;
                existing.TouristOccupation = tourist.TouristOccupation;
                existing.TourPackageId = tourist.TourPackageId;
                await this.repo.UpdateAsync(existing);
            }

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

        // POST: api/Tourists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tourist>> PostTourist(Tourist tourist)
        {
            await this.repo.AddAsync(tourist);
            await this.unitOfWork.CompleteAsync();

            return tourist;
        }
        [HttpPost("VM")]
        public async Task<ActionResult<Tourist>> PostProductInput(TouristInputModel tourist)
        {
            var newTourist = new Tourist
            {
                TouristName = tourist.TouristName,
                BookingDate = tourist.BookingDate,
                TouristOccupation = tourist.TouristOccupation,
                TourPackageId = tourist.TourPackageId,
                TouristPicture = "no-product-image-400x400.png"
            };
            await this.repo.AddAsync(newTourist);
            await this.unitOfWork.CompleteAsync();

            return newTourist;
        }
        [HttpPost("Upload/{id}")]
        public async Task<ImagePathResponse> UploadPicture(int id, IFormFile picture)
        {
            var product = await this.repo.GetAsync(p => p.TouristId == id);
            var ext = Path.GetExtension(picture.FileName);
            string fileName = Guid.NewGuid() + ext;
            string savePath = Path.Combine(this.env.WebRootPath, "Pictures", fileName);
            FileStream fs = new FileStream(savePath, FileMode.Create);
            picture.CopyTo(fs);
            fs.Close();
            product.TouristPicture = fileName;
            await this.repo.UpdateAsync(product);
            await this.unitOfWork.CompleteAsync();
            return new ImagePathResponse { PictureName = fileName };
        }
        // DELETE: api/Tourists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTourist(int id)
        {
            var tourist = await this.repo.GetAsync(p => p.TouristId == id);
            if (tourist == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(tourist);
            await this.unitOfWork.CompleteAsync();

            return NoContent();
        }
    }
}
