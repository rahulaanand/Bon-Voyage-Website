using Travellers.Models;

namespace Travellers.Interface
{
    public interface IFeedbackRepo
    {
        public IEnumerable<Feedback> GetFeedback();

        public Feedback PostFeedback(Feedback feedback);

    }
}
