import axios from 'axios'
import { USER_LOGIN_REQUEST, USER_LOGOUT } from '../constants/userConstants.js'
import { USER_LOGIN_SUCCESS } from '../constants/userConstants.js'
import { USER_LOGIN_FAIL } from '../constants/userConstants.js'
import { USER_REGISTER_REQUEST } from '../constants/userConstants.js'
import { USER_REGISTER_SUCCESS } from '../constants/userConstants.js'
import { USER_REGISTER_FAIL } from '../constants/userConstants.js'
//import { USER_LOGOUT } from '../constants/userConstants.js'

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