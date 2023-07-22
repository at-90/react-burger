import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    RECOVERY_PWD_SUCCESS,
    LOGOUT_SUCCESS,
    SAVE_NEW_PWD_FAILED,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILED,
    UPDATE_PERSONAL_INFO_SUCCESS, TUsersActions
} from "../actions/user";
import { TUser } from "../../constants/types";

export type TUserState = {
    user: TUser | null;
    loginRequest: boolean;
    loginError: boolean;
    registerRequest: boolean;
    registerError: boolean;
    isLoggedIn: boolean;
    isEmailSend: boolean;
    error: string
}

export const userState: TUserState = {
    user: null,
    loginRequest: false,
    loginError: false,
    registerRequest: false,
    registerError: false,
    isLoggedIn: false,
    isEmailSend: false,
    error: ''
}

export const userReducer = (state = userState, action: TUsersActions): TUserState => {

    switch (action.type) {

        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginError: false
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginError: false,
                user: action.user,
                isLoggedIn: true
            }
        }

        case LOGIN_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginError: true,
                error: action.error

            }
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginError: false,
                user: null,
                isLoggedIn: false
            }
        }

        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerError: false
            }
        }

        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                registerError: false,
                user: action.user,
                isLoggedIn: true
            }
        }

        case REGISTER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerError: true,
                error: action.error

            }
        }

        case RECOVERY_PWD_SUCCESS: {
            return {
                ...state,
                isEmailSend: true,
                error: action.message
            }
        }

        case SAVE_NEW_PWD_FAILED: {
            return {
                ...state,
                error: action.error
            }
        }

        case UPDATE_PERSONAL_INFO_SUCCESS: {
            return {
                ...state,
                user: action.user
            }
        }


        case GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                user: action.user,
                isLoggedIn: true

            }
        }

        case GET_USER_INFO_FAILED: {
            return {
                ...state,
                error: action.error
            }
        }

        default: {
            return state;
        }
    }
}

