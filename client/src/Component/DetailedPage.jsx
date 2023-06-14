import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailedPage = () => {
    const [blog, setBlog] = useState({})
    const {id} = useParams().id
    console.log(id)
    const handleEdit = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/get-single-blog/${id}`);
            console.log(data);
            if (data?.success) {
                setBlog(data?.blog)
            }
        }
        catch (error) {
            console.log(error);

        }
    }

    console.log(blog)
    useEffect(() => {
        handleEdit()
    }, [id])

    return (
        <div className='container-Detail'>
            <div id="img">
                <img src="https://wallpapers.com/images/high/easter-egg-background-1080-x-1920-s55u65h9p82osjhd.webp" alt="" />
            </div>
            <div className="data">
                <h1>Title</h1>
                <h2>Name </h2>
                <p>Email </p>
                <p>Description </p>
            </div>
        </div>
    )
}

export default DetailedPage