import React from 'react'
import { Box, CardMedia, CardContent, IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Footer from '../Component/Footer';






const SingleBlog = ({ title, isUser, description, name, img, id }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`https://blog-app-ujvu.onrender.com/delete-blog/${id}`);
            if (data?.success) {
                toast.success('Deleted successfully')
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = () => {
        console.log(id)
        navigate(`/edit-blog/${id}`)
    }
    return (
        <>
            <div className='p-2 w-full' onClick={() => navigate(`/detailed-page/${id}`)}>
                <div className={"singleCard "} >
                    {
                        isUser && (
                            <div display={'flex'}>
                                <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto', color: 'green' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="settings" onClick={handleDelete} sx={{ color: 'red' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )
                    }

                </div>
                <img className='w-full h-36 bg-cover rounded-tl-lg rounded-tr-lg' src={img} alt="Paella dish" />
                <p className='text-xl'>{title}  </p>
                <div>
                    <p>
                        {
                            description.split(' ').length > 10 ?
                                description.split(' ').slice(0, 10).join(' ') + "..." :
                                description
                        }
                    </p>
                </div>
                <button className='bg-slate-900 text-white hover:bg-black p-2 mt-4' onClick={() => navigate(`/detailed-page/${id}`)}>Click to know more</button>
            </div>
            <Footer />
        </>
    )
}

export default SingleBlog