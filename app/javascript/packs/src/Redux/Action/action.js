import axios from "axios";


const baseUrl = window.location.origin
export const loginApi = (body) => {
    
    return (dispatch) => {
        return axios.post(baseUrl + '/login', body)
            .then(data => {
                dispatch({
                    type:"LOGIN_DATA",
                    payload: data
                })
            })
            .catch(error => {
                dispatch({
                    type:"ERROR",
                    payload: error.response
                })
            });
    };
   
}

export const signUp = (body) => {
    
    return (dispatch) => {
        return axios.post(baseUrl + '/sign_up', body)
            .then(data => {
                dispatch({
                    type:"SIGNUP_DATA",
                    payload: data
                })
            })
            .catch(error => {
                dispatch({
                    type:"ERROR",
                    payload: error.response
                })
            });
    };
   
}

export const shareReferrals = (body) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authToken')
      }
    
    return (dispatch) => {
        return axios.post(baseUrl + '/api/v1/referrals', body,{ headers: headers})
            .then(data => {
                dispatch({
                    type:"REFERRALS_DATA",
                    payload: data
                })
            })
            .catch(error => {
                dispatch({
                    type:"ERROR",
                    payload: error.response
                })
            });
    };
   
}






