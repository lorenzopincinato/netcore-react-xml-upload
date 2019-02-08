using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Formatters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace api
{
    public class XDocumentInputFormatter : InputFormatter, IInputFormatter, IApiRequestFormatMetadataProvider
    {
        public XDocumentInputFormatter()
        {
            SupportedMediaTypes.Add("application/xml");
        }

        protected override bool CanReadType(Type type)
        {
            if (type.IsAssignableFrom(typeof(XDocument))) return true;
            return base.CanReadType(type);
        }

        public override async Task<InputFormatterResult> ReadRequestBodyAsync(InputFormatterContext context)
        {
            var xmlDocument = await XDocument.LoadAsync(context.HttpContext.Request.Body, LoadOptions.None, CancellationToken.None);
            return InputFormatterResult.Success(xmlDocument);
        }
    }
}
