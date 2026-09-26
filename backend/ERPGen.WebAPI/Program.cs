using System.Text;
using ERPGen.Application.Common.Models;
using ERPGen.Domain.Entities;
using ERPGen.Domain.Enums;
using ERPGen.Infrastructure;
using ERPGen.Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers with String Enum support
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

// Add Data Protection
builder.Services.AddDataProtection();

// Configure Safe Forwarded Headers (preserves client IP through reverse proxies without trusting spoofed headers)
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedFor
        | Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedProto;
});

// Configure JWT Settings and validate safety
var jwtSettings = builder.Configuration.GetSection(JwtSettings.SectionName).Get<JwtSettings>()
    ?? throw new InvalidOperationException("Jwt configuration section is missing.");

if (string.IsNullOrWhiteSpace(jwtSettings.Key) || jwtSettings.Key.Length < 32)
{
    throw new InvalidOperationException("Jwt:Key is missing or too short (minimum 32 characters required for HMAC-SHA256).");
}

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection(JwtSettings.SectionName));

// Add Infrastructure (ApplicationDbContext, SQL Server, Identity, TokenService, AuthService)
builder.Services.AddInfrastructure(builder.Configuration);

// Add JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidateAudience = true,
        ValidAudience = jwtSettings.Audience,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// Add Role-based Authorization Infrastructure
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole(UserRoles.Admin));
});

// Add CORS Policy for Frontend
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? new[] { "http://localhost:5173", "http://localhost:3000", "https://localhost:5173" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("ERPGenCorsPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure Swagger with Swashbuckle and Bearer Auth
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "ERPGen Web API",
        Version = "v1",
        Description = "ERPGen Backend REST API built with Clean Architecture and ASP.NET Core 9"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and your token.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Seed Default Roles and Admin User
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    await DbInitializer.SeedRolesAndAdminAsync(roleManager, userManager);
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ERPGen API v1");
    });
}

app.UseForwardedHeaders();

app.UseHttpsRedirection();

app.UseCors("ERPGenCorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => Results.Ok(new
{
    status = "healthy",
    service = "ERPGen Web API",
    version = "1.0",
    docs = "/swagger"
}));

app.Run();
