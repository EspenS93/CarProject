using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class EgenutviklingContext : DbContext
    {
        public EgenutviklingContext(DbContextOptions<EgenutviklingContext> options)
            : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Application> Applications { get; set; }

    }
}