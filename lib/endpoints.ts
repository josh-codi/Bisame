export const BACKEND_BASE_URL_DEV = process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DEV;

export default {
    login: '/authentication/login',
    signup: '/authentication/signup',
    verifyOtp: '/authentication/verify-otp',
    resendOtp: '/authentication/resend-otp',
    forgotPassword: '/authentication/forgot-password',
    resetPassword: '/authentication/reset-password',
    logout: '/authentication/logout',
};