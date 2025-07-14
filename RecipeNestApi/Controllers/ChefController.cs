[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ChefController : ControllerBase
{
    private readonly AppDbContext _db;

    public ChefController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetProfile()
    {
        var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var chef = await _db.Chefs.FindAsync(id);
        return Ok(chef);
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateProfile(Chef updated)
    {
        var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var chef = await _db.Chefs.FindAsync(id);

        chef.Bio = updated.Bio;
        chef.ProfileImage = updated.ProfileImage;
        chef.SocialLinks = updated.SocialLinks;
        await _db.SaveChangesAsync();

        return Ok(chef);
    }
}
