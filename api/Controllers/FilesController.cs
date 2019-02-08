using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        [HttpPost("xmlContent")]
        public async Task<IActionResult> UploadFile(XDocument xml)
        {
            return Ok(xml);
        }
    }
}
