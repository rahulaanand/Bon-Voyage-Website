using Travellers.Models;

namespace Travellers.Interface
{
    public interface IBookingRepo
    {
        public IEnumerable<Booking> GetBooking();

        public Booking PostBooking(Booking booking);

        public Booking GetBookingById(int bookingId);
        
        public Booking UpdateBooking(Booking booking);

    }
}
