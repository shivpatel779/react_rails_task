import React, {useEffect, useRef, useState} from "react";
import { Link,useNavigate,useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { signUp, loginApi } from "./Redux/Action/action";
import { 
    Container, 
    Grid,
    TextField,
    Box,
    Button
} from "@mui/material";


const Signup = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [userData, setUserData  ] = useState({})
    const referral= searchParams.get('referral')
    const dispatch= useDispatch()
    const signUpData = useSelector((state)=>state?.reducer)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = useRef({});
    password.current = watch("password", "");


    const onSubmit = async (data) => { 
        console.log(1111)
        var obj={
            user:data
        }
        obj.user.referral=referral
        dispatch(signUp(obj))
        setUserData(data)
        
    };

    useEffect(()=>{
        if(signUpData?.signUpData?.status==200){
            var objLogin={
                user:{
                    email:userData.email,
                    password:userData.password
                }
            }
            dispatch(loginApi(objLogin))
           
        }
        if(signUpData?.loginError?.data.error){
            toast.error(`${signUpData?.loginError?.data.error}`)
        }
        if(signUpData?.loginData?.status==200){
            localStorage.setItem("authToken",signUpData?.loginData.headers.authorization?signUpData?.loginData?.headers.authorization:null)
            window.location.href='/dashboard'
        }


    },[signUpData])


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
                                <h2 className="form-title">Register Here</h2>
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
                            <div className="form-group">
                                <TextField
                                    error={errors?.confirmPassword}
                                    label="Confirm Password"
                                    variant="outlined"
                                    type="password"
                                    sx={{ width: 1 }}
                                    {...register("password_confirmation", {
                                        validate: (value) =>
                                          value === password.current ||
                                          "The passwords do not match",
                                      })}

                                />
                                {errors.confirmPassword && <span className="errorMsg">{errors?.confirmPassword?.message}</span>}
                            </div>
                            <Button
                                variant="contained"
                                type="submit"
                                className="theme-btn"
                                sx={{ width: 1 }}
                            >
                                Register
                            </Button>
                            <h4 className="forgot-text">
                                Already have an account?
                                <Link to="/">Login Here</Link>
                            </h4>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Signup;