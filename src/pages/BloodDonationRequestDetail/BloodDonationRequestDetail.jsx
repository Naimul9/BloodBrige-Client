import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import Modal from "react-modal";

const BloodDonationRequestDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data: pendingUser = {}, isLoading } = useQuery({
    queryKey: ["pending", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`donations/${id}`);
      console.log(data);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requestMessage = form.requestMessage.value;

    const donationData = {
      ...pendingUser,
      donationStatus: "in-progress",
      donorName: user.displayName,
      donorEmail: user.email,
      requestMessage,
    };

    axiosSecure.put(`/donations/${id}`, donationData)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          toast.success('Donation request updated successfully');
          handleCloseModal();
        }
      })
      .catch(error => {
        console.error('Error updating donation request:', error);
        toast.error('Failed to update donation request');
      });
  };

  return (
    <div className='py-20 w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          {/* Static form fields for displaying donation request details */}
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
          onClick={handleOpenModal}
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-red-500'
        >
          Donate
        </button>
      </form>

      {/* Modal for donation form */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Confirm Donation"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Donation</h2>
        <form onSubmit={handleSubmit}>
          <div className='space-y-1 text-sm'>
            <label htmlFor='donorName' className='block text-gray-600'>Donor Name</label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
              name='donorName'
              id='donorName'
              type='text'
              defaultValue={user?.displayName}
              readOnly
            />
          </div>
          <div className='space-y-1 text-sm'>
            <label htmlFor='donorEmail' className='block text-gray-600'>Donor Email</label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 rounded-md '
              name='donorEmail'
              id='donorEmail'
              type='text'
              defaultValue={user?.email}
              readOnly
            />
          </div>
          <div className='space-y-1 text-sm'>
            <label htmlFor='requestMessage' className='block text-gray-600'>Request Message</label>
            <textarea
              id='requestMessage'
              className='block rounded-md focus:red-300 w-full h-[150px] px-4 py-3 text-gray-800 border border-red-300 focus:outline-red-500 '
              name='requestMessage'
              placeholder="Please Write the Reason Here"
            ></textarea>
          </div>
          <button
            type='submit'
            className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-red-500'
          >
            Confirm Donation
          </button>
        </form>
        <button
          onClick={handleCloseModal}
          className='mt-4 text-center font-medium text-red-500 underline'
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default BloodDonationRequestDetail;

// Modal styles
// import './Modal.css';

// // Modal.css
// .modal {
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   right: auto;
//   bottom: auto;
//   margin-right: -50%;
//   transform: translate(-50%, -50%);
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   outline: none;
// }

// .modal-overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.75);
// }
