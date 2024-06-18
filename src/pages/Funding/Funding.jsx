import  { useContext,  useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import GiveFund from './GiveFund';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Funding = () => {
//   const [funding, setfunding] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const{user} = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()

//   useEffect(() => {
//     const fetchfunding = async () => {
//       try {
//         const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/funding`);
//         setfunding(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchfunding();
//   }, []);

const { data: funding = [], refetch } = useQuery({
    queryKey: ['funding', user?.email],
    queryFn: async () => {
        const { data } = await axiosSecure.get('/funding', {
           
        });
        return data;
    },
    enabled: !!user?.email, // Ensures the query runs only if the user email is available
});

  const handleGiveFund = () => {
    setShowPaymentForm(true);
    refetch()
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Funding Details</h1>
        <button
          onClick={handleGiveFund} 
          className="bg-rose-400 font-bold mt-10 text-white px-4 py-2 rounded"
        >
          Give Fund
        </button>
      </div>
      {showPaymentForm && (
        <Elements stripe={stripePromise}>
          <GiveFund />
        </Elements>
      )}
      
   <div className='p-10 border rounded-2xl mt-5' >
   <table className="table font-semibold ">
    {/* head */}
    <thead className='text-center'>
      <tr>
<th></th>
        <th>Name</th>
        <th>Fund Amount </th>
        <th>Date</th>
        

      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {funding.map((fund) =>   <tr className='text-center' key={fund._id} >
      
      <td></td>
     
        <td>
        {fund.userName}
          
        </td>
        <td>{fund.amount}</td>
        

        <td>{new Date(fund.date).toLocaleDateString()}</td>
      </tr>)}
 
    </tbody>
 
    
  </table>
   </div>
      
    </div>
  );
};

export default Funding;
