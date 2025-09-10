'use client';

import React, { useEffect } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import useAuthQueries from '@/hooks/Queries/useAuthQueries';
import toast from 'react-hot-toast';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCookies } from 'react-cookie';
import useMain from '@/hooks/useMain';

function Verification() {
    const {router} = useMain();
    const { verifyOtpMutation, resendOtpMutation } = useAuthQueries();
    const [otp, setOtp] = React.useState('');
    const [cookies] = useCookies(['token']);

    useEffect(()=>{
        console.log('Token on mount:', cookies.token);
    },[])

    const handleResendOtp = () => {
        console.log('Token:', cookies.token);
        resendOtpMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success('OTP resent successfully');
            }
        });
    }

    const handleVerifyOtp = () => {
        verifyOtpMutation.mutate({ verificationCode: otp }, {
            onSuccess: () => {
                toast.success('OTP verified successfully');
                router.push('/');
            },
            onError: (err: any) => {
                if (err.response && err.response.data && err.response.data.message) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            }
        });
    }

    return (
        <div className='main-content w-full flex flex-col items-center py-[4rem]'>
            <section className="p-6 flex flex-col items-center gap-5 w-[550px] min-h-[300px] shadow rounded px-[4rem]">
                <h1 className="text-2xl font-semibold">Verify your account</h1>
                <span className="text-center text-gray-500">We've sent a verification code to your phone.</span>

                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(val: string) => setOtp(val.replace(/\D/g, '').slice(0, 6))}
                    className="w-full mt-5"
                    inputMode="numeric"
                    pattern="\d*"
                >
                    <InputOTPGroup className='h-14'>
                        <InputOTPSlot index={0} className='h-full mx-2 shadow-none rounded-lg border w-12' />
                        <InputOTPSlot index={1} className='h-full mx-2 shadow-none rounded-lg border w-12' />
                        <InputOTPSlot index={2} className='h-full mx-2 shadow-none rounded-lg border w-12' />
                        <InputOTPSlot index={3} className='h-full mx-2 shadow-none rounded-lg border w-12' />
                        <InputOTPSlot index={4} className='h-full mx-2 shadow-none rounded-lg border w-12' />
                        <InputOTPSlot index={5} className='h-full mx-2 shadow-none rounded-lg border w-12' />
                    </InputOTPGroup>
                </InputOTP>
                <button className='flex items-center gap-2 text-red-600' onClick={handleResendOtp} disabled={resendOtpMutation.isPending}>
                    {
                        resendOtpMutation.isPending ? 'Resending...' : 'Resend OTP'
                    }
                    {
                        resendOtpMutation.isPending ? <RefreshCcw className='size-5 animate-spin' /> : null
                    }
                </button>
                <br />

                <Button loading={verifyOtpMutation.isPending} onClick={handleVerifyOtp} className='w-full h-14 text-lg' disabled={otp.length < 6}>Verify Account</Button>
            </section>
        </div>
    )
}

export default Verification