using System.Linq;
using Travellers.Context;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Service
{
    public class PaymentRepo : IPaymentRepo
    {
        private readonly TravelContext _travellersContext;

        public PaymentRepo(TravelContext travellersContext)
        {
            _travellersContext = travellersContext;
        }

        public IEnumerable<Payment> GetPayment()
        {
            return _travellersContext.Payment.ToList();
        }

        public Payment PostPayment(Payment payment)
        {
            // Save the payment details
            _travellersContext.Payment.Add(payment);
            _travellersContext.SaveChanges();

            // Get the associated booking and update the confirmation status to Confirmed
            Booking associatedBooking = _travellersContext.Bookings.Find(payment.BookingId);
            if (associatedBooking != null)
            {
                associatedBooking.IsConfirmed = ConfirmationStatus.Confirmed;
                _travellersContext.SaveChanges();
            }

            return payment;
        }
    }
}
