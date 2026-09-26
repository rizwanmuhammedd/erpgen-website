using ERPGen.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ERPGen.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<ContactEnquiry> ContactEnquiries => Set<ContactEnquiry>();
    public DbSet<ProductCategory> ProductCategories => Set<ProductCategory>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Warehouse> Warehouses => Set<Warehouse>();
    public DbSet<StockBalance> StockBalances => Set<StockBalance>();
    public DbSet<StockMovement> StockMovements => Set<StockMovement>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Supplier> Suppliers => Set<Supplier>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Contact Enquiry entity configuration
        builder.Entity<ContactEnquiry>(entity =>
        {
            entity.ToTable("ContactEnquiries");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(256);
            entity.Property(e => e.Phone).HasMaxLength(50);
            entity.Property(e => e.Message).IsRequired().HasMaxLength(4000);
            entity.Property(e => e.IpAddress).HasMaxLength(50);
            entity.Property(e => e.Status).IsRequired().HasConversion<int>();
            entity.Property(e => e.CreatedAt).IsRequired();

            entity.HasIndex(e => e.Status);
            entity.HasIndex(e => e.CreatedAt);
            entity.HasIndex(e => e.Email);
        });

        // Refresh Token entity configuration
        builder.Entity<RefreshToken>(entity =>
        {
            entity.ToTable("RefreshTokens");
            entity.HasKey(r => r.Id);
            entity.Property(r => r.Token).IsRequired().HasMaxLength(500);
            entity.Property(r => r.JwtId).IsRequired().HasMaxLength(200);
            entity.Property(r => r.UserId).IsRequired();

            entity.HasIndex(r => r.Token).IsUnique();
            entity.HasIndex(r => r.UserId);

            entity.HasOne(r => r.User)
                  .WithMany(u => u.RefreshTokens)
                  .HasForeignKey(r => r.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Application User entity configuration
        builder.Entity<ApplicationUser>(entity =>
        {
            entity.Property(u => u.FullName).HasMaxLength(150);
        });

        // Product Category entity configuration
        builder.Entity<ProductCategory>(entity =>
        {
            entity.ToTable("ProductCategories");
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Name).IsRequired().HasMaxLength(150);
            entity.Property(c => c.Description).HasMaxLength(500);
            entity.Property(c => c.IsActive).IsRequired();
            entity.Property(c => c.CreatedAt).IsRequired();

            entity.HasIndex(c => c.Name).IsUnique();
            entity.HasIndex(c => c.IsActive);
        });

        // Product entity configuration
        builder.Entity<Product>(entity =>
        {
            entity.ToTable("Products");
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).IsRequired().HasMaxLength(200);
            entity.Property(p => p.SKU).IsRequired().HasMaxLength(100);
            entity.Property(p => p.Description).HasMaxLength(2000);
            entity.Property(p => p.Unit).IsRequired().HasMaxLength(50);
            entity.Property(p => p.CostPrice).HasPrecision(18, 2);
            entity.Property(p => p.SellingPrice).HasPrecision(18, 2);
            entity.Property(p => p.IsActive).IsRequired();
            entity.Property(p => p.CreatedAt).IsRequired();

            entity.HasIndex(p => p.SKU).IsUnique();
            entity.HasIndex(p => p.Name);
            entity.HasIndex(p => p.CategoryId);
            entity.HasIndex(p => p.IsActive);
            entity.HasIndex(p => p.CreatedAt);

            entity.HasOne(p => p.Category)
                  .WithMany(c => c.Products)
                  .HasForeignKey(p => p.CategoryId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Warehouse entity configuration
        builder.Entity<Warehouse>(entity =>
        {
            entity.ToTable("Warehouses");
            entity.HasKey(w => w.Id);
            entity.Property(w => w.Name).IsRequired().HasMaxLength(150);
            entity.Property(w => w.Code).IsRequired().HasMaxLength(50);
            entity.Property(w => w.Description).HasMaxLength(500);
            entity.Property(w => w.IsActive).IsRequired();
            entity.Property(w => w.CreatedAt).IsRequired();

            entity.HasIndex(w => w.Code).IsUnique();
            entity.HasIndex(w => w.Name);
            entity.HasIndex(w => w.IsActive);
        });

        // StockBalance entity configuration
        builder.Entity<StockBalance>(entity =>
        {
            entity.ToTable("StockBalances");
            entity.HasKey(b => b.Id);
            entity.Property(b => b.Quantity).HasPrecision(18, 3).IsRequired();
            entity.Property(b => b.RowVersion).IsRowVersion();
            entity.Property(b => b.UpdatedAt).IsRequired();

            entity.HasIndex(b => new { b.ProductId, b.WarehouseId }).IsUnique();
            entity.HasIndex(b => b.ProductId);
            entity.HasIndex(b => b.WarehouseId);

            entity.HasOne(b => b.Product)
                  .WithMany(p => p.StockBalances)
                  .HasForeignKey(b => b.ProductId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(b => b.Warehouse)
                  .WithMany(w => w.StockBalances)
                  .HasForeignKey(b => b.WarehouseId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // StockMovement entity configuration
        builder.Entity<StockMovement>(entity =>
        {
            entity.ToTable("StockMovements");
            entity.HasKey(m => m.Id);
            entity.Property(m => m.MovementType).IsRequired().HasConversion<int>();
            entity.Property(m => m.Quantity).HasPrecision(18, 3).IsRequired();
            entity.Property(m => m.BalanceAfter).HasPrecision(18, 3).IsRequired();
            entity.Property(m => m.ReferenceType).HasMaxLength(100);
            entity.Property(m => m.ReferenceId).HasMaxLength(100);
            entity.Property(m => m.Reason).IsRequired().HasMaxLength(500);
            entity.Property(m => m.CreatedAt).IsRequired();

            entity.HasIndex(m => m.ProductId);
            entity.HasIndex(m => m.WarehouseId);
            entity.HasIndex(m => m.CreatedAt);
            entity.HasIndex(m => m.MovementType);
            entity.HasIndex(m => m.ReferenceId);

            entity.HasOne(m => m.Product)
                  .WithMany(p => p.StockMovements)
                  .HasForeignKey(m => m.ProductId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(m => m.Warehouse)
                  .WithMany(w => w.StockMovements)
                  .HasForeignKey(m => m.WarehouseId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(m => m.CreatedByUser)
                  .WithMany()
                  .HasForeignKey(m => m.CreatedByUserId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Customer entity configuration
        builder.Entity<Customer>(entity =>
        {
            entity.ToTable("Customers");
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Name).IsRequired().HasMaxLength(200);
            entity.Property(c => c.Code).IsRequired().HasMaxLength(50);
            entity.Property(c => c.Email).HasMaxLength(256);
            entity.Property(c => c.Phone).HasMaxLength(50);
            entity.Property(c => c.Address).HasMaxLength(500);
            entity.Property(c => c.City).HasMaxLength(100);
            entity.Property(c => c.State).HasMaxLength(100);
            entity.Property(c => c.Country).HasMaxLength(100);
            entity.Property(c => c.TaxNumber).HasMaxLength(100);
            entity.Property(c => c.Notes).HasMaxLength(2000);
            entity.Property(c => c.IsActive).IsRequired();
            entity.Property(c => c.CreatedAt).IsRequired();

            entity.HasIndex(c => c.Code).IsUnique();
            entity.HasIndex(c => c.Name);
            entity.HasIndex(c => c.Email);
            entity.HasIndex(c => c.Phone);
            entity.HasIndex(c => c.TaxNumber);
            entity.HasIndex(c => c.IsActive);
            entity.HasIndex(c => c.CreatedAt);
        });

        // Supplier entity configuration
        builder.Entity<Supplier>(entity =>
        {
            entity.ToTable("Suppliers");
            entity.HasKey(s => s.Id);
            entity.Property(s => s.Name).IsRequired().HasMaxLength(200);
            entity.Property(s => s.Code).IsRequired().HasMaxLength(50);
            entity.Property(s => s.Email).HasMaxLength(256);
            entity.Property(s => s.Phone).HasMaxLength(50);
            entity.Property(s => s.Address).HasMaxLength(500);
            entity.Property(s => s.City).HasMaxLength(100);
            entity.Property(s => s.State).HasMaxLength(100);
            entity.Property(s => s.Country).HasMaxLength(100);
            entity.Property(s => s.TaxNumber).HasMaxLength(100);
            entity.Property(s => s.Notes).HasMaxLength(2000);
            entity.Property(s => s.IsActive).IsRequired();
            entity.Property(s => s.CreatedAt).IsRequired();

            entity.HasIndex(s => s.Code).IsUnique();
            entity.HasIndex(s => s.Name);
            entity.HasIndex(s => s.Email);
            entity.HasIndex(s => s.Phone);
            entity.HasIndex(s => s.TaxNumber);
            entity.HasIndex(s => s.IsActive);
            entity.HasIndex(s => s.CreatedAt);
        });
    }
}
