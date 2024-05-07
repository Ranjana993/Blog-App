import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authAction } from '../redux/store'


const Login = () => {
    const [users, setUser] = useState({ email: "", password: "" })
    const handleChange = (e) => setUser({ ...users, [e.target.name]: e.target.value })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginUser = async (e) => {
        try {
            const { data } = await axios.post("https://blog-app-ujvu.onrender.com/login", users)
            if (data.success) {
                dispatch(authAction.login())
                localStorage.setItem('userId', data?.User._id)
                toast.success("Login succesfully ")
                navigate('/')
            }
            setUser({ userName: "", email: "", password: "" })
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form className='w-full flex flex-col justify-center items-center'>

                <div className='flex gap-2 flex-col w-[90%] lg:w-1/2 justify-center items-center'>
                    <h1 className='text-6xl py-8'>Sign In </h1>
                    <input
                        name='email'
                        type={'email'}
                        value={users.email}
                        onChange={e => handleChange(e)}
                        placeholder="Enter Email"
                        required
                        className='w-full border-none outline-none p-2 h-10 indent-1 rounded-md'
                    />
                    <input
                        name='password'
                        type={'password'}
                        value={users.password}
                        onChange={e => handleChange(e)}
                        placeholder="Enter Password"
                        required
                        className='w-full border-none outline-none p-2 h-10 indent-1 rounded-md'
                    />
                    <button className='bg-black my-4 w-full p-2 text-white outline-none border-none' onClick={() => loginUser()}>Login</button>
                    <p className=' w-full p-2 text-black text-center font-bold ' >Not a user Register now </p>
                    <button className=' text-black font-bold hover:bg-black hover:text-white p-2 w-full border-2 border-black' onClick={() => navigate("/register")}>Register Here</button>
                </div>
            </form>
        </div>
    )
}

export default Login

