import React from "react";
import errorIcon from '../src/assets/error-icon.png'
import {
    Container,
    Grid,
    Button, 
    Modal, 
    Box,
    TextField
} from "@mui/material";


const AuthError = () => {

    const handleClick=()=>{
        localStorage.clear()
        window.location.href='/'
    }
    return (
        <section className="authentic-error-wrapper">
            <Container>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                >
                    <Grid item xs={6}>
                        <div className="authentic-box">
                            <img src={errorIcon} alt="icon" className="icon" />
                            <h2 className="title">Authentication Failed</h2>
                            <p className="info">
                                You are not allowed to authenticate to Dashboard paege. Please login again to proceed for the Dashboard page.
                            </p>
                            <Button
                                variant="contained"
                                className="theme-btn"
                                onClick={()=>handleClick()}
                            >
                                Login Again
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
export default AuthError;