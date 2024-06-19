import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { QueryClient, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { Link, NavLink } from "react-router-dom";
import { FaUsers, FaMoneyBillWave, FaTint } from 'react-icons/fa'; 
import toast from "react-hot-toast";
import { MdOutlineCancel, MdOutlineDoneAll, MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const DashboardShow = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [role] = useRole();
  console.log(role);

  const { data: {donations = [] }={}, refetch } = useQuery({
    queryKey: ['donation', user?.email, 'pending'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation/${user.email}`);
      console.log(data);
      return data;
    },
    enabled: !!user?.email, // Ensures the query runs only if the user email is available
  });

  // get all donation req
  const { data: funding } = useQuery({
    queryKey: ['funding'],
    queryFn: async () => {
      const res = await axiosSecure.get('/funding');
      console.log(res);
      return res.data;
    },
  });


  const { data: { total } = {} } = useQuery({
    queryKey: ['donation',],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/donation');
      console.log(data);
      return data;
    },
  });

  // get all user 
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ['donor'],
    queryFn: async () => {
        const { data } = await axiosSecure.get('/users/donor');
        console.log(data);
        // Filter to get only donors (you should adjust this filter based on your actual data structure)
        return data;
    },
    enabled: true, // Query is always enabled
});
  console.log(allUsers);

  // ---------------------



  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.put(`/donations/${id}/status`, { status });
      refetch(); // Refetch updated donations
    } catch (error) {
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
        QueryClient.invalidateQueries(['donations']);
      } catch (error) {
        console.error('Failed to delete donation', error);
        toast.error("Failed to delete donation request.");
      }
    }
  };

  

  
  

  return (
    <>
      {role === 'donor' && (
        <div className="container p-2">
          <div className="bg-base-200 h-16">
            <h1 className="text-3xl font-semibold mt-10 ">Welcome {user?.displayName}</h1>
          </div>
          {donations.length > 0 && (
            <div className="mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
              <h2 className="mb-4 text-2xl font-semibold leading-tight">Recent Donation Requests</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
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
                    {donations.slice(0, 3).map((donation) => (
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
                          {role === 'donor' ? (
                            <>
                              {donation.donationStatus === 'inprogress' && (
                                <>
                                  <button
                                    onClick={() => handleStatusChange(donation._id, 'Done')}
                                    className="px-2 py-1 font-semibold rounded-md text-gray-900 text-xl mb-2 md:mb-0 md:mr-2 tooltip" data-tip="Done"
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
                                <button className="px-2 py-1 font-semibold rounded-md text-gray-900 text-xl mb-2 md:mb-0 md:mr-2 tooltip" data-tip="Edit"  >
                                  <MdOutlineModeEdit />
                                </button>
                              </Link>
                              <button onClick={() => handleDelete(donation._id)} className="px-2 py-1 font-semibold rounded-md text-gray-900 text-xl mb-2 md:mb-0 tooltip" data-tip="Delete"   >
                                <AiOutlineDelete />
                              </button>
                            </>
                          ) : (
                            donation.donationStatus === 'inprogress' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(donation._id, 'Done')}
                                  className="px-3 py-1 font-semibold rounded-md bg-green-400 dark:bg-green-600 text-gray-900 dark:text-gray-50 mb-2 md:mb-0 md:mr-2  tooltip" data-tip="Done"
                                >
                                  <MdOutlineDoneAll />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(donation._id, 'Canceled')}
                                  className="px-3 py-1 font-semibold rounded-md bg-red-400 dark:bg-red-600 text-gray-900 dark:text-gray-50 mb-2 md:mb-0 tooltip" data-tip="Cancel"
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
          )}
          {donations.length === 0 && (
            <div className="mt-4 text-center">
              <p>No donation requests found.</p>
            </div>
          )}
          
            <div className="text-center mt-4">
             <NavLink to={'my-donation-requests'} > <button  className="px-4 py-2 font-semibold rounded-md bg-blue-500 text-white">
                View All Requests
              </button></NavLink>
            </div>
          
        </div>
      )}

{ (role === "admin" || role === "volunteer")  && (
                <div className="container p-2">
                    <div className="bg-base-200 h-16 rounded-lg">
                        <h1 className="text-3xl font-semibold mt-10 py-3 px-5">  Welcome, {user?.displayName}</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        {/* Card 1: Total Users (Donors) */}
                        <div className="bg-gray-900 dark:bg-gray-50 border border-gray-700 dark:border-gray-300 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FaUsers className="text-4xl text-blue-500 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold ">Total Users (Donors)</p>
                                    <p className="">{allUsers.length}</p>
                                </div>
                            </div>
                        </div>
                        {/* Card 2: Total Funding */}
                        <div className="bg-gray-900 dark:bg-gray-50 border border-gray-700 dark:border-gray-300 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FaMoneyBillWave className="text-4xl text-yellow-500 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold ">Total Funding</p>
                                    <p className="">${funding?.amount}</p>
                                </div>
                            </div>
                        </div>
                        {/* Card 3: Total Blood Donation Requests */}
                        <div className="bg-gray-900 dark:bg-gray-50 border border-gray-700 dark:border-gray-300 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FaTint className="text-4xl text-red-500 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold ">Total Blood Donation Requests</p>
                                    <p className="">{total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </>
  );
};

export default DashboardShow;
