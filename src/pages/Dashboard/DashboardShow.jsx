import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { NavLink } from "react-router-dom";
import { FaUsers, FaMoneyBillWave, FaTint } from 'react-icons/fa'; 

const DashboardShow = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [role] = useRole();
  console.log(role);

  const { data: donations = [], refetch } = useQuery({
    queryKey: ['donation', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation/${user.email}`);
      return data;
    },
    enabled: !!user?.email, // Ensures the query runs only if the user email is available
  });

  // get all donation req
  const { data: allDonations = [], } = useQuery({
    queryKey: ['donation',],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/donation');
      return data;
    },
  });

  // get all user 
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ['donor'],
    queryFn: async () => {
        const { data } = await axiosSecure.get('/users/donor');
        // Filter to get only donors (you should adjust this filter based on your actual data structure)
        return data;
    },
    enabled: true, // Query is always enabled
});
  console.log(allUsers);

  

  
  const totalFunding = 10000; // Replace with actual total funding amount
 

  return (
    <>
      {role === 'donor' && (
        <div className="container p-2">
          <div className="bg-base-200 h-16">
            <h1 className="text-3xl font-semibold mt-10">Welcome {user?.displayName}</h1>
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
                        <td className="p-3">
                          {donation.donationStatus === 'inprogress' && (
                            <>
                              <button className="px-3 py-1 font-semibold rounded-md bg-green-400 dark:bg-green-600 text-gray-900 dark:text-gray-50">
                                Done
                              </button>
                              <button className="px-3 py-1 font-semibold rounded-md bg-red-400 dark:bg-red-600 text-gray-900 dark:text-gray-50 ml-2">
                                Cancel
                              </button>
                            </>
                          )}
                          <button className="px-3 py-1 font-semibold rounded-md bg-blue-400 dark:bg-blue-600 text-gray-900 dark:text-gray-50 ml-2">
                            Edit
                          </button>
                          <button className="px-3 py-1 font-semibold rounded-md bg-yellow-400 dark:bg-yellow-600 text-gray-900 dark:text-gray-50 ml-2">
                            Delete
                          </button>
                          <button className="px-3 py-1 font-semibold rounded-md bg-purple-400 dark:bg-purple-600 text-gray-900 dark:text-gray-50 ml-2">
                            View
                          </button>
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

{role === 'admin' && (
                <div className="container p-2">
                    <div className="bg-base-200 h-16">
                        <h1 className="text-3xl font-semibold mt-10">Welcome {user?.displayName}</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        {/* Card 1: Total Users (Donors) */}
                        <div className="bg-gray-900 dark:bg-gray-50 border border-gray-700 dark:border-gray-300 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FaUsers className="text-4xl text-blue-500 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-200">Total Users (Donors)</p>
                                    <p className="text-gray-400">{allUsers.length}</p>
                                </div>
                            </div>
                        </div>
                        {/* Card 2: Total Funding */}
                        <div className="bg-gray-900 dark:bg-gray-50 border border-gray-700 dark:border-gray-300 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FaMoneyBillWave className="text-4xl text-yellow-500 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-200">Total Funding</p>
                                    <p className="text-gray-400">${totalFunding}</p>
                                </div>
                            </div>
                        </div>
                        {/* Card 3: Total Blood Donation Requests */}
                        <div className="bg-gray-900 dark:bg-gray-50 border border-gray-700 dark:border-gray-300 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FaTint className="text-4xl text-red-500 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-200">Total Blood Donation Requests</p>
                                    <p className="text-gray-400">{allDonations.length}</p>
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
