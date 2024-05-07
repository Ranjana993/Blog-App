import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from "@mui/material"
import axios from 'axios'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import Footer from '../Component/Footer'

const CreateBlog = () => {
    const id = localStorage.getItem('userId')
    const [datas, setData] = useState({
        title: "",
        description: "",
        image: ""
    })

    const handleChange = (e) => setData({ ...datas, [e.target.name]: e.target.value })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://blog-app-ujvu.onrender.com/create-blog", {
                title: datas.title,
                description: datas.description,
                image: datas.image,
                user: id
            })
            if (data?.success) {
                alert("blog created");
                navigate('/')
            }
            console.log("data", data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='flex justify-center items-center mt-8'>
                <form onSubmit={handleSubmit} className='w-[90%] lg:w-1/2  ' >
                    <div className='flex justify-center items-center flex-col'>
                        <h1 className='text-4xl py-4'>CREATE  BLOG</h1>
                        <div className='flex flex-col justify-center gap-4 w-full px-4'>
                            <input
                                name='title'
                                type={'title'}
                                className='w-full indent-5 h-10 border-none outline-none rounded-md p-1'
                                value={datas.title}
                                onChange={e => handleChange(e)}
                                placeholder="Enter title here"
                                required
                            />
                            <input
                                name='image'
                                type={'text'}
                                className='w-full indent-5 h-10 border-none outline-none rounded-md p-1'
                                value={datas.image}
                                onChange={e => handleChange(e)}
                                placeholder="Enter image url here"
                                required
                            />
                            <textarea
                                name='description'
                                type={'description'}
                                cols={100}
                                className='w-full indent-5 py-4 border-none outline-none rounded-md p-1'
                                value={datas.description}
                                onChange={e => handleChange(e)}
                                placeholder="Enter description here"
                                required
                            />
                            <button className='bg-slate-800 p-2 w-full text-white' type='submit'>Publish Your Post </button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default CreateBlog