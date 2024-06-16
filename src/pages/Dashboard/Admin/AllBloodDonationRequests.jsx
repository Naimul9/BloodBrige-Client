import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext, useState } from "react";
import useRole from "../../../hooks/useRole";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AllBloodDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [statusFilter, setStatusFilter] = useState('');
    const [role] = useRole();
    const queryClient = useQueryClient();

    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donation', user?.email, statusFilter],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/donation', {
                params: {
                    status: statusFilter,
                }
            });
            return data;
        },
        enabled: !!user?.email, // Ensures the query runs only if the user email is available
    });

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        refetch(); // Refetch data when filter changes
    };

    // Mutation to update donation status
    const updateDonationStatus = useMutation({
        mutationFn: async ({ id, status }) => {
            await axiosSecure.put(`/donation/${id}/status`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['donation', user?.email, statusFilter]);
        }
    });



    

    return (
        <div className="container p-2">
            <div className="bg-base-200 h-16">
                <h1 className="text-3xl font-semibold mt-10">Welcome {user?.displayName}</h1>
            </div>
            <div className="mt-4">
                <label htmlFor="statusFilter" className="mr-2">Filter by status:</label>
                <select id="statusFilter" value={statusFilter} onChange={handleStatusFilterChange} className="px-2 py-1 border rounded">
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>
            {donations.length > 0 ? (
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
                                {donations.map((donation) => (
                                    <tr key={donation._id} className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50">
                                        <td className="p-3">{donation.recipientName}</td>
                                        <td className="p-3">{`${donation.recipientDistrict}, ${donation.recipientUpazila}`}</td>
                                        <td className="p-3">{donation.donationDate}</td>
                                        <td className="p-3">{donation.donationTime}</td>
                                        <td className="p-3">{donation.donationStatus}</td>
                                        <td className="p-3">
                                            {role === 'admin' ? (
                                                <>
                                                    {donation.donationStatus === 'inprogress' && (
                                                        <>
                                                            <button
                                                                onClick={() => updateDonationStatus.mutate({ id: donation._id, status: 'done' })}
                                                                className="px-3 py-1 font-semibold rounded-md bg-green-400 dark:bg-green-600 text-gray-900 dark:text-gray-50"
                                                            >
                                                                Done
                                                            </button>
                                                            <button
                                                                onClick={() => updateDonationStatus.mutate({ id: donation._id, status: 'canceled' })}
                                                                className="px-3 py-1 font-semibold rounded-md bg-red-400 dark:bg-red-600 text-gray-900 dark:text-gray-50 ml-2"
                                                            >
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
                                                </>
                                            ) : (
                                                donation.donationStatus === 'inprogress' && (
                                                    <>
                                                        <button
                                                            onClick={() => updateDonationStatus.mutate({ id: donation._id, status: 'done' })}
                                                            className="px-3 py-1 font-semibold rounded-md bg-green-400 dark:bg-green-600 text-gray-900 dark:text-gray-50"
                                                        >
                                                            Done
                                                        </button>
                                                        <button
                                                            onClick={() => updateDonationStatus.mutate({ id: donation._id, status: 'canceled' })}
                                                            className="px-3 py-1 font-semibold rounded-md bg-red-400 dark:bg-red-600 text-gray-900 dark:text-gray-50 ml-2"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )
                                            )}
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
            ) : (
                <div className="mt-4 text-center">
                    <p>No donation requests found.</p>
                </div>
            )}
            <div className="text-center mt-4">
                <NavLink to={'/my-donation-requests'}>
                    <button className="px-4 py-2 font-semibold rounded-md bg-blue-500 text-white">
                        View All Requests
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default AllBloodDonationRequests;
