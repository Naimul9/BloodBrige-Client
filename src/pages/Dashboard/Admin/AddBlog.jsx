
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddBlog = () => {
    const { register, handleSubmit, reset } = useForm();
    const [content, setContent] = useState('');
    
    const axiosSecure = useAxiosSecure();

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
            params: {
                key: import.meta.env.VITE_IMAGE_HOSTING_KEY
            }
        });

        return response.data.data.url;
    };

    const onSubmit = async (data) => {
        try {
            const thumbnailUrl = await uploadImage(data.thumbnail[0]);
            const blogData = {
                title: data.title,
                thumbnail: thumbnailUrl,
                content: content,
                status: 'draft'
            };

            // Sending only the required data to the server
            const sanitizedBlogData = {
                title: blogData.title,
                thumbnail: blogData.thumbnail,
                content: blogData.content.replace(/<[^>]+>/g, ''), // remove HTML tags if needed
                status: blogData.status
            };

            await axiosSecure.post('/blogs', sanitizedBlogData);
            reset();
            setContent('');
            toast.success('Blog created successfully!');
        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error('Failed to create blog. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4 font-semibold ">Add New Blog</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label htmlFor="thumbnail" className="block text-sm font-medium">Thumbnail Image</label>
                    <input
                        type="file"
                        id="thumbnail"
                        {...register('thumbnail', { required: true })}
                        className="file-input file-input-bordered w-full"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium">Content</label>
                    <JoditEditor
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                        className="border p-2"
                    />
                </div>
                <button type="submit" className="btn bg-rose-500 text-white font-semibold">Create</button>
            </form>
        </div>
    );
};

export default AddBlog;
