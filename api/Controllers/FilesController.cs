using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Xml;
using api.Requests;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private const string FILE_PATH = "C:\\Users\\Lorenzo Pincinato\\Desktop\\xml-netcore\\";

        [HttpPost("xmlFiles")]
        public async Task<IActionResult> XmlFiles(XmlFilesRequest request)
        {
            var invalidFilesNames = new List<string>();
            var validFiles = new Dictionary<string, XmlDocument>();

            foreach (XmlFile xmlFileRequest in request)
            {
                try
                {
                    var xmlFile = new XmlDocument();
                    xmlFile.LoadXml(xmlFileRequest.Content);

                    validFiles.Add(xmlFileRequest.Name, xmlFile);
                } catch
                {
                    invalidFilesNames.Add(xmlFileRequest.Name);
                }
            }

            if (invalidFilesNames.Count == 0)
            {
                foreach (var file in validFiles)
                {
                    file.Value.Save($"{FILE_PATH}{file.Key}");
                }

                return Ok();
            }

            return BadRequest(invalidFilesNames);
        }
    }
}
