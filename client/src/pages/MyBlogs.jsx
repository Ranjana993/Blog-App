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
                <p className='text-4xl'>My Blogs....</p>
                <div>
                    <div className="flex justify-center items-center w-full">
                        {
                            blogs && blogs?.map((blog) => (
                                <div className="w-full ">
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