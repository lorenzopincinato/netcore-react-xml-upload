using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        [HttpPost("uploadFile")]
        public async Task<IActionResult> UploadFile(IFormFile filepond)
        {
            var filePath = Path.GetTempFileName();

            if (filepond.Length > 0)
                using (var stream = new FileStream(filePath, FileMode.Create))
                    await filepond.CopyToAsync(stream);

            return Ok(new { count = 1, path = filePath });
        }
    }
}
