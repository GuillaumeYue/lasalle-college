import axios from 'axios'
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL} from '../constants/orderConstants'
import { ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST } from '../constants/orderConstants'
import { ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST } from '../constants/orderConstants'
//创建订单Action
export const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_CREATE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        //获取登录成功后的用户信息
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`/api/orders`, order, config)

        dispatch({type: ORDER_CREATE_SUCCESS, payload: data})

    }
    catch (error) {
        dispatch({type: ORDER_CREATE_FAIL, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
         })
    }
}

//获取单个订单Action
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_DETAILS_REQUEST})

        const {userLogin: {userInfo}} = getState()

        //获取登录成功后的用户信息
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`, config)

        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})

    }
    catch (error) {
        dispatch({type: ORDER_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
         })
    }
}

//获取所有订单Action
export const listOrders = () => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_LIST_REQUEST})

        const {userLogin: {userInfo}} = getState()

        //获取登录成功后的用户信息
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders`, config)

        dispatch({type: ORDER_LIST_SUCCESS, payload: data})

    }
    catch (error) {
        dispatch({type: ORDER_LIST_FAIL, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
         })
    }
}