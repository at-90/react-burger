import {request, refreshTokenRequest} from "../../utils/getApiData";
import {
	API_LOGIN_USER,
	API_REGISTER_USER,
	API_USER,
	API_RECOVERY,
	API_LOGOUT_USER,
	API_SAVE_NEW_PWD,
} from "../../constants/api";
import {delLocalStorage, getLocalStorage, setLocalStorage} from "../../utils/localStorage";
import {getCookie, setCookie} from "../../utils/cookie";
import {APP_MESSAGE, TAppActions} from "./index";
import { TApplicationActions, TIngredient, TUser} from "../../constants/types";
import {AppDispatch, AppThunk} from "../../constants/types";

export const LOGIN_REQUEST:`USER/AUTH_REQUEST`  = `USER/AUTH_REQUEST`;
export const LOGIN_FAILED:`USER/AUTH_FAILED` = `USER/AUTH_FAILED`;
export const LOGIN_SUCCESS:`USER/AUTH_SUCCESS` = `USER/AUTH_SUCCESS`;

export const LOGOUT_REQUEST:`USER/LOGOUT_REQUEST` = `USER/LOGOUT_REQUEST`;
export const LOGOUT_FAILED:`USER/LOGOUT_FAILED` = `USER/LOGOUT_FAILED`;
export const LOGOUT_SUCCESS:`USER/LOGOUT_SUCCESS` = `USER/LOGOUT_SUCCESS`;

export const REGISTER_REQUEST:`USER/REGISTER_REQUEST` = `USER/REGISTER_REQUEST`;
export const REGISTER_FAILED:`USER/REGISTER_FAILED` = `USER/REGISTER_FAILED`;
export const REGISTER_SUCCESS:`USER/REGISTER_SUCCESS` = `USER/REGISTER_SUCCESS`;

export const PERSONAL_INFO_CHANGE:'USER/PERSONAL_INFO_CHANGE' = 'USER/PERSONAL_INFO_CHANGE';
export const UPDATE_PERSONAL_INFO_REQUEST:`USER/UPDATE_PERSONAL_INFO` = `USER/UPDATE_PERSONAL_INFO`;
export const UPDATE_PERSONAL_INFO_SUCCESS:`USER/UPDATE_PERSONAL_INFO_SUCCESS` = `USER/UPDATE_PERSONAL_INFO_SUCCESS`;
export const UPDATE_PERSONAL_INFO_FAILED:`USER/UPDATE_PERSONAL_INFO_FAILED` = `USER/UPDATE_PERSONAL_INFO_FAILED`;

export const RECOVERY_PWD_REQUEST:`USER/RECOVERY_PWD_REQUEST` = `USER/RECOVERY_PWD_REQUEST`;
export const RECOVERY_PWD_FAILED:`USER/RECOVERY_PWD_FAILED` = `USER/RECOVERY_PWD_FAILED`;
export const RECOVERY_PWD_SUCCESS:`USER/RECOVERY_PWD_SUCCESS` = `USER/RECOVERY_PWD_SUCCESS`;

export const SAVE_NEW_PWD_FAILED:`USER/SAVE_NEW_PWD_FAILED` = `USER/SAVE_NEW_PWD_FAILED`
export const SAVE_NEW_PWD_SUCCESS:`USER/SAVE_NEW_PWD_SUCCESS` = `USER/SAVE_NEW_PWD_SUCCESS`;

export const GET_USER_INFO_SUCCESS:`USER/GET_USER_INFO_SUCCESS` = `USER/GET_USER_INFO_SUCCESS`;
export const GET_USER_INFO_FAILED:`USER/GET_USER_INFO_FAILED` = `USER/GET_USER_INFO_FAILED`;


export type TUsersActions =
	{ type: typeof LOGIN_REQUEST} |
	{ type: typeof LOGIN_FAILED; error: string } |
	{ type: typeof LOGIN_SUCCESS; user: TUser | null } |
	{ type: typeof LOGOUT_REQUEST } |
	{ type: typeof LOGOUT_FAILED } |
	{ type: typeof LOGOUT_SUCCESS } |
	{ type: typeof REGISTER_REQUEST } |
	{ type: typeof REGISTER_FAILED; error: string } |
	{ type: typeof REGISTER_SUCCESS;user: TUser | null } |
	{ type: typeof PERSONAL_INFO_CHANGE } |
	{ type: typeof UPDATE_PERSONAL_INFO_REQUEST } |
	{ type: typeof UPDATE_PERSONAL_INFO_SUCCESS;user: TUser | null } |
	{ type: typeof UPDATE_PERSONAL_INFO_FAILED } |
	{ type: typeof RECOVERY_PWD_REQUEST } |
	{ type: typeof RECOVERY_PWD_FAILED } |
	{ type: typeof RECOVERY_PWD_SUCCESS; message: string  } |
	{ type: typeof SAVE_NEW_PWD_FAILED; error: string  } |
	{ type: typeof SAVE_NEW_PWD_SUCCESS } |
	{ type: typeof GET_USER_INFO_SUCCESS;user: TUser | null } |
	{ type: typeof GET_USER_INFO_FAILED; error: string } |
	{ type: typeof APP_MESSAGE }



const refreshToken:any = (afterRefresh: any) => (dispatch: any) => {
	refreshTokenRequest()
		.then((res) => {
			setCookie('atoken', res.accessToken);
			setLocalStorage('rtoken', res.refreshToken);
			dispatch(afterRefresh);
		})
};

export const loginUser   = (loginData?: any) => {

	return function (dispatch: any) {
		dispatch({
			type: LOGIN_REQUEST
		})
		request(API_LOGIN_USER, {
			method: 'post',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				"email": loginData?.email,
				"password": loginData?.password
			})
		})
			.then(res => {
				let authToken = res.accessToken.split('Bearer ')[1];
				if (authToken) {
					setCookie('atoken', authToken);
				}
				if (res && res.success) {
					dispatch({
						type: LOGIN_SUCCESS,
						user: res.user,
					})
					setLocalStorage('user', res.user)
					setLocalStorage('rtoken', res.refreshToken)
				}
				if (res && !res.success) {
					dispatch({type: LOGIN_FAILED, error:  res.message})
				}

			})
			.catch((e)=> {
				if (e.message === 'jwt expired') {
					dispatch(refreshToken(loginUser()))
				} else {
					dispatch({
						type: LOGIN_FAILED,
						error: e.message
					})
					dispatch({type: APP_MESSAGE, message: e.message})
				}
			})
	}
}

export const logoutUser = () => {

	return function (dispatch:any) {
		dispatch({
			type: LOGOUT_REQUEST
		})

		request(API_LOGOUT_USER, {
			method: 'post',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ token: getLocalStorage('rtoken') }),
		})
			.then(res => {
				if (res && res.success) {

					dispatch({
						type: LOGOUT_SUCCESS
					})
					setCookie('atoken', '',{expires : new Date(0)});
					delLocalStorage('user');
					delLocalStorage('rtoken');
				}

			})
			.catch((e)=> dispatch({type: LOGOUT_FAILED, error:  e.message}))
	}
}

export const registerUser = (data: { name: string, email: string, password: string }) => {

	return function (dispatch:any) {
		dispatch({
			type: REGISTER_REQUEST
		})

		request(API_REGISTER_USER, {
			method: 'post',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				"name": data.name,
				"email": data.email,
				"password": data.password
			})
		})
			.then(res => {

				if (res && res.success) {
					let authToken = res.accessToken.split('Bearer ')[1];
					if (authToken) {
						setCookie('atoken', authToken);
					}

					dispatch({
						type: REGISTER_SUCCESS,
						user: res.user
					})

					setLocalStorage('user', res.user)
					setLocalStorage('rtoken', res.refreshToken)

				}
				if(res && !res.success ){
					dispatch({type: REGISTER_FAILED, error: res.message})
				}

			})
			.catch((e)=> {
				dispatch({type: REGISTER_FAILED, error: e.message})
				dispatch({type: APP_MESSAGE, message: e.message})
			} )
	}
}

export const updateUser = (data:{ name: string, email: string, password: string }) =>{

	return function (dispatch:any) {
		dispatch({
			type: UPDATE_PERSONAL_INFO_REQUEST
		})

		request(API_USER, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': `Bearer ${getCookie('atoken')}`
			},
			body: JSON.stringify({
				"name": data.name,
				"email": data.email,
				"password": data.password
			})
		})
			.then(res => {

				if (res && res.success) {

					let authToken = res.accessToken.split('Bearer ')[1];
					if (authToken) {
						setCookie('atoken', authToken);
					}

					dispatch({
						type: UPDATE_PERSONAL_INFO_SUCCESS,
						user: res.user
					})

					setLocalStorage('user', res.user)
					setLocalStorage('rtoken', res.refreshToken)

				}

				if(res && res.success !=='true'){
					dispatch({type: UPDATE_PERSONAL_INFO_FAILED, error: res.message})

				}

			})
			.catch((e)=>
				{

					if (e.message === 'jwt expired') {
						dispatch(refreshToken(loginUser()))
					} else {
						dispatch({
							type: UPDATE_PERSONAL_INFO_FAILED,
							error: e.message
						})
					}
				}
			)
	}
}

export const recoveryPwd = (data:{  email: string }) =>{

	return function (dispatch:any) {
		dispatch({
			type: RECOVERY_PWD_REQUEST
		})

		request(API_RECOVERY, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				"email": data,
			})
		})
			.then(res => {

				if (res && res.success) {

					dispatch({
						type: RECOVERY_PWD_SUCCESS,
						message: res.success
					})


				}
				if(res && !res.success){
					dispatch({type: RECOVERY_PWD_FAILED, error: res.message})
				}

			})
			.catch((e)=> {
				dispatch({type: RECOVERY_PWD_FAILED, error: e.message})
				dispatch({type: APP_MESSAGE, message: e.message})
			})
	}
}

export const saveNewPwd:any = (data:{ password: string, token: string }) =>{

	return function (dispatch:any) {

		request(API_SAVE_NEW_PWD, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				"password": data.password,
				"token": data.token
			})
		})
			.then(res => {
				if (res && res.success) {
					dispatch({
						type: SAVE_NEW_PWD_SUCCESS,
						message: res.success
					})
				}
				if(res && res.success !=='true'){
					dispatch({type: SAVE_NEW_PWD_FAILED, error: res.message})
				}
			})
			.catch((e)=> {
				dispatch({type: SAVE_NEW_PWD_FAILED, error: e.message})
				dispatch({type: APP_MESSAGE, message: e.message})
			})
	}
}

export const getApiUser = ()=>{

	return function (dispatch:any) {

		request(API_USER, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': `Bearer ${getCookie('atoken')}`
			}
		})
			.then(res => {

				if (res && res.success) {

					let authToken = res.accessToken.split('Bearer ')[1];
					if (authToken) {
						setCookie('atoken', authToken);
					}

					dispatch({
						type: GET_USER_INFO_SUCCESS,
						user: res.user
					})

					setLocalStorage('user', res.user)
					setLocalStorage('rtoken', res.refreshToken)

				}

				if(res && res.success !=='true'){
					dispatch({type: UPDATE_PERSONAL_INFO_FAILED, error: res.message})

				}

			})
			.catch((e)=>
				{

					if (e.message === 'jwt expired') {
						dispatch(refreshToken(loginUser()))
					} else {
						dispatch({
							type: UPDATE_PERSONAL_INFO_FAILED,
							error: e.message
						})
					}
				}
			)

	}
}



