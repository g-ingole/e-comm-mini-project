import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import "./mix.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { message } from 'antd';
const Login = () => {
    const [passShow, setPassShow] = useState(false);

    const navigate = useNavigate();





    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/home')
        }
    })

    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    });

    const setdata = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const handledata = async (e) => {
        e.preventDefault();
        const { email, password } = inpval;

        if (email === "") {
            toast.warning("email is required!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("confirm password must be 6 char!", {
                position: "top-center"
            });
        } else {
            const data = await fetch("https://backend-a-a-a-l.vercel.app/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const res = await data.json();

            if (res.status === 201) {
                localStorage.setItem("user", JSON.stringify(res));
                navigate('/home')
                message.success("Login Successfully done 😃!")
            } else {
                message.error("Enter a Valid Password")
            }

        }

    }





    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={inpval.email} onChange={setdata} placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} name="password" id="password" value={inpval.password} onChange={setdata} placeholder='Enter Your password' />
                                <div className="showpass" style={{ marginTop: "35px" }} onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={handledata} >Login</button>
                        <p>Don't have an Account? <NavLink to="/">Sign Up</NavLink> </p>
                    </form>
                    <ToastContainer />

                </div>
            </section>
        </>
    )
}

export default Login