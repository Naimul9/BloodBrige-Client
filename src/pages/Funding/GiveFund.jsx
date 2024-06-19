import  { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const GiveFund = () => {
  const [price, setPrice] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const {user} =useContext(AuthContext)
  const currentDate = new Date().toISOString();
  const axiosSecure = useAxiosSecure()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data } = await axiosSecure.post(`/create-payment-intent`, {
        price: parseInt(price * 100), userName: user?.displayName,  date: currentDate, 
      });

      const clientSecret = data.clientSecret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
      } else {
        toast.success('Payment successful!');
        // Handle any further actions after successful payment
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      toast.error('Payment failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount ($)
        </label>
        <input
          type="number"
          className="form-control"
          id="amount"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cardElement" className="form-label ">
          Credit Card Details
        </label>
        <CardElement id="cardElement" className='mt-4' options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      <button type="submit" className="btn bg-red-600 text-white mt-5 " disabled={!stripe}>
        Submit Payment
      </button>
    </form>
  );
};

export default GiveFund;
