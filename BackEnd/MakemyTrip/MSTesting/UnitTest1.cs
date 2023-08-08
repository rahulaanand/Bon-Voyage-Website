using Microsoft.EntityFrameworkCore;
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
            // Arrange
            var options = new DbContextOptionsBuilder<TravelContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            using (var context = new TravelContext(options))
            {
                context.Bookings.Add(new Booking { BookingId = "123", IsConfirmed = ConfirmationStatus.Requested });
                context.SaveChanges();
            }

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
                Assert.IsNotNull(result);
                Assert.AreEqual(ConfirmationStatus.Confirmed, context.Bookings.Find("123").IsConfirmed);
            }
        }
    }
}
