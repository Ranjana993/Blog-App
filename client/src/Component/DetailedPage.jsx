import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from "@mui/material"
import Footer from './Footer'

const DetailedPage = () => {
    const [blog, setBlog] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const handleEdit = async () => {
        try {
            const { data } = await axios.get(`https://blog-app-ujvu.onrender.com/get-single-blog/${id}`);
            console.log(data)
            console.log(data.newBlog);
            if (data?.success) {
                setBlog(data?.newBlog)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleEdit()
    }, [id])

    return (
        <> 
        <div className='flex flex-col lg:flex-row  gap-2 w-full p-2'>
            <div className='w-full lg:w-1/2'>
                <img className='w-full' src={blog.image} alt="" />
            </div>
            <div className="w-full p-0 lg:px-12">
                <h1 className='text-4xl py-4'> {blog.title}</h1>
                <p> {blog.description}</p>
                <div className="flex gap-2 float-right  mt-24">
                    <button className='bg-green-700 text-white p-2 rounded-lg' onClick={() => navigate("/")}>Back to Home</button>
                    <button className='bg-green-700 text-white p-2 rounded-lg' onClick={() => navigate(`/edit-blog/${blog._id}`)} >Suggest Changes </button>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default DetailedPage