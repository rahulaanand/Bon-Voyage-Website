using Microsoft.EntityFrameworkCore;
using Travellers.Context;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Service
{
    public class FeedbackRepo:IFeedbackRepo
    {
        private readonly TravelContext travellersContext;

        public FeedbackRepo(TravelContext con)
        {
            travellersContext = con;
        }
        public IEnumerable<Feedback> GetFeedback()
        {
            return travellersContext.Feedbacks.Include(x=> x.Traveller)
                .ToList();
        }

        public Feedback PostFeedback(Feedback feedback)
        {
            var tr = travellersContext.Bookings.Where(s => s.TravellerId == feedback.TravellerId
                                                        && s.IsConfirmed == ConfirmationStatus.Confirmed
                                                        && s.PackageId == feedback.PackageId).ToList();
            if (tr.Count >= 1 )
            {
                travellersContext.Feedbacks.Add(feedback);
                travellersContext.SaveChanges();
                return feedback;
            }
            return null;
        }
    }
}
