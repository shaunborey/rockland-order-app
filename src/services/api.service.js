import { createContext } from 'react';
import axios from 'axios';

export const ApiServiceContext = createContext(ApiService());

function ApiService() {
    const API_URL = '/api';

    const get = async (apiPath) => {
        const response = await axios.get(API_URL + apiPath);
        return response.data;    
    }

    const post = async (apiPath, postData) => {
        const response = await axios.post(API_URL + apiPath, postData);
        return response.data;
    }

    return {
        get,
        post
    }
}

export default ApiService;