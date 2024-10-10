import { createContext } from 'react';
import ApiService from './api.service';

export const AuthServiceContext = createContext(AuthService());

const apiService = ApiService();

function AuthService() {
    
    const login = async (username, password) => {
        const response = await apiService.post('/auth/login', { username, password });
        if (response.token) {
            localStorage.setItem('token', response.token);
        }
        return response;
    }

    const logout = () => {
        localStorage.removeItem('token');
    }

    const register = async (username, password, email, firstName, middleName, lastName, suffix, address1, address2, city, state, postalcode, timeZoneId, optInAccountNotices, optInProductNotices) => {
        const response = await apiService.post('/auth/register', { username, password, email, firstName, middleName, lastName, suffix, address1, address2, city, state, postalcode, timeZoneId, optInAccountNotices, optInProductNotices });
        if (response.token) {
            localStorage.setItem('token', response.token);
        }
        return response;
    }


    return {
        login,
        logout,
        register
    }
}

export default AuthService;