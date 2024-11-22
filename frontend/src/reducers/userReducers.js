import { USER_LIST_RESET, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants"
import { USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS} from "../constants/userConstants"
import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL } from "../constants/userConstants"

//用户登录reducer
export const userLoginReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

//用户注册reducer
export const userRegisterReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

//用户详情reducer
export const userDetailsReducer = (state = {user:{}}, action) =>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {loading: true, ...state}
        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload}
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

//更新用户详情reducer
export const userUpdateProfileReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, userInfo: action.payload, success: true}
        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

//获取用户列表reducer
export const userListReducer = (state = {users: []}, action) =>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true}
        case USER_LIST_SUCCESS:
            return {loading: false, users: action.payload}
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload}
        case USER_LIST_RESET:
            return {users: []}
        default:
            return state
    }
}