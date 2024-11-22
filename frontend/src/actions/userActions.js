import axios from 'axios'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LIST_RESET  } from '../constants/userConstants.js'
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants.js'
import { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL  } from '../constants/userConstants.js'
import { USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL  } from '../constants/userConstants.js'
import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL  } from '../constants/userConstants.js'
import { USER_LOGOUT } from '../constants/userConstants.js'

//用户登录Action
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({type: USER_LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login', {email, password}, config)

        dispatch({type: USER_LOGIN_SUCCESS, payload: data})

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload: error.response && 
            error.response.data.message 
            ? error.response.data.message 
            : error.message
         })
    }
}

//用户登出Action
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_LIST_RESET})
}

//用户注册Action
export const register = (name,email, password) => async (dispatch) => {
    try{
        dispatch({type: USER_REGISTER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users', {name, email, password}, config)

        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.response && 
            error.response.data.message 
            ? error.response.data.message 
            : error.message
         })
    }
}

//用户详情Action
export const getUserDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: USER_DETAILS_REQUEST})

        const {userLogin: {userInfo}} = getState()

        //获取登录成功后的用户信息
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}`, config)

        dispatch({type: USER_DETAILS_SUCCESS, payload: data})

    }
    catch (error) {
        dispatch({type: USER_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
         })
    }
}

//更新用户详情Action
export const updateUserDetails = (user) => async (dispatch, getState) => {
    try{
        dispatch({type: USER_UPDATE_PROFILE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        //获取登录成功后的用户信息
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/profile`, user,config)

        dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data})
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))

    }
    catch (error) {
        dispatch({type: USER_UPDATE_PROFILE_FAIL, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
         })
    }
}

//用户列表ction
export const listUsers = () => async (dispatch, getState) => {
    try{
        dispatch({type: USER_LIST_REQUEST})

        const {userLogin: {userInfo}} = getState()

        //获取登录成功后的用户信息
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users`, config)

        dispatch({type: USER_LIST_SUCCESS, payload: data})
    }
    catch (error) {
        dispatch({type: USER_LIST_FAIL, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
         })
    }
}