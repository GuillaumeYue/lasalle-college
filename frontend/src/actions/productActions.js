import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants'
import { PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from '../constants/productConstants'
import { PRODUCT_DELETE_FAIL,PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS } from '../constants/productConstants'
import { PRODUCT_CREATE_FAIL,PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS } from '../constants/productConstants'
import axios from 'axios'

//获取所有产品action
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const {data} = await axios.get('/api/products')

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response && 
            error.response.data.message 
            ? error.response.data.message 
            : error.message
         })
    }
}

//获取单个产品action
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response && 
            error.response.data.message 
            ? error.response.data.message 
            : error.message
         })
    }
}

//删除产品action
export const deleteProduct = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: PRODUCT_DELETE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        //获取登录成功后的用户信息
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/products/${id}`, config)
        dispatch({type: PRODUCT_DELETE_SUCCESS})
    }
    catch (error) {
        dispatch({type: PRODUCT_DELETE_FAIL, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
         })
    }
}

//创建产品action
export const createProduct = () => async (dispatch, getState) => {
    try{
        dispatch({type: PRODUCT_CREATE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        //获取登录成功后的用户信息
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`/api/products`, {}, config)
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data})
    }
    catch (error) {
        dispatch({type: PRODUCT_CREATE_FAIL, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
         })
    }
}