import {
    AUTO_SIGN_IN,
    DELETE_USER_POST,
    REGISTER_USER,
    SIGN_USER,
} from '../types'

import axios from 'axios'
import {REFRESH, SIGNIN, SIGNUP} from "../../utils/misc/misc";


export function signUp(data) {
    const request = axios({
        method: "POST",
        url: SIGNUP,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data
    }).catch(err => {
        console.log(err);
        return false;
    });

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function signIn(data) {

    const request = axios({
        method: "POST",
        url: SIGNIN,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return false;
    });
    return {
        type: SIGN_USER,
        payload: request
    };
}


export const autoSignIn = (refToken) => {
    const request = axios({
        method: "POST",
        url: REFRESH,
        data: "grant_type=refresh_token&refresh_token=" + refToken,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => {
        console.log(response.data, "auto sign in");
        return response.data
    }).catch(e => {
        return false;
    });
    return {
        type: AUTO_SIGN_IN,
        payload: request
    };
};
