[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly TokenService _tokenService;

    public AuthController(AppDbContext db, TokenService tokenService)
    {
        _db = db;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (_db.Chefs.Any(c => c.Email == dto.Email))
            return BadRequest("Email already exists");

        var chef = new Chef
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _db.Chefs.Add(chef);
        await _db.SaveChangesAsync();

        return Ok(new { token = _tokenService.GenerateToken(chef) });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var chef = await _db.Chefs.FirstOrDefaultAsync(c => c.Email == dto.Email);
        if (chef == null || !BCrypt.Net.BCrypt.Verify(dto.Password, chef.PasswordHash))
            return Unauthorized();

        return Ok(new { token = _tokenService.GenerateToken(chef) });
    }
}
