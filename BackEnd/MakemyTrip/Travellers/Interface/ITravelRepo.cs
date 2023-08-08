using System.Collections.Generic;
using Travellers.Models;

namespace Travellers.Interface
{
    public interface ITravelRepo
    {
        public IEnumerable<Traveller> GetTravellers();
        public Traveller GetTravellerById(int id);

        public Traveller PostTraveller(Traveller traveller);
        public void PutTraveller(Traveller traveller);
        public void DeleteTraveller(int id);

    }
}
