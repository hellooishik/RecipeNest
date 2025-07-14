[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly AppDbContext _db;

    public RecipeController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<IActionResult> AddRecipe(RecipeDto dto)
    {
        var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var recipe = new Recipe
        {
            ChefId = id,
            Title = dto.Title,
            Description = dto.Description,
            Ingredients = dto.Ingredients,
            Instructions = dto.Instructions,
            Tags = dto.Tags
        };

        _db.Recipes.Add(recipe);
        await _db.SaveChangesAsync();
        return Ok(recipe);
    }

    [HttpGet("my")]
    public async Task<IActionResult> MyRecipes()
    {
        var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var recipes = await _db.Recipes.Where(r => r.ChefId == id).ToListAsync();
        return Ok(recipes);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecipe(int id, RecipeDto dto)
    {
        var recipe = await _db.Recipes.FindAsync(id);
        if (recipe == null) return NotFound();

        recipe.Title = dto.Title;
        recipe.Description = dto.Description;
        recipe.Ingredients = dto.Ingredients;
        recipe.Instructions = dto.Instructions;
        recipe.Tags = dto.Tags;
        await _db.SaveChangesAsync();
        return Ok(recipe);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
        var recipe = await _db.Recipes.FindAsync(id);
        if (recipe == null) return NotFound();

        _db.Recipes.Remove(recipe);
        await _db.SaveChangesAsync();
        return Ok();
    }
}
