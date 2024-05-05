import { Button } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import SingleBlog from './SingleBlog';


const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    const gettingSigleBlog = async () => {
        try {
            const id = localStorage.getItem('userId')
            const { data } = await axios.get(`http://localhost:8000/all-blog/${id}`)
            if (data?.success) {
                setBlogs(data?.userBlog.blogs)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        gettingSigleBlog();
    }, [])

    return (
        <>
            <div className='flex items-center justify-center flex-col w-full'>
                <p className='text-4xl py-6'>My Blogs....</p>
                <div>
                    <div className="flex flex-col lg:flex-row gap-4 justify-center flex-wrap">
                        {
                            blogs && blogs?.map((blog) => (
                                <div className="px-6 lg:px-0 w-full lg:w-[20%] h-auto">
                                    <SingleBlog
                                        id={blog._id}
                                        isUser={true}
                                        description={blog.description}
                                        img={blog.image}
                                        name={blog.userName}
                                        title={blog.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyBlogs