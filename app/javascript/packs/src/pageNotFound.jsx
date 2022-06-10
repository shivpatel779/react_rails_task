import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import errorIcon from '../src/assets/error-icon.png'
import {
    Container,
    Grid,
} from "@mui/material";

const PageNotFound=()=>{
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(() => {
            token?navigate('/dashboard'):navigate('/')
            
        }, 3000);
    },[])
    const token = localStorage.getItem("authToken")
    return(
        <div className="authentic-error-wrapper error-bg">
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
                            {token? <h2 className="title">you already login </h2>
                            :
                            <h2 className="title">please login first</h2>
                            }
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default PageNotFound