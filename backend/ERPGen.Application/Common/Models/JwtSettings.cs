namespace ERPGen.Application.Common.Models;

public class JwtSettings
{
    public const string SectionName = "Jwt";

    public string Key { get; set; } = string.Empty;
    public string Secret { get => Key; set => Key = value; }
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int AccessTokenMinutes { get; set; } = 60;
    public int ExpiryMinutes { get => AccessTokenMinutes; set => AccessTokenMinutes = value; }
    public int RefreshTokenDays { get; set; } = 7;
    public int RefreshTokenExpiryDays { get => RefreshTokenDays; set => RefreshTokenDays = value; }
}
