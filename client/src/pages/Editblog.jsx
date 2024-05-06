import styled from '@emotion/styled'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';




const Editblog = () => {
    const [blog, setBlog] = useState({})
    const [datas, setData] = useState({})

    const handleChange = (e) => setData({ ...datas, [e.target.name]: e.target.value })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`https://blog-app-ujvu.onrender.com/update-blog/${id}`, {
                title: datas?.title,
                description: datas?.description,
                image: datas?.image,
                user: id
            })

            if (data?.success) {
                toast.success("updated successfuly");
                navigate('/')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const id = useParams().id;

    const handleEdit = async () => {
        try {
            const { data } = await axios.get(`https://blog-app-ujvu.onrender.com/get-single-blog/${id}`);
            console.log(data);
            if (data?.success) {
                setBlog(data?.blog)
                setData({
                    title: data?.newBlog?.title,
                    description: data?.newBlog?.description,
                    image: data?.newBlog?.image,
                });
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
        <form onSubmit={handleSubmit} className='flex p-4 justify-center '>
            <div className='flex w-1/2 justify-center items-center flex-col'>
                <h2 className='text-6xl py-6'>Update Your Blog </h2>
                <div className='flex w-full flex-col gap-4 justify-center items-center'>
                    <input
                        variant="standard"
                        className='w-full rounded-md border-none outline-none h-10 indent-1 '
                        name='title'
                        type={'title'}
                        value={datas.title}
                        onChange={e => handleChange(e)}
                        required
                    />
                    <textarea
                        variant="standard"
                        className='w-full  rounded-md border-none outline-none p-2 pb-7 '
                        name='description'
                        rows={10}
                        type={'description'}
                        value={datas.description}
                        onChange={e => handleChange(e)}
                        required
                    />
                    <input
                        variant="standard"
                        className='w-full rounded-md  border-none outline-none h-10 indent-1 '
                        name='image'
                        type={'file'}
                        value={datas.image}
                        onChange={e => handleChange(e)}
                        required
                    />
                    <button className='p-2 px-12 hover:bg-green-900 bg-green-700 rounded-lg text-white' type='submit'>UPDATE </button>
                </div>
            </div>
        </form>
    )
}

export default Editblog
