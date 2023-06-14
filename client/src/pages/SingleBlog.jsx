import React from 'react'
import { Box, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, Button } from '@mui/material';
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
        navigate(`/edit-blog/${id}`)
    }
    return (
        <div>
            <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
                <p>{title}  </p>
                {
                    isUser && (
                        <Box display={'flex'}>
                            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto',color:'green' }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="settings" onClick={handleDelete} sx={{  color: 'red' }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )
                }

            </div>
            <CardMedia component="img" height="250" image={img} alt="Paella dish" />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <Button variant='contained' onClick={()=>navigate(`/detailed-page/${id}`)}>Click to know more</Button>
        </div>
    )
}

export default SingleBlog