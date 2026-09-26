using ERPGen.Application.Interfaces;
using ERPGen.Domain.Entities;
using ERPGen.Infrastructure.Data;
using ERPGen.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ERPGen.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString, b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        services.AddIdentityCore<ApplicationUser>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequiredLength = 6;
            options.User.RequireUniqueEmail = true;
        })
        .AddRoles<IdentityRole>()
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IContactService, ContactService>();
        services.AddScoped<IProductCategoryService, ProductCategoryService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IWarehouseService, WarehouseService>();
        services.AddScoped<IInventoryService, InventoryService>();
        services.AddScoped<ICustomerService, CustomerService>();
        services.AddScoped<ISupplierService, SupplierService>();

        return services;
    }
}
