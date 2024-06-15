import React, { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import useRole from '../../../hooks/useRole';

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
            queryClient.invalidateQueries(['blogs', filter]); // Invalidate cache for updated data
        }
    });

    // Mutation to unpublish a blog
    const unpublishBlog = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.put(`/blogs/${id}/unpublish`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs', filter]); // Invalidate cache for updated data
        }
    });

    // Mutation to delete a blog
    const deleteBlog = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/blogs/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs', filter]); // Invalidate cache for updated data
        }
    });

    const handleEditBlog = (id) => {
        navigate(`/edit-blog/${id}`);
    };

    return (
        <div className="container p-4 mx-auto">
            <div className="flex justify-end mb-4">
                <Link to={'/dashboard/add-blog'}>
                    <button className="btn btn-primary">Add Blog</button>
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
                <p>Loading...</p>
            ) : (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Content</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog._id}>
                                <td className="border px-4 py-2">{blog.title}</td>
                                <td className="border px-4 py-2">{blog.content.slice(0,100)}</td>
                                <td className="border px-4 py-2">{blog.status}</td>
                                <td className="border px-4 py-2">
                                    {role === 'admin' && (
                                        <div className="flex space-x-2">
                                            {blog.status === 'draft' ? (
                                                <button onClick={() => publishBlog.mutate(blog._id)} className="btn btn-success">Publish</button>
                                            ) : (
                                                <button onClick={() => unpublishBlog.mutate(blog._id)} className="btn btn-warning">Draft</button>
                                            )}
                                            <button onClick={() => handleEditBlog(blog._id)} className="btn btn-info">Edit</button>
                                            <button onClick={() => deleteBlog.mutate(blog._id)} className="btn btn-danger">Delete</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ContentManagement;
