import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { loginApi } from "./Redux/Action/action";
import {
    Container,
    Grid,
    TextField,
    Box,
    Button
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
    const dispatch= useDispatch()
    const loginData = useSelector((state)=>state?.reducer)
    console.log(22222,loginData)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        var obj={
            user:data
        }
        dispatch(loginApi(obj)) 
        
    };

    useEffect(()=>{
        if(loginData.loginData.status==200){
            localStorage.setItem("authToken",loginData.loginData.headers.authorization?loginData.loginData.headers.authorization:null)
            window.location.href='/dashboard'
        }
        if(loginData?.loginError?.data?.error){
            toast.error(`${loginData?.loginError?.data?.error}`)
        }
    },[loginData])
    return (
        <div className="form-wrapper">
            <Container>
           
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                >
                    <Grid item xs={6}>
                        <Box className="form-ui" component="form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="title-box">
                                <h2 className="form-title">Login</h2>
                            </div>
                            <div className="form-group">
                                <TextField
                                    error={errors?.email}
                                    label="Email"
                                    sx={{ width: 1 }}
                                    {...register("email", {
                                    required: { value: true, message: "This is required" },
                                    pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Email is required" }
                                    }
                                    )}
                                />
                                {errors.email && <span className="errorMsg">{errors?.email?.message}</span>}
                            </div>
                            <div className="form-group">
                                <TextField
                                    error={errors?.password}
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    sx={{ width: 1 }}
                                    {...register("password", { 
                                        required: { value: true, message: "This is required" },
                                    })}

                                />
                                {errors.password && <span className="errorMsg">{errors?.password?.message}</span>}
                            </div>
                            <Button
                                variant="contained"
                                type="submit"
                                className="theme-btn"
                                sx={{ width: 1 }}
                            >
                                Login
                            </Button>
                            <h4 className="forgot-text">
                                Don't have an account?
                                <Link to="/sign_up">Register Here</Link>
                            </h4>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Login;