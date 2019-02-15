using Microsoft.AspNetCore.Mvc;

namespace api.Services
{
    public interface IFilesService
    {
        IActionResult CreateFile(string name, string content);
    }
}
