import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

// Type for decoded JWT token
type DecodedToken = {
    exp: number;
    userId: string;
    // Add any other claims your JWT contains
};

/**
 * Check if the token is expired
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};

/**
 * Get JWT token from secure storage
 */
export const getToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('jwt_token');
        if (token && !isTokenExpired(token)) {
            return token;
        }
        return null;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

/**
 * Set up interceptor for axios to handle token expiration
 */
export const setupAxiosInterceptors = (axios: any) => {
    axios.interceptors.response.use(
        (response: any) => response,
        async (error: any) => {
            const originalRequest = error.config;

            // If the error is 401 and we haven't already tried to refresh
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                // Here you would implement your token refresh logic
                // For example:
                // const newToken = await refreshToken();
                // if (newToken) {
                //   await SecureStore.setItemAsync('jwt_token', newToken);
                //   axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                //   originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                //   return axios(originalRequest);
                // }

                // If refresh fails, redirect to login
                return Promise.reject(error);
            }

            return Promise.reject(error);
        }
    );
};