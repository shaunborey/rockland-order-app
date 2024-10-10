import { createContext } from 'react';
import ApiService from './api.service';

export const OrderServiceContext = createContext(OrderService());

const apiService = ApiService();

function OrderService() {

    const createOrder = async (details, shippingAddress1, shippingAddress2, shippingCity, shippingState, shippingPostalCode, shippingOptionId, orderTotal, purchaseOrderPDF) => {
        var response = {status: "", message: ""};
        try {
            const responseMsg = await apiService.post('/order/create-order', { details, shippingAddress1, shippingAddress2, shippingCity, shippingState, shippingPostalCode, shippingOptionId, orderTotal, purchaseOrderPDF });
            response = {
                status: "success",
                message: responseMsg
            }
        } catch(error) {
            response = {
                status: "error",
                message: error.message
            }
        }
        
        return response;
    }

    const getShippingOptions = async () => {
        const response = await apiService.get('/order/shipping-options');
        return response;
    }

    const getProductList = async () => {
        const response = await apiService.get('/order/product-list');
        return response;
    }

    return {
        createOrder,
        getShippingOptions,
        getProductList
    }
}

export default OrderService;