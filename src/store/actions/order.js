import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}


export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData)
        .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            })
    }
}


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}



export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
        error: error
    }
}

export const fetchOrders = (token,userId) => {

    return dispatch => {
        dispatch(fetchOrdersStart());
        const param='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+param)
            .then(res => {
                let fetchedOrder = [];
                for (let key in res.data) {
                    fetchedOrder.push({ ...res.data[key], id: key });
                }
                dispatch(fetchOrdersSuccess(fetchedOrder));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            })
    }

}