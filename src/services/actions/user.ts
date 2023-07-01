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
import {APP_MESSAGE} from "./index";


export const actionName = 'USER'

export const LOGIN_REQUEST = `${actionName}/AUTH_REQUEST`;
export const LOGIN_FAILED = `${actionName}/AUTH_FAILED`;
export const LOGIN_SUCCESS = `${actionName}/AUTH_SUCCESS`;

export const LOGOUT_REQUEST = `${actionName}LOGOUT_REQUEST`;
export const LOGOUT_FAILED = `${actionName}LOGOUT_FAILED`;
export const LOGOUT_SUCCESS = `${actionName}LOGOUT_SUCCESS`;

export const REGISTER_REQUEST = `${actionName}/REGISTER_REQUEST`;
export const REGISTER_FAILED = `${actionName}/REGISTER_FAILED`;
export const REGISTER_SUCCESS = `${actionName}/REGISTER_SUCCESS`;

export const PERSONAL_INFO_CHANGE = `${actionName}/PERSONAL_INFO_CHANGE`
export const UPDATE_PERSONAL_INFO_REQUEST = `${actionName}/UPDATE_PERSONAL_INFO`;
export const UPDATE_PERSONAL_INFO_SUCCESS = `${actionName}/UPDATE_PERSONAL_INFO_SUCCESS`;
export const UPDATE_PERSONAL_INFO_FAILED = `${actionName}/UPDATE_PERSONAL_INFO_FAILED`;

export const RECOVERY_PWD_REQUEST = `${actionName}/RECOVERY_PWD_REQUEST`;
export const RECOVERY_PWD_FAILED = `${actionName}/RECOVERY_PWD_FAILED`;
export const RECOVERY_PWD_SUCCESS = `${actionName}/RECOVERY_PWD_SUCCESS`;

export const SAVE_NEW_PWD_FAILED = `${actionName}/SAVE_NEW_PWD_FAILED`;
export const SAVE_NEW_PWD_SUCCESS = `${actionName}/SAVE_NEW_PWD_SUCCESS`;

export const GET_USER_INFO_SUCCESS = `${actionName}/GET_USER_INFO_SUCCESS`;
export const GET_USER_INFO_FAILED = `${actionName}/GET_USER_INFO_FAILED`;




const refreshToken = (afterRefresh: any) => (dispatch: any) => {
	refreshTokenRequest()
		.then((res) => {
			setCookie('atoken', res.accessToken);
			setLocalStorage('rtoken', res.refreshToken);
			dispatch(afterRefresh);
		})
};

export const loginUser = (loginData?: any) => {

	return function (dispatch: any) {
		dispatch({
			type: LOGIN_REQUEST
		})
		request(API_LOGIN_USER, {
			method: 'post',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				"email": loginData.email,
				"password": loginData.password
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

export const registerUser = (data:any) => {

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

export const updateUser = (data:any) =>{

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

export const recoveryPwd = (data:any) =>{

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

export const saveNewPwd = (data:any) =>{

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



