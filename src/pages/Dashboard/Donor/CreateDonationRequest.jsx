import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const CreateDonationRequest = () => {
 

  const { user } = useContext(AuthContext);
  const axiosSecure =useAxiosSecure()
  const [data, setData] = useState([]);
  const [upData, setUpData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/districts.json');
      const result = await response.json();
      setData(result);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/upazilas.json');
      const result = await response.json();
      setUpData(result);
    }

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const recipientName = form.recipientName.value;
    const recipientDistrict = form.recipientDistrict.value;
    const recipientUpazila = form.recipientUpazila.value;
    const hospitalName = form.hospitalName.value;
    const fullAddress = form.fullAddress.value;
    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const requestMessage = form.requestMessage.value;
    const email =user.email
    const donationStatus = "pending"

    const donationData = {
      recipientName, recipientDistrict, recipientUpazila, hospitalName,
      donationDate, donationTime, fullAddress, requestMessage, donationStatus,email
    };
    axiosSecure.put('/add-donation', donationData)
    .then(res => {
        console.log(res.data);
        if (res.data.insertedId || res.data.modifiedCount > 0) {
            toast.success('Request added/updated Successfully');
        }
    })
    .catch(error => {
        console.error('Error adding/updating request:', error);
        toast.error('Failed to add/update request');
    });


   console.log(donationData);
  };

  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            {/* requester name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='requesterName' className='block text-gray-600'>
                Requester Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='requesterName'
                id='requesterName'
                type='text'
                placeholder='Requester Name'
                defaultValue={user?.displayName}
                readOnly
              />
            </div>

            {/* requester email */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='requesterEmail' className='block text-gray-600'>
                Requester Email
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='requesterEmail'
                id='requesterEmail'
                type='text'
                placeholder='Requester Email'
                defaultValue={user?.email}
                readOnly
              />
            </div>

            {/* recipient name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='recipientName' className='block text-gray-600'>
                Recipient Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='recipientName'
                id='recipientName'
                type='text'
                placeholder='Recipient Name'
                required
              />
            </div>

            {/* recipient district & upazila */}
            <div className='flex justify-between gap-2'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='recipientDistrict' className='block text-gray-600'>
                  Recipient District
                </label>
                <select
                  id='recipientDistrict'
                  name='recipientDistrict'
                  className='block w-full px-4 py-2 text-gray-700 bg-white border border-red-300 focus:outline-red-500 rounded-md'
                  required
                >
                  {data.map(district => (
                    <option value={district.name} key={district._id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='space-y-1 text-sm'>
                <label htmlFor='recipientUpazila' className='block text-gray-600'>
                  Recipient Upazila
                </label>
                <select
                  id='recipientUpazila'
                  name='recipientUpazila'
                  className='block w-full px-4 py-2 text-gray-700 bg-white border border-red-300 focus:outline-red-500 rounded-md'
                  required
                >
                  {upData.map(upazila => (
                    <option value={upazila.name} key={upazila._id}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hospital Name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='hospitalName' className='block text-gray-600'>
                Hospital Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='hospitalName'
                id='hospitalName'
                type='text'
                placeholder='Hospital Name'
                required
              />
            </div>
          </div>

          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='fullAddress' className='block text-gray-600'>
                Full Address
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='fullAddress'
                id='fullAddress'
                type='text'
                placeholder='Full Address'
                required
              />
            </div>

            {/* donation date & time */}
            <div className='flex justify-between gap-2'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='donationDate' className='block text-gray-600'>
                  Donation Date
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                  name='donationDate'
                  id='donationDate'
                  type='date'
                  placeholder='Donation Date'
                  required
                />
              </div>

              <div className='space-y-1 text-sm'>
                <label htmlFor='donationTime' className='block text-gray-600'>
                  Donation Time
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                  name='donationTime'
                  id='donationTime'
                  type='time'
                  placeholder='Donation Time'
                  required
                />
              </div>
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='requestMessage' className='block text-gray-600'>
                Request Message
              </label>
              <textarea
                id='requestMessage'
                className='block rounded-md focus:red-300 w-full h-[225px] px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 '
                name='requestMessage'
                placeholder="Please Write the Reason Here"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-red-500'
        >
          Create
        </button>
        
      </form>
    </div>
  );
};

export default CreateDonationRequest;
