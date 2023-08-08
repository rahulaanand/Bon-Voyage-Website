using Travellers.Models;

namespace Travellers.Interface
{
    public interface IPaymentRepo
    {
        public IEnumerable<Payment> GetPayment();

        public Payment PostPayment(Payment payment);

    }
}
