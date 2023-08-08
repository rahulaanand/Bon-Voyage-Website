using Microsoft.EntityFrameworkCore;
using System;
using Travellers.Context;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Service
{
    public class BookingRepo : IBookingRepo
    {
        private readonly TravelContext travellersContext;

        public BookingRepo(TravelContext con)
        {
            travellersContext = con;
        }

        public IEnumerable<Booking> GetBooking()
        {
            return travellersContext.Bookings.Include(x => x.Traveller).ToList();
        }

        public Booking PostBooking(Booking booking)
        {
            booking.IsConfirmed = ConfirmationStatus.Requested;

            travellersContext.Bookings.Add(booking);
            travellersContext.SaveChanges();
            return booking;
        }

        public Booking GetBookingById(int bookingId)
        {
            string bookingIdString = bookingId.ToString();
            return travellersContext.Bookings.FirstOrDefault(b => b.BookingId == bookingIdString);
        }   

        public Booking UpdateBooking(Booking booking)
        {
            travellersContext.Entry(booking).State = EntityState.Modified;
            travellersContext.SaveChanges();
            return booking;
        }

    }
}
