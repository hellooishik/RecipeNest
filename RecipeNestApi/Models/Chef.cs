public class Chef
{
    public int ChefId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Bio { get; set; }
    public string ProfileImage { get; set; }
    public string SocialLinks { get; set; }

    public ICollection<Recipe> Recipes { get; set; }
}
