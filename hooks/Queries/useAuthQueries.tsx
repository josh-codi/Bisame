'use client';

import { axiosInstance } from '@/config/axiosInstance';
import ENDPOINTS, { BACKEND_BASE_URL_DEV } from '@/lib/endpoints'
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query'
import axios from 'axios';
import { useCookies } from 'react-cookie'

function useAuthQueries() {
    const [, setCookie] = useCookies(['token']);
    const {setToken, setUser, user} = useAuthStore();
    const loginMutation = useMutation({
        mutationFn: async (data: any) => {
            return axios.post(`${BACKEND_BASE_URL_DEV}${ENDPOINTS.login}`, data).then(response => {
                return response
            })
        },
        onSuccess: res => {
            console.log('Login Response:', res);
            let data = res.data?.data;
            setCookie('token', data?.token);
            setToken(data?.token);
            setUser({...user, ...data?.user, phoneNumber: data?.phoneNumber});
        },
    });

    const signupMutation = useMutation({
        mutationFn: async (data: any) => {
            return axios.post(`${BACKEND_BASE_URL_DEV}${ENDPOINTS.signup}`, data).then(response => {
                return response
            })
        },onSuccess: res => {
            console.log('Signup Response:', res);
            let data = res.data?.data;
            setCookie('token', data?.token);
            setToken(data?.token);
            setUser({...user, ...data?.user, phoneNumber: data?.phoneNumber});
        }
    });

    const verifyOtpMutation = useMutation({
        mutationFn: async (data: any) => {
            return axiosInstance.post(ENDPOINTS.verifyOtp, data).then(response => {
                return response
            })
        },
        onSuccess: res => {
            let data = res.data?.data;
            setCookie('token', data?.token);
            setToken(data?.token);
            setUser({...user, ...data?.user, phoneNumber: data?.phoneNumber});
        }
    });

    const resendOtpMutation = useMutation({
        mutationFn: async () => {
            return axiosInstance.post(ENDPOINTS.resendOtp).then(response => {
                return response
            })
        },
    });


    const forgotPasswordMutation = useMutation({
        mutationFn: async (data: any) => {
            return axios.post(`${BACKEND_BASE_URL_DEV}${ENDPOINTS.forgotPassword}`, data).then(response => {
                return response
            })
        },
    });


    const resetPasswordMutation = useMutation({
        mutationFn: async (data: any) => {
            return axios.post(`${BACKEND_BASE_URL_DEV}${ENDPOINTS.resetPassword}`, data).then(response => {
                return response
            })
        },
    });

    return {
        loginMutation,
        signupMutation,
        verifyOtpMutation,
        resendOtpMutation,
        forgotPasswordMutation,
        resetPasswordMutation,
    }
}

export default useAuthQueries