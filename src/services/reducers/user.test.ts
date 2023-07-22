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
    UPDATE_PERSONAL_INFO_SUCCESS,
    TUsersActions
} from "../actions/user";
import { userState, userReducer } from "./user";
import { TUser } from "../../constants/types";

const mockUser = {
    name: 'Alex',
    email: 'yandex@yan.ru'
}

describe('Тест редьюсера userReducer чаcть Login', () => {
    test('Action LOGIN_REQUEST', () => {
        const expected = {
            ...userState,
            loginRequest: true,
            loginError: false
        };
        const received = userReducer(userState, {
            type: LOGIN_REQUEST
        });
        expect(received).toEqual(expected)
    })

    test('Action LOGIN_SUCCESS', () => {
        const expected = {
            ...userState,
            loginRequest: false,
            loginError: false,
            isLoggedIn: true,
            user: mockUser,
        };
        const received = userReducer(userState, {
            type: LOGIN_SUCCESS,
            user: mockUser,
        });
        expect(received).toEqual(expected)
    })

    test('Action LOGOUT_SUCCESS', () => {
        const expected = {
            ...userState,
            loginRequest: false,
            loginError: false,
            user: null,
            isLoggedIn: false
        };
        const received = userReducer(userState, {
            type: LOGOUT_SUCCESS
        });
        expect(received).toEqual(expected)
    })

    test('Action LOGIN_FAILED', () => {
        const expected = {
            ...userState,
            loginRequest: false,
            loginError: true,
            error: 'email or password are incorrect'
        };
        const received = userReducer(userState, {
            type: LOGIN_FAILED,
            error: 'email or password are incorrect'
        });
        expect(received).toEqual(expected)
    })

})

describe('Тест редьюсера userReducer чаcть Register', () => {
    test('Action REGISTER_REQUEST', () => {
        const expected = {
            ...userState,
            registerRequest: true,
            registerError: false
        };
        const received = userReducer(userState, {
            type: REGISTER_REQUEST
        });
        expect(received).toEqual(expected)
    })

    test('Action REGISTER_SUCCESS', () => {
        const expected = {
            ...userState,
            registerRequest: false,
            registerError: false,
            isLoggedIn: true,
            user: mockUser,
        };
        const received = userReducer(userState, {
            type: REGISTER_SUCCESS,
            user: mockUser,
        });
        expect(received).toEqual(expected)
    })

    test('Action REGISTER_FAILED', () => {
        const expected = {
            ...userState,
            registerRequest: false,
            registerError: true,
            error: 'User already exists'
        };
        const received = userReducer(userState, {
            type: REGISTER_FAILED,
            error: 'User already exists'
        });
        expect(received).toEqual(expected)
    })
})

describe('Тест редьюсера userReducer чаcть Common', () => {

    test('Action RECOVERY_PWD_SUCCESS', () => {
        const expected = {
            ...userState,
            isEmailSend: true,
            error: 'no errors'
        };
        const received = userReducer(userState, {
            type: RECOVERY_PWD_SUCCESS,
            message: 'no errors'
        });
        expect(received).toEqual(expected)
    })

    test('Action SAVE_NEW_PWD_FAILED', () => {
        const expected = {
            ...userState,
            error: 'incorrect password'
        };
        const received = userReducer(userState, {
            type: SAVE_NEW_PWD_FAILED,
            error: 'incorrect password'
        });
        expect(received).toEqual(expected)
    })

    test('Action UPDATE_PERSONAL_INFO_SUCCESS', () => {
        const expected = {
            ...userState,
            user: mockUser
        };
        const received = userReducer(userState, {
            type: UPDATE_PERSONAL_INFO_SUCCESS,
            user: mockUser
        });
        expect(received).toEqual(expected)
    })

    test('Action GET_USER_INFO_SUCCESS', () => {
        const expected = {
            ...userState,
            user: mockUser,
            isLoggedIn: true
        };
        const received = userReducer(userState, {
            type: GET_USER_INFO_SUCCESS,
            user: mockUser
        });
        expect(received).toEqual(expected)
    })

    test('Action GET_USER_INFO_FAILED', () => {
        const expected = {
            ...userState,
            error: 'no data received'
        };
        const received = userReducer(userState, {
            type: GET_USER_INFO_FAILED,
            error: 'no data received'
        });
        expect(received).toEqual(expected)
    })

    test('Return InitialState', () => {
        const expected = {
            ...userState
        };
        const received = userReducer(undefined, {} as TUsersActions);
        expect(received).toEqual(expected)
    })


})