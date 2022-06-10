const initialstate = {
    loginData:[]
}


const reducer = (state = initialstate , action) =>{
    switch(action.type){
        case "LOGIN_DATA" :
            return {
                ...state,
                loginData : action.payload
            }
            break;
            case "ERROR" :
                return {
                    ...state,
                    loginError : action.payload
                }
                break;
                case "SIGNUP_DATA" :
                return {
                    ...state,
                    signUpData : action.payload
                }
                break;
                case "REFERRALS_DATA" :
                    return {
                        ...state,
                        referralData : action.payload
                    }
                    break;
            default:
                return state
    }
}

export default reducer;