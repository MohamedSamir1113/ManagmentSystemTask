/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from "./Login.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {saveUserData}=useAuth()
    const navigate = useNavigate()
    
    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`https://dummyjson.com/auth/login`, data)
            console.log(res);
            localStorage.setItem("userToken",res.data.accessToken)
            saveUserData()
            navigate("dashboard");
        } catch (error) {
            console.log(error.message);
            toast.error("Error Logging In 😢");
        }

    }

    return <>
    <ToastContainer theme="dark"/>
        <div className={`${style['login-container']} container-fluid`}>
            <div className="row justify-content-center vh-100 align-items-center">
                <div className="col-md-4 rounded rounded-3 p-3 bg-white">
                    <div className="text-center">
                        <h3>User Management System</h3>
                        <h5 className="my-3">Sign In</h5>
                        <span className="text-muted mb-2">Enter your credentials to access your account</span>

                        <form onSubmit={handleSubmit(onSubmit)} className="text-start" action="">
                            <div>
                                <label htmlFor="" className="ms-2 text-muted my-1">Email</label>
                                <input {...register("username", { required: "email is required" })} type="text" className="form-control" placeholder="Enter your email" />
                                {errors?.username && <span>{errors.username?.message}</span>}

                            </div>
                            <div>
                                <label htmlFor="" className="ms-2 text-muted mt-3 mb-1">Password</label>
                                <input {...register("password", { required: "password is required" })} type="password" className="form-control" placeholder="Enter your Password" />
                                {errors?.password && <span>{errors.password?.message}</span>}
                            </div>

                            <button type="submit" className="btn btn-warning rounded rounded-1 w-100 mt-4 mb-5 text-capitalize text-white"> SIGN IN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default Login;


