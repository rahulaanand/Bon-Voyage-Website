using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackRepo _feedbackRepo;

        public FeedbackController(IFeedbackRepo feedbackRepo)
        {
            _feedbackRepo = feedbackRepo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Feedback>> GetFeedback()
        {
            try
            {
                var feedbacks = _feedbackRepo.GetFeedback();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Feedback> Post(Feedback feedback)
        {
            try
            {
                var addedFeedback = _feedbackRepo.PostFeedback(feedback);
                return Ok(addedFeedback);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
