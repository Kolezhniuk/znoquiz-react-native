import {AUTO_SIGN_IN, DELETE_USER_POST, GET_USER_POSTS, REGISTER_USER, SIGN_USER} from "../types";

export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                userData: {
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refToken: action.payload.refreshToken || false
                }
            };

        case SIGN_USER:
            return {
                ...state,
                userData: {
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refToken: action.payload.refreshToken || false
                }
            };
        case AUTO_SIGN_IN:
            return {
                ...state,
                userData: {
                    uid: action.payload.user_id || false,
                    token: action.payload.id_token || false,
                    refToken: action.payload.refresh_token || false
                }
            };
        case GET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload
            };
        case DELETE_USER_POST:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }

}