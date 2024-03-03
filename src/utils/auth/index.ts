import axios from "axios";

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