using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Travellers.Context;
using Travellers.Models;
using Travellers.Service;

namespace Travellers.Tests
{
    [TestClass]
    public class PaymentRepoTests
    {
        [TestMethod]
        public void PostPayment_SavesPaymentAndUpdatesBookingConfirmation()
        {
            // ... (Rest of the test code)

            using (var context = new TravelContext(options))
            {
                var payment = new Payment
                {
                    BookingId = "123",
                    CardNumber = "1234567812345678",
                    ExpiryMonth = 12,
                    ExpiryYear = 2025,
                    NameOnCard = "John Doe",
                    CVVNumber = 123
                };

                var paymentRepo = new PaymentRepo(context);

                // Act
                var result = paymentRepo.PostPayment(payment);

                // Assert
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsNotNull(result);
                Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual(ConfirmationStatus.Confirmed, context.Bookings.Find("123").IsConfirmed);
            }
        }
    }
}
