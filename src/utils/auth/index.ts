import axios from "axios";
import { AxiosResponse } from 'axios';

export const login = async (username: string, password: string) => {

    return axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,
        { username, password },
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

}

export const register = async (username: string, email: string, password: string) => {
    return fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
            "roles": [
                "user"
            ]
        }),
    });
}

export const handleToken = (response: AxiosResponse<any, any>) => {
        localStorage.setItem('x-access-token', response.data.accessToken);
        setTimeout(() => {
            localStorage.removeItem('x-access-token');
            window.location.href = "/";
        }, response.data.expiresIn * 1000);
    }
