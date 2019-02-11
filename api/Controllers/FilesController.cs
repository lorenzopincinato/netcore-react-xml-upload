using System;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private const string FILE_PATH = "C:\\Users\\Lorenzo Pincinato\\Desktop\\";

        [HttpPost("xmlContent")]
        public async Task<IActionResult> UploadFile(XDocument xml)
        {
            xml.Save($"{FILE_PATH}{DateTime.Now.ToString("yyyy-MM-ddTHHmmssfff")}.xml");
            return Ok(xml);
        }
    }
}
