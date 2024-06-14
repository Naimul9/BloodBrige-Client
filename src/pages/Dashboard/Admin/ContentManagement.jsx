import React, { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';

const ContentManagement = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
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

    const handleAddBlog = () => {
        navigate('/add-blog');
    };

    const handleEditBlog = (id) => {
        navigate(`/edit-blog/${id}`);
    };

    return (
        <div className="container p-4 mx-auto">
            <div className="flex justify-end mb-4">
                <button onClick={handleAddBlog} className="btn btn-primary">Add Blog</button>
            </div>
            <div className="flex justify-end mb-4">
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="select select-bordered">
                    <option value="all">All</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    blogs.map(blog => (
                        <div key={blog._id} className="card">
                            <div className="card-body">
                                <h2 className="card-title">{blog.title}</h2>
                                <p>{blog.content}</p>
                                <div className="card-actions justify-end">
                                    {user?.role === 'admin' && (
                                        <>
                                            {blog.status === 'draft' ? (
                                                <button onClick={() => publishBlog.mutate(blog._id)} className="btn btn-success">Publish</button>
                                            ) : (
                                                <button onClick={() => unpublishBlog.mutate(blog._id)} className="btn btn-warning">Unpublish</button>
                                            )}
                                            <button onClick={() => handleEditBlog(blog._id)} className="btn btn-info">Edit</button>
                                            <button onClick={() => deleteBlog.mutate(blog._id)} className="btn btn-danger">Delete</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContentManagement;
