import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
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
                <div className="px-4 my-4 flex justify-end">
                    <div className='mr-3 lg:mr-0 px-2 flex items-center h-10 bg-gray-800 w-64 rounded-lg'>
                        <input type="text" className='bg-transparent outline-none border-none' placeholder='Search Blogs' />
                        <span><SearchIcon /> </span>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col lg:flex-row gap-4 justify-center flex-wrap">
                        {
                            blogs && blogs?.map((blog) => (
                                <div className="px-6 lg:px-0 w-full lg:w-[20%] h-auto" key={blog._id} >
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