import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeOut=(expireTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expireTime*1000)
    }
}
export const auth = (email, password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        var url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5MJB-vvMkSUbR4qXdSim1qGRxkAODLbE';
        if(!isSignUp)
        {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5MJB-vvMkSUbR4qXdSim1qGRxkAODLbE';
        }
        const data = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }; 
        axios.post(url, data, config)
            .then(response => {
                const expirationDate=new Date(new Date().getTime() + response.data.expiresIn*1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',response.data.localId);
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeOut(response.data.expiresIn))
            })
            .catch(err => {
                console.log("err", err);
                dispatch(authFailed(err.response.data.error));
            })
    }
}


export const setAuthRedirectPath=(path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}


export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        const Expiry=new Date(localStorage.getItem('expirationDate'));
        if(!token)
        {
            dispatch(logout())
        }
        else{
            if(Expiry<=new Date())
            {
                dispatch(logout())
            }
            else{
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess({idToken:token,localId:userId}))
                dispatch(checkAuthTimeOut((Expiry.getTime()-new Date().getTime())/1000))
            }
        }
    }
}