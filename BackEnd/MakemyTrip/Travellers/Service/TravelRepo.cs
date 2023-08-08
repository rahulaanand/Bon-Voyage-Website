using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Travellers.Context;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Service
{
    public class TravelRepo : ITravelRepo
    {
        private readonly TravelContext _travelContext;

        public TravelRepo(TravelContext travelContext)
        {
            _travelContext = travelContext;
        }

        public IEnumerable<Traveller> GetTravellers()
        {
            return _travelContext.Travellers.Include(x => x.Bookings).ToList();
        }

        public Traveller GetTravellerById(int id)
        {
            return _travelContext.Travellers
                .Include(x => x.Bookings) 
                .FirstOrDefault(x => x.TravelerId == id); 
        }

        public Traveller PostTraveller(Traveller traveller)
        {
            _travelContext.Travellers.Add(traveller);
            _travelContext.SaveChanges();
            return traveller;
        }

        public void PutTraveller(Traveller traveller)
        {
            _travelContext.Entry(traveller).State = EntityState.Modified;
            _travelContext.SaveChanges();
        }

        public void DeleteTraveller(int id)
        {
            Traveller traveller = _travelContext.Travellers.FirstOrDefault(x => x.TravelerId == id);
            if (traveller != null)
            {
                _travelContext.Travellers.Remove(traveller);
                _travelContext.SaveChanges();
            }
        }

    }
}
