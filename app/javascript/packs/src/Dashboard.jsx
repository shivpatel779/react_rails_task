import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import AuthError from './authError';
import { shareReferrals } from './Redux/Action/action';
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Grid,
    Button, 
    Modal, 
    Box,
    TextField
} from "@mui/material";

const Dashboard = () => {
    const dispatch= useDispatch()
    const referralData = useSelector((state)=>state?.reducer)
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
      dispatch(shareReferrals(data))
       
    };
    const handleLogout=()=>{
        localStorage.clear()
        window.location.href='/'
    }

    useEffect(()=>{
        if(referralData?.referralData?.status==200){
            toast.success(`${referralData?.referralData?.data.message}`)
            setOpen(false)
        }
        if(referralData?.loginError?.status==401){
            
            setError(true)
        }
    },[referralData])

    return (
        <>
        <div className="action-header">
            <Button className='btn-theme' onClick={()=>handleLogout()} variant="contained" color="secondary">Logout</Button>
        </div>
         <div className="form-wrapper">
            <Container>
            {error && <AuthError/>}
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={() => setOpen(true)}>share with your friend</Button>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className='shareModal' component="form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <TextField
                                    error={errors?.email}
                                    label="Email"
                                    sx={{ width: 1 }}
                                    {...register("invitation_email", {
                                    required: { value: true, message: "This is required" },
                                    pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Email is required" }
                                    }
                                    )}
                                />
                                {errors.email && <span className="errorMsg">{errors?.email?.message}</span>}
                            </div>
                            <Button
                                variant="contained"
                                type="submit"
                                className="theme-btn"
                                sx={{ width: 1 }}
                            >
                                Share
                            </Button>
                        </Box>
                    </Modal>
                </Grid>
            </Container>
            </div>
        </>
    )
}
export default Dashboard