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
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            var filePath = Path.GetTempFileName();

            if (file.Length > 0)
                using (var stream = new FileStream(filePath, FileMode.Create))
                    await file.CopyToAsync(stream);

            return Ok(new { count = 1, path = filePath });
        }

        [HttpPost("uploadFiles")]
        public async Task<IActionResult> UploadFiles(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            var filePath = Path.GetTempFileName();

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                    using (var stream = new FileStream(filePath, FileMode.Create))
                        await formFile.CopyToAsync(stream);
            }

            return Ok(new { count = files.Count, path = filePath });
        }
    }
}
