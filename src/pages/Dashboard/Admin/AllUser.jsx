import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [filter, setFilter] = useState('all');

    const updateUserStatus = async (email, status) => {
        try {
            await axiosSecure.put('/user/status', { email, status });
            // Refetch users after updating status
            refetch();
        } catch (error) {
            console.error('Error updating user status:', error);
            // Handle error state or show notification
        }
    };

    const updateUserRole = async (email, role) => {
        try {
            await axiosSecure.put('/user/role', { email, role });
            // Refetch users after updating role
            refetch();
        } catch (error) {
            console.error('Error updating user role:', error);
            // Handle error state or show notification
        }
    };

    const { data: allUsers = [], isLoading, refetch } = useQuery({
        queryKey: ['all'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        },
        enabled: true, // Query is always enabled
    });

    const filteredUsers = filter === 'all' ? allUsers : allUsers.filter(user => user.status === filter);

    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">Contacts</h2>
            
            <div className="flex justify-end mb-4">
                <select 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full p-6 text-xs text-left whitespace-nowrap">
                    <colgroup>
                        <col className="w-5" />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-5" />
                    </colgroup>
                    <thead>
                        <tr className="dark:bg-gray-300">
                            <th className="p-3">A-Z</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Job title</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    {filteredUsers.map((user) => (
                        <tbody key={user._id} className="border-b dark:bg-gray-50 dark:border-gray-300">
                            <tr>
                                <td className="px-3 text-2xl font-medium dark:text-gray-600">A</td>
                                <td className="px-3 py-2">
                                    <p>{user.name}</p>
                                </td>
                                <td className="px-3 py-2">
                                    <span>UI Designer</span>
                                    <p className="dark:text-gray-600">Spirit Media</p>
                                </td>
                                <td className="px-3 py-2">
                                    <p>{user._id}</p>
                                </td>
                                <td className="px-3 py-2">
                                    <p>{user.role}</p>
                                </td>
                                <td className="px-3 py-2">
                                    <p>{user.status}</p>
                                    <p className="dark:text-gray-600">United Kingdom</p>
                                </td>
                                <td className="px-3 py-2">
                                    {user.status === 'active' ? (
                                        <button onClick={() => updateUserStatus(user.email, 'blocked')} className="btn btn-xs">Block</button>
                                    ) : (
                                        <button onClick={() => updateUserStatus(user.email, 'active')} className="btn btn-xs">Unblock</button>
                                    )}
                                </td>
                                <td className="px-3 py-2">
                                    {user.role !== 'volunteer' && (
                                        <button onClick={() => updateUserRole(user.email, 'volunteer')} className="btn btn-xs">Make Volunteer</button>
                                    )}
                                </td>
                                <td className="px-3 py-2">
                                    {user.role !== 'admin' && (
                                        <button onClick={() => updateUserRole(user.email, 'admin')} className="btn btn-xs">Make Admin</button>
                                    )}
                                </td>
                                <td className="px-3 py-2">
                                    <button type="button" title="Open details" className="p-1 rounded-full dark:text-gray-400 hover:dark:bg-gray-300 focus:dark:bg-gray-300">
                                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default AllUser;
