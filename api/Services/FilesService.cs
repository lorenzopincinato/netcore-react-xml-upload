using Microsoft.AspNetCore.Mvc;
using System.Xml;

namespace api.Services
{
    public class FilesService : IFilesService
    {
        private const string FILE_PATH = "C:\\Users\\Lorenzo Pincinato\\Desktop\\xml-netcore\\";

        public IActionResult CreateFile(string name, string content)
        {
            var xmlFile = new XmlDocument();

            try { xmlFile.LoadXml(content); }
            catch { return new BadRequestResult(); }

            try { xmlFile.Save($"{FILE_PATH}{name}"); }
            catch { return new StatusCodeResult(500); }

            return new OkResult();
        }
    }
}
