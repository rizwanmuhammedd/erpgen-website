using ERPGen.Domain.Entities;
using ERPGen.Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace ERPGen.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task SeedRolesAndAdminAsync(
        RoleManager<IdentityRole> roleManager,
        UserManager<ApplicationUser> userManager)
    {
        // 1. Seed Roles
        foreach (var role in UserRoles.All)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        // 2. Seed Default Admin User if none exists
        const string adminEmail = "admin@erpgen.com";
        var existingAdmin = await userManager.FindByEmailAsync(adminEmail);
        if (existingAdmin == null)
        {
            var adminUser = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                FullName = "ERPGen Administrator",
                EmailConfirmed = true,
                CreatedAt = DateTime.UtcNow
            };

            var result = await userManager.CreateAsync(adminUser, "Admin@123456");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, UserRoles.Admin);
            }
        }
    }
}
