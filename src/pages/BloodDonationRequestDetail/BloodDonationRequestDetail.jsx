import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const BloodDonationRequestDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: pendingUser = {}, isLoading } = useQuery({
    queryKey: ["pending", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`donations/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationData = {
      ...pendingUser,
      donationStatus: "in-progress",
      donorName: user.displayName,
      donorEmail: user.email,
    };

    try {
      const response = await axiosSecure.put(`/add-donation`, donationData);
      if (response.data.modifiedCount > 0) {
        toast.success('Donation request updated successfully');
        setIsModalOpen(false);
      } else {
        toast.error('Failed to update donation request');
      }
    } catch (error) {
      toast.error('Failed to update donation request');
    }
  };

  return (
    <div className='py-20 w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='requesterName' className='block text-gray-600'>Requester Name</label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='requesterName'
                id='requesterName'
                type='text'
                defaultValue={user?.displayName}
                readOnly
              />
            </div>
            <div className='space-y-1 text-sm'>
              <label htmlFor='requesterEmail' className='block text-gray-600'>Requester Email</label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='requesterEmail'
                id='requesterEmail'
                type='text'
                defaultValue={user?.email}
                readOnly
              />
            </div>
            <div className='space-y-1 text-sm'>
              <label htmlFor='recipientName' className='block text-gray-600'>Recipient Name</label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='recipientName'
                id='recipientName'
                type='text'
                defaultValue={pendingUser.recipientName}
                readOnly
              />
            </div>
            <div className='flex justify-between gap-2'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='recipientDistrict' className='block text-gray-600'>Recipient District</label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                  name='recipientDistrict'
                  id='recipientDistrict'
                  type='text'
                  defaultValue={pendingUser.recipientDistrict}
                  readOnly
                />
              </div>
              <div className='space-y-1 text-sm'>
                <label htmlFor='recipientUpazila' className='block text-gray-600'>Recipient Upazila</label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                  name='recipientUpazila'
                  id='recipientUpazila'
                  type='text'
                  defaultValue={pendingUser.recipientUpazila}
                  readOnly
                />
              </div>
            </div>
            <div className='space-y-1 text-sm'>
              <label htmlFor='hospitalName' className='block text-gray-600'>Hospital Name</label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='hospitalName'
                id='hospitalName'
                type='text'
                defaultValue={pendingUser.hospitalName}
                readOnly
              />
            </div>
            <div className='space-y-1 text-sm'>
              <label htmlFor='fullAddress' className='block text-gray-600'>Full Address</label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='fullAddress'
                id='fullAddress'
                type='text'
                defaultValue={pendingUser.fullAddress}
                readOnly
              />
            </div>
          </div>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='donationDate' className='block text-gray-600'>Donation Date</label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='donationDate'
                id='donationDate'
                type='text'
                defaultValue={pendingUser.donationDate}
                readOnly
              />
            </div>
            <div className='space-y-1 text-sm'>
              <label htmlFor='donationTime' className='block text-gray-600'>Donation Time</label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
                name='donationTime'
                id='donationTime'
                type='text'
                defaultValue={pendingUser.donationTime}
                readOnly
              />
            </div>
            <div className='space-y-1 text-sm'>
              <label htmlFor='requestMessage' className='block text-gray-600'>Request Message</label>
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
          type='button'
          onClick={() => setIsModalOpen(true)}
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-red-500'
        >
          Donate
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Donation Details
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit}>
                        <div className='space-y-4'>
                          <div className='space-y-1 text-sm'>
                            <label htmlFor='donorName' className='block text-gray-600'>Donor Name</label>
                            <input
                              className='w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-red-500 rounded-md '
                              name='donorName'
                              id='donorName'
                              type='text'
                              defaultValue={user.displayName}
                              readOnly
                            />
                          </div>
                          <div className='space-y-1 text-sm'>
                            <label htmlFor='donorEmail' className='block text-gray-600'>Donor Email</label>
                            <input
                              className='w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-red-500 rounded-md '
                              name='donorEmail'
                              id='donorEmail'
                              type='text'
                              defaultValue={user.email}
                              readOnly
                            />
                          </div>
                          <button type="submit" className="w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300">
                            Confirm Donation
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodDonationRequestDetail;
