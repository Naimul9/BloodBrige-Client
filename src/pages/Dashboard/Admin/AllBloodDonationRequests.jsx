import { Link, NavLink } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext, useState } from "react";
import useRole from "../../../hooks/useRole";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdOutlineCancel, MdOutlineDoneAll, MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [role] = useRole();
  const queryClient = useQueryClient();

  const { data: { donations = [], total = 0 } = {}, isLoading, refetch } = useQuery({
    queryKey: ['donation', user?.email, statusFilter, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/donation', {
        params: {
          status: statusFilter,
          page: currentPage,
          limit: itemsPerPage,
        }
      });
      return data;
    },
    enabled: !!user?.email, // Ensures the query runs only if the user email is available
  });

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    
    setCurrentPage(1); // Reset to the first page when filter changes
    refetch(); // Refetch data when filter changes
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.put(`/donations/${id}/status`, { status });
      toast.success(`Successfully ${status}`)
      refetch(); // Refetch updated donations
    } catch (error) {
        toast.error('Failed to Update')
      console.error('Failed to update donation status', error);

    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
  
    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/donations/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your donation request has been deleted.",
          icon: "success"
        });
        refetch()
        // Invalidate and refetch the donations query to reflect the updated data
        queryClient.invalidateQueries(['donations']);
      } catch (error) {
        console.error('Failed to delete donation', error);
        toast.error("Failed to delete donation request.");
      }
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch();
  };

  

  return (
    <div className="container mx-auto p-4">
      <div className="bg-base-200 items-center justify-center">
        <h1 className="text-2xl md:text-3xl py-4 font-semibold mt-10 text-center">Welcome {user?.displayName}</h1>
      </div>
      <div className="mt-4 flex flex-col md:flex-row items-center justify-center">
        <label htmlFor="statusFilter" className="mr-2">Filter by status:</label>
        <select id="statusFilter" value={statusFilter} onChange={handleStatusFilterChange} className="px-2 py-1 border rounded mt-2 md:mt-0">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
      {donations.length > 0 ? (
        <div className="mt-8">
          <h2 className="mb-4 text-xl md:text-2xl font-semibold leading-tight text-center">Recent Donation Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm">
              <thead className="bg-gray-700 dark:bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">Recipient Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Donation Date</th>
                  <th className="p-3">Donation Time</th>
                  <th className="p-3">Status</th>
                 <th className="p-3">Donor Information</th> 
                  
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id} className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50">
                    <td className="p-3">{donation.recipientName}</td>
                    <td className="p-3">{`${donation.recipientDistrict}, ${donation.recipientUpazila}`}</td>
                    <td className="p-3">{donation.donationDate}</td>
                    <td className="p-3">{donation.donationTime}</td>
                    <td className="p-3">{donation.donationStatus}</td>
                    {donation.donationStatus === 'inprogress' ? (
                        <td> 
                          {donation.donorName} <br />
                          {donation.donorEmail}
                        </td>
                      ) : (
                        <td></td>
                      )}

                    <td className="p-3 flex flex-col md:flex-row">
                      {role === 'admin' ? (
                        <>
                          {donation.donationStatus === 'inprogress' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(donation._id, 'Done')}
                                className="tooltip px-2 py-1 font-semibold rounded-md text-gray-900 text-xl mb-2 md:mb-0 md:mr-2"
                                data-tip="Done"
                              >
                                <MdOutlineDoneAll />
                              </button>
                              <button
                                onClick={() => handleStatusChange(donation._id, 'Canceled')}
                                className="tooltip px-2 py-1 font-semibold rounded-md text-gray-900 text-xl mb-2 md:mb-0 md:mr-2"
                                data-tip="Cancel"
                              >
                                <MdOutlineCancel />
                              </button>
                            </>
                          )}
                          <Link to={`/dashboard/update-donation-request/${donation._id}`}>
                            <button className="tooltip px-2 py-1 font-semibold rounded-md text-gray-900 text-xl mb-2 md:mb-0 md:mr-2"
                            data-tip="Edit">
                              <MdOutlineModeEdit />
                            </button>
                          </Link>
                          <button onClick={() => handleDelete(donation._id)} className="px-2 py-1 font-semibold rounded-md text-gray-900 text-xl mb-2 md:mb-0 tooltip" data-tip="Delete">
                            <AiOutlineDelete />
                          </button>
                        </>
                      ) : (
                        donation.donationStatus === 'inprogress' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(donation._id, 'Done')}
                              className="px-3 py-1 font-semibold rounded-md  mb-2 md:mb-0 md:mr-2 text-xl tooltip" data-tip="Done"
                            >
                              <MdOutlineDoneAll />
                            </button>
                            <button
                              onClick={() => handleStatusChange(donation._id, 'Canceled')}
                              className="px-3 py-1 font-semibold rounded-md mb-2 md:mb-0 text-xl tooltip" data-tip="Cancel"
                            >
                              <MdOutlineCancel />
                            </button>
                          </>
                        )
                      )}
                      <Link to={`/blood-donation-request-detail/${donation._id}`}>
                        <button className="px-3 ml-2 py-1 font-semibold rounded-md bg-purple-400 dark:bg-purple-600 text-gray-900 dark:text-gray-50">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-4 text-center">
          <p>No donation requests found.</p>
        </div>
      )}
           <div className="mt-4">
                        <div className="flex justify-center items-center space-x-2">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-1 font-semibold rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-50'}`}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>


    
    </div>
  );
};

export default AllBloodDonationRequests;
