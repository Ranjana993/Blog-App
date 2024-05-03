import React from 'react'
import { Box, CardMedia, CardContent, IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';






const SingleBlog = ({ title, isUser, description, name, img, id }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:8000/delete-blog/${id}`);
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
        <div className='wrapper_container' onClick={() => navigate(`/detailed-page/${id}`)}>
            <div  className={"singleCard"} >
                
                {
                    isUser && (
                        <Box display={'flex'}>
                            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto', color: 'green' }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="settings" onClick={handleDelete} sx={{ color: 'red' }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )
                }

            </div>
            <CardMedia component="img" height="250" image={img} alt="Paella dish" />
            <p>{title}  </p>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <button  className='btns2' onClick={()=> navigate(`/detailed-page/${id}`)}>Click to know more</button>
        </div>
    )
}

export default SingleBlog