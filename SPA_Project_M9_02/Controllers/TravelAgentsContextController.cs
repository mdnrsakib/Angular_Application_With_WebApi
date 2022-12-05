using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPA_Project_M9_02.Models;

namespace SPA_Project_M9_02.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelAgentsContextController : ControllerBase
    {
        private readonly TravelTourDbContext _context;

        public TravelAgentsContextController(TravelTourDbContext context)
        {
            _context = context;
        }

        // GET: api/TravelAgentsContext
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TravelAgent>>> GetTravelAgents()
        {
            return await _context.TravelAgents.ToListAsync();
        }

        // GET: api/TravelAgentsContext/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TravelAgent>> GetTravelAgent(int id)
        {
            var travelAgent = await _context.TravelAgents.FindAsync(id);

            if (travelAgent == null)
            {
                return NotFound();
            }

            return travelAgent;
        }

        // PUT: api/TravelAgentsContext/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTravelAgent(int id, TravelAgent travelAgent)
        {
            if (id != travelAgent.TravelAgentId)
            {
                return BadRequest();
            }

            _context.Entry(travelAgent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TravelAgentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpPut("VM/{id}")]
        public async Task<IActionResult> PutTravelagentWithAgentTourPackages(int id, TravelAgent travelAgent)
        {
            if (id != travelAgent.TravelAgentId)
            {
                return BadRequest();
            }
            var existing = await _context.TravelAgents.Include(x => x.AgentTourPackages).FirstAsync(o => o.TravelAgentId == id);
            _context.AgentTourPackages.RemoveRange(existing.AgentTourPackages);
            foreach (var item in travelAgent.AgentTourPackages)
            {
                _context.AgentTourPackages.Add(new AgentTourPackage { TravelAgentId = travelAgent.TravelAgentId, TourPackageId = item.TourPackageId});
            }
            _context.Entry(existing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw ex.InnerException;

            }

            return NoContent();
        }
        // POST: api/TravelAgentsContext
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TravelAgent>> PostTravelAgent(TravelAgent travelAgent)
        {
            _context.TravelAgents.Add(travelAgent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTravelAgent", new { id = travelAgent.TravelAgentId }, travelAgent);
        }

        // DELETE: api/TravelAgentsContext/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTravelAgent(int id)
        {
            var travelAgent = await _context.TravelAgents.FindAsync(id);
            if (travelAgent == null)
            {
                return NotFound();
            }

            _context.TravelAgents.Remove(travelAgent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TravelAgentExists(int id)
        {
            return _context.TravelAgents.Any(e => e.TravelAgentId == id);
        }
    }
}
