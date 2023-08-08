using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepo _bookingRepo;

        public BookingController(IBookingRepo bookingRepo)
        {
            _bookingRepo = bookingRepo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Booking>> GetBookings()
        {
            try
            {
                var bookings = _bookingRepo.GetBooking();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes.
                // You may want to implement a proper logging mechanism here.

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost]
        public ActionResult<Booking> Post(Booking booking)
        {
            try
            {
                var random = new Random();
                long min = 10000000;
                long max = 99999999;
                long randomNumber = (long)(random.NextDouble() * (max - min + 1)) + min;
                booking.BookingId = randomNumber.ToString();

                return Ok(_bookingRepo.PostBooking(booking));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpGet("{bookingId}")]
        public ActionResult<Booking> GetBookingById(int bookingId)
        {
            try
            {
                var booking = _bookingRepo.GetBookingById(bookingId);

                if (booking == null)
                {
                    return NotFound();
                }

                return Ok(booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPut("{bookingId}/cancel")]
        public ActionResult<Booking> CancelBooking(string bookingId)
        {
            try
            {
                var booking = _bookingRepo.GetBookingById(int.Parse(bookingId));

                if (booking == null)
                {
                    return NotFound();
                }

                booking.IsConfirmed = ConfirmationStatus.Cancelled;

                _bookingRepo.UpdateBooking(booking);

                return Ok(booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


    }
}
