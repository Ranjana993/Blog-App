import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleBlog from '../../pages/SingleBlog';
import Footer from '../Footer';

const Body = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('https://blog-app-ujvu.onrender.com/get-all-blog');
            if (data?.success) {
                setBlogs(data.blog);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    // Filter blogs based on search query
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="">
                <div className="px-4 my-4 flex justify-end">
                    <div className='mr-3 lg:mr-0 px-2 flex items-center h-10 bg-gray-800 w-64 rounded-lg'>
                        <input
                            type="text"
                            className='bg-transparent outline-none border-none text-white'
                            placeholder='Search Blogs'
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <span><SearchIcon /> </span>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col lg:flex-row gap-4 justify-center flex-wrap">
                        {filteredBlogs.map(blog => (
                            <div className="px-6 lg:px-0 w-full lg:w-[20%] h-auto" key={blog._id}>
                                <SingleBlog
                                    id={blog._id}
                                    img={blog.image}
                                    title={blog.title}
                                    description={blog.description}
                                    isUser={localStorage.getItem('userId') === blog?.user?._id}
                                    name={blog.userName}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Body;
