import React, { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import useRole from '../../../hooks/useRole';
import { MdDelete, MdEdit, MdOutlinePublishedWithChanges, MdOutlineUnpublished } from "react-icons/md";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ContentManagement = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [role] = useRole();
    const [filter, setFilter] = useState('all');
    const queryClient = useQueryClient();

    // Fetch all blogs with optional filtering
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs', filter], // Use filter in the query key for caching
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/blogs?status=${filter !== 'all' ? filter : ''}`);
            return data;
        }
    });

    // Mutation to publish a blog
    const publishBlog = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.put(`/blogs/${id}/publish`);
        },
        onSuccess: () => {
            toast.success('Blog Published Successfully');
            queryClient.invalidateQueries(['blogs', filter]); // Invalidate cache for updated data
        }
    });

    // Mutation to unpublish a blog
    const unpublishBlog = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.put(`/blogs/${id}/unpublish`);
        },
        onSuccess: () => {
            toast.success('Blog Drafted Successfully');
            queryClient.invalidateQueries(['blogs', filter]); // Invalidate cache for updated data
        }
    });

    // Mutation to delete a blog
    const deleteBlog = useMutation({
        mutationFn: async (id) => {
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
                    await axiosSecure.delete(`/blogs/${id}`);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your blog post has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    toast.error("Failed to delete blog post.");
                    throw new Error(error);
                }
            } else {
                throw new Error("User cancelled the deletion.");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs']); // Invalidate cache to fetch updated data
        },
        onError: (error) => {
            console.error("Error deleting blog:", error);
        }
    });

    const handleEditBlog = (id) => {
        navigate(`/dashboard/edit-blog/${id}`);
    };

    return (
        <div className="container p-4 mx-auto">
            <div className="flex justify-end mb-4">
                <Link to={'/dashboard/add-blog'}>
                    <button className="btn bg-red-400 text-white">Add Blog</button>
                </Link>
            </div>
            <div className="flex justify-end mb-4">
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="select select-bordered">
                    <option value="all">All</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>
            {isLoading ? (
                <span className="loading text-center flex items-center loading-ring loading-lg"></span>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Sl No.</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog, index) => (
                                <tr key={blog._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-16 h-16">
                                                    <img src={blog.thumbnail} alt={blog.title} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='font-semibold text-base'>{blog.title}</td>
                                    <td className='font-semibold text-base'>{blog.status}</td>
                                    <td>
                                        {role === 'admin' && (
                                            <div className="">
                                                {blog.status === 'draft' ? (
                                                    <button onClick={() => publishBlog.mutate(blog._id)} className="btn btn-sm bg-green-400">
                                                        <MdOutlinePublishedWithChanges />
                                                    </button>
                                                ) : (
                                                    <button onClick={() => unpublishBlog.mutate(blog._id)} className="btn btn-sm bg-red-400">
                                                        <MdOutlineUnpublished />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <button className='btn btn-sm'>
                                            <MdEdit />
                                        </button>
                                    </td>
                                    <td>
                                        {role === 'admin' && (
                                            <button onClick={() => deleteBlog.mutate(blog._id)} className='btn btn-sm text-red-400 text-xl'>
                                                <MdDelete />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ContentManagement;
