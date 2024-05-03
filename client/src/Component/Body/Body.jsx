import React from 'react'

import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import SingleBlog from '../../pages/SingleBlog';


const Body = () => {
    const [blogs, setBlogs] = useState();

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/get-all-blog');
            if (data?.success) {
                setBlogs(data.blog)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllBlogs();
    }, [])


    return (
        <>
            <div className="">
                <div className="">
                    <p className='text-red-600' >
                        List of all blogs ....</p>
                </div>
                <div className="">
                    <div className="">
                        {
                            blogs && blogs?.map((blog) => (
                                <div className="card" key={blog._id} >
                                    <SingleBlog
                                        id={blog?._id}
                                        img={blog.image}
                                        title={blog.title}
                                        description={blog.description}
                                        isUser={localStorage.getItem('userId') === blog?.user?._id}
                                        name={blog.userName}
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

export default Body