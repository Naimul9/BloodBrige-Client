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
            refetch();
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    const updateUserRole = async (email, role) => {
        try {
            await axiosSecure.put('/user/role', { email, role });
            refetch();
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const { data: allUsers = [], isLoading, refetch } = useQuery({
        queryKey: ['all'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        },
        enabled: true,
    });

    const filteredUsers = filter === 'all' ? allUsers : allUsers.filter(user => user.status === filter);

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-end mb-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Photo</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.photo} alt="User" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td className="flex gap-2">
                                {user.status === 'active' ? (
                                    <p
                                        onClick={() => updateUserStatus(user.email, 'blocked')}
                                        className="btn btn-xs"
                                    >
                                        Block
                                    </p>
                                ) : (
                                    <button
                                        onClick={() => updateUserStatus(user.email, 'active')}
                                        className="btn btn-sm"
                                    >
                                        Unblock
                                    </button>
                                )}
                                {user.role !== 'volunteer' && (
                                    <button
                                        onClick={() => updateUserRole(user.email, 'volunteer')}
                                        className="btn btn-xs"
                                    >
                                        Make Volunteer
                                    </button>
                                )}
                                {user.role !== 'admin' && (
                                    <button
                                        onClick={() => updateUserRole(user.email, 'admin')}
                                        className="btn btn-xs"
                                    >
                                        Make Admin
                                    </button>
                                )}
                                {user.role !== 'donor' && (
                                    <button
                                        onClick={() => updateUserRole(user.email, 'donor')}
                                        className="btn btn-xs"
                                    >
                                        Make Donor
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUser;
