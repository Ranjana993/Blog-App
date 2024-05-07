import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


const Register = () => {
    const navigate = useNavigate();
    const [users, setUser] = useState({ userName: "", email: "", password: "" })

    const handleChange = (e) => setUser({ ...users, [e.target.name]: e.target.value })

    const signUpUser = async (e) => {
        // e.preventDefault();
        try {
            const { data } = await axios.post("https://blog-app-ujvu.onrender.com/register", users)
            if (data.success) {
                toast.success("Registerd succesfully ")
            }
            navigate('/login')
            setUser({ userName: "", email: "", password: "" })
        } catch (error) {
            toast.error(" Something went wrong or maybe duplicate data entry ")
            console.log(error);
        }

    }
    return (
        <div>
            <form className='w-full flex flex-col justify-center items-center'>

                <div className='flex flex-col w-[90%] lg:w-1/2  justify-center rounded-md items-center gap-4'>
                    <h1 className='text-3xl lg:text-6xl py-3'>Register Now</h1>
                    <input
                        className='w-full p-2 h-10 rounded-md'
                        name='userName'
                        value={users.userName}
                        onChange={e => handleChange(e)}
                        placeholder="Enter Your Name"
                        type={'userName'}
                        required
                    />
                    <input
                        className='w-full p-2 h-10 rounded-md'
                        name='email'
                        type={'email'}
                        value={users.email}
                        onChange={e => handleChange(e)}
                        placeholder="Enter Email"
                        required
                    />
                    <input
                        className='w-full p-2 h-10 rounded-md'
                        name='password'
                        type={'password'}
                        value={users.password}
                        onChange={e => handleChange(e)}
                        placeholder="Enter Password"
                        required
                    />
                    <button className='bg-black text-white border-none outline-none w-full p-2 rounded-md' onClick={() => signUpUser()}>Register</button>
                    <p className=' w-full p-2 text-black text-center font-bold ' >Already have account ?  </p>
                    <button className=' text-black font-bold hover:bg-black hover:text-white p-2 w-full border-2 border-black rounded-md' onClick={() => navigate("/login")}>Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default Register
