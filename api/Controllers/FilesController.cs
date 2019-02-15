using System.Threading.Tasks;
using api.Contratcs;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private IFilesService _service;

        public FilesController(IFilesService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Post(XmlFileRequest request)
        {
            return _service.CreateFile(request.Name, request.Content);
        }
    }
}
