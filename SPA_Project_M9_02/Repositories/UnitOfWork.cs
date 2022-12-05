using SPA_Project_M9_02.Models;
using SPA_Project_M9_02.Repositories.Interfaces;

namespace SPA_Project_M9_02.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        TravelTourDbContext db;
        public UnitOfWork(TravelTourDbContext db)
        {
            this.db = db;
        }
        public async Task CompleteAsync()
        {
            await db.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.db.Dispose();
        }

        public IGenericRepo<T> GetRepo<T>() where T : class, new()
        {
            return new GenericRepo<T>(this.db);
        }
    }
}
