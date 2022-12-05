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
    public class TravelAgentsController : ControllerBase
    {
        IUnitOfWork unitOfWork;
        IGenericRepo<TravelAgent> repo;

        public TravelAgentsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<TravelAgent>();
        }

        // GET: api/TravelAgents
        public async Task<ActionResult<IEnumerable<TravelAgent>>> GetTravelAgents()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<TravelAgentViewModel>>> GetTravelAgentViewModels()
        {
            var data = await this.repo.GetAllAsync(x => x.Include(t => t.AgentTourPackages).ThenInclude(t=>t.TourPackages));
            return data.Select(t => new TravelAgentViewModel
            {
                TravelAgentId = t.TravelAgentId,
                AgentName = t.AgentName,
                Email = t.Email,
                AgentAddress = t.AgentAddress,
                CanDelete = t.GetHashCode() > 0,
            }).ToList();
        }
        [HttpGet("WithOrders")]
        public async Task<ActionResult<IEnumerable<TravelAgent>>> GetTravelAgentWithPackages()
        {
            var data = await this.repo.GetAllAsync(x => x.Include(t => t.AgentTourPackages));
            return data.ToList();
        }
        // GET: api/TravelAgents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TravelAgent>> GetTravelAgent(int id)
        {
            var customer = await this.repo.GetAsync(c => c.TravelAgentId == id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }
        [HttpGet("{id}/OI")]
        public async Task<ActionResult<TravelAgent>> GetAgentWithPackage(int id)
        {
            var order = await this.repo.GetAsync(o => o.TravelAgentId == id, x => x.Include(o => o.AgentTourPackages).ThenInclude(oi => oi.TourPackages));

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
        // PUT: api/TravelAgents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTravelAgent(int id, TravelAgent travelagent)
        {
            if (id != travelagent.TravelAgentId)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(travelagent);

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
        public async Task<ActionResult<TravelAgent>> PostTravelAgent(TravelAgent travelagent)
        {
            await this.repo.AddAsync(travelagent);
            await unitOfWork.CompleteAsync();

            return travelagent;
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTravelAgent(int id)
        {
            var travelagent = await repo.GetAsync(c => c.TravelAgentId == id);
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
