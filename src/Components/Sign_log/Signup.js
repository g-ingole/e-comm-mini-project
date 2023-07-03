import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css";
import { message } from 'antd';

const Signup = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);


    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/login')
        }
    })

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const setval = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const SubmitData = async (e) => {
        e.preventDefault();
        const { fname, email, password, cpassword } = inpval;

        if (fname === "") {
            toast.warning("fname is required!", {
                position: "top-center"
            });
        } else if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else if (cpassword === "") {
            toast.error("cpassword is required!", {
                position: "top-center"
            });
        }
        else if (cpassword.length < 6) {
            toast.error("confirm password must be 6 char!", {
                position: "top-center"
            });
        } else if (password !== cpassword) {
            toast.error("pass and Cpass are not matching!", {
                position: "top-center"
            });
        } else {


            const data = await fetch("https://backend-a-a-a-l.vercel.app/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();
            if (res.status === 201) {
                message.success("Registration Successfully done 😃!")
            }
            navigate("/login")

        }
    }

    return (
        <div>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                            your tasks! We hope that you will get like it.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" name="fname" id="fname" value={inpval.fname} onChange={setval} placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={inpval.email} onChange={setval} placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two " >
                                <input type={!passShow ? "password" : "text"} name="password" id="password" value={inpval.password} onChange={setval} placeholder='Enter Your password' />
                                <div className="showpass" style={{ marginTop: "35px" }} onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} name="cpassword" id="cpassword" value={inpval.cpassword} onChange={setval} placeholder='Confirm password' />
                                <div className="showpass" style={{ marginTop: "35px" }} onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>


                        <button className='btn' onClick={SubmitData}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
                    </form>
                    <ToastContainer />

                </div>
            </section>
        </div>
    )
}

export default Signup
