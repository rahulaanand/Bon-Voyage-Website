using Xunit;
using Microsoft.EntityFrameworkCore;
using Travellers.Context;
using Travellers.Interface;
using Travellers.Models;
using Travellers.Service;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Travellers.Tests
{
    public class BookingRepoTests
    {
        [Fact]
        public void GetBooking_ReturnsListOfBookings()
        {
            // Arrange
            var dbContextOptions = new DbContextOptionsBuilder<TravelContext>()
                .UseInMemoryDatabase(databaseName: "GetBooking_TestDatabase")
                .Options;

            using (var context = new TravelContext(dbContextOptions))
            {
                context.Database.EnsureCreated();

                var bookingRepo = new BookingRepo(context);

                // Add sample bookings to the in-memory database
                var bookings = new List<Booking>
                {
                    new Booking { BookingId = "12345678", TravellerId = 1, PackageId = 1, Residence = "Hotel A", NumberOfPeople = 2, IsConfirmed = ConfirmationStatus.Confirmed },
                    new Booking { BookingId = "87654321", TravellerId = 2, PackageId = 2, Residence = "Hotel B", NumberOfPeople = 1, IsConfirmed = ConfirmationStatus.Requested },
                    // Add more sample bookings
                };
                context.Bookings.AddRange(bookings);
                context.SaveChanges();

                // Act
                var result = bookingRepo.GetBooking();

                // Assert
                Assert.NotNull(result);
                Assert.Equal(bookings.Count, result.Count());
                // Add more assertions as needed
            }
        }

        [Fact]
        public void PostBooking_ValidData_ReturnsNewBooking()
        {
            // Arrange
            var dbContextOptions = new DbContextOptionsBuilder<TravelContext>()
                .UseInMemoryDatabase(databaseName: "PostBooking_TestDatabase")
                .Options;

            using (var context = new TravelContext(dbContextOptions))
            {
                context.Database.EnsureCreated();

                var bookingRepo = new BookingRepo(context);

                var newBooking = new Booking
                {
                    BookingId = "12345678",
                    TravellerId = 1,
                    PackageId = 3,
                    Residence = "Hotel C",
                    NumberOfPeople = 3,
                    // Set other properties
                };

                // Act
                var result = bookingRepo.PostBooking(newBooking);

                // Assert
                Assert.NotNull(result);
                Assert.Equal(ConfirmationStatus.Requested, result.IsConfirmed);
                // Add more assertions as needed
            }
        }

        [Fact]
        public void GetBookingById_ValidId_ReturnsBooking()
        {
            // Arrange
            var dbContextOptions = new DbContextOptionsBuilder<TravelContext>()
                .UseInMemoryDatabase(databaseName: "GetBookingById_TestDatabase")
                .Options;

            using (var context = new TravelContext(dbContextOptions))
            {
                context.Database.EnsureCreated();

                var bookingRepo = new BookingRepo(context);

                var booking = new Booking
                {
                    BookingId = "12345678",
                    TravellerId = 1,
                    PackageId = 4,
                    Residence = "Hotel D",
                    NumberOfPeople = 2,
                    IsConfirmed = ConfirmationStatus.Confirmed,
                    BookingDate = DateTime.Now
                };
                context.Bookings.Add(booking);
                context.SaveChanges();

                // Act
                var result = bookingRepo.GetBookingById(12345678);

                // Assert
                Assert.NotNull(result);
                // Add more assertions as needed
            }
        }

        [Fact]
        public void UpdateBooking_ValidData_ReturnsUpdatedBooking()
        {
            // Arrange
            var dbContextOptions = new DbContextOptionsBuilder<TravelContext>()
                .UseInMemoryDatabase(databaseName: "UpdateBooking_TestDatabase")
                .Options;

            using (var context = new TravelContext(dbContextOptions))
            {
                context.Database.EnsureCreated();

                var bookingRepo = new BookingRepo(context);

                var booking = new Booking
                {
                    BookingId = "12345678",
                    TravellerId = 1,
                    PackageId = 5,
                    Residence = "Hotel E",
                    NumberOfPeople = 4,
                    IsConfirmed = ConfirmationStatus.Requested,
                    BookingDate = DateTime.Now
                };
                context.Bookings.Add(booking);
                context.SaveChanges();

                // Update booking data
                booking.PackageId = 6;
                booking.NumberOfPeople = 3;

                // Act
                var result = bookingRepo.UpdateBooking(booking);

                // Assert
                Assert.NotNull(result);
            }
        }

        // Add more test cases for other methods similarly
    }
}
