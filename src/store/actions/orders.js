import * as actionTypes from './actionTypes';
import axios from '../../axious-orders';

const sendOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.BURGER_ORDER_SUCCESS, 
        orderId : id,
        orderData : orderData
    };
};

const sendOrderFailed = (error) => {
    return {
        type: actionTypes.BURGER_ORDER_FAILED,
        error: error
    };
};

const sendOrderStart = () => {
    return {
        type: actionTypes.BURGER_ORDER_START
    };
}
export const sendBurgerOrder = (orderData, token) => {
    return dispatch => {
        dispatch(sendOrderStart());
        axios.post(`/orders.json?auth=${token}`, orderData)
        .then(response => 
            {
                dispatch(sendOrderSuccess(response.data.id, orderData))
            })
        .catch(error =>{
            dispatch(sendOrderFailed(error));
        });
    }
}

export const orderInit = () => {
    return {
        type: actionTypes.ORDER_INIT
    };
}

const fetchOrderSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: fetchedOrders
    }
}

const fetchOrderFailed = (error) => {
    return {
        type : actionTypes.FETCH_ORDER_FAILED,
        error: error
    }
}

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_INIT
    };
}

export const fetchOrders = (token, userId) =>  {
    return dispatch =>  {
        dispatch(fetchOrderStart());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        
        axios.get(`/orders.json${queryParams}`)
        .then(res => {
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push(
                    {
                    ...res.data[key],
                    id: key
                    }
                );
            }
            console.log(fetchedOrders);
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(e => {
            dispatch(fetchOrderFailed(e));
        })
    }
}