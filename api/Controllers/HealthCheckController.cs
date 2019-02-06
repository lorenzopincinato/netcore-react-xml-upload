using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/health")]
    [ApiController]
    public class HealthCheckController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return "{ \"status\": \"running\" }";
        }
    }
}
