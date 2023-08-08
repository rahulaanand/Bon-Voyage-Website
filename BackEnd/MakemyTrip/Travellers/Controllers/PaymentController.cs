using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepo tr;

        public PaymentController(IPaymentRepo tr)
        {
            this.tr = tr;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Payment>> GetPayment()
        {
            try
            {
                return Ok(tr.GetPayment());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Payment> Post(Payment payment)
        {
            try
            {
                return Ok(tr.PostPayment(payment));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
