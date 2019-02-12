using System.Xml.Linq;

namespace api.Requests
{
    public class XmlFile
    {
        public string Name;
        public string Content;

        public XmlFile(string name, string content)
        {
            Name = name;
            Content = content;
        }
    }
}
