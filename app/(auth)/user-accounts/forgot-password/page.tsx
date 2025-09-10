'use client';

import React from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneInput } from '@/components/ui/phoneInput';
import { ArrowLeft, ArrowRight, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import useAuthQueries from '@/hooks/Queries/useAuthQueries';
import useMain from '@/hooks/useMain';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { on } from 'events';


export const forgotPasswordSchema = z.object({
    phoneNumber: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^\+?[1-9]\d{6,14}$/, 'Invalid phone number'),
    countryShortName: z.string().optional(),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
});

type FormValues = {
    phoneNumber: string;
    countryShortName?: string;
};

type ResetPasswordFormValues = {
    password: string;
    confirmPassword: string;
};

function ForgotPassword() {
    const { router, searchParams } = useMain();
    const step = (searchParams.get('step') as 'get-otp' | 'verify-otp' | 'reset-password') || 'get-otp';
    const { forgotPasswordMutation } = useAuthQueries();
    const [otp, setOtp] = React.useState('');
    const { verifyOtpMutation, resendOtpMutation, resetPasswordMutation } = useAuthQueries();

    const resetForm = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data: ResetPasswordFormValues) => {
        resetPasswordMutation.mutate({ password: data.password }, {
            onSuccess: () => {
                toast.success('Password reset successfully');
                router.push('/user-accounts');
            },
            onError: (err: any) => {
                if (err.response && err.response.data && err.response.data.message) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            }
        });
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            phoneNumber: '',
            countryShortName: 'GH',
        },
    });

    const getOtp = (data: FormValues) => {
        forgotPasswordMutation.mutate(
            { phoneNumber: data.phoneNumber, countryShortName: data.countryShortName || 'GH' },
            {
                onSuccess: () => {
                    router.push('/user-accounts/forgot-password?step=verify-otp');
                },
            }
        );
    };

    const handleResendOtp = () => {
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
                router.push('/user-accounts/forgot-password?step=reset-password');
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
        <div className='w-full py-[4rem] flex flex-col items-center min-h-[70dvh]'>
            <section className="p-6 flex flex-col items-center gap-5 w-[550px] min-h-[300px] shadow rounded px-[4rem] text-center">
                <div className="w-full">
                    {
                        step !== 'get-otp' ? <button className="flex items-center text-sm gap-2 text-gray-600 self-start" onClick={() => router.back()}>
                            <ArrowLeft className='size-4'/>
                            <span>Go Back</span>
                        </button> : null
                    }
                </div>

                {
                    step === 'get-otp' ? <span className="w-full flex flex-col items-center gap-1">
                        <h1 className='font-semibold text-[2rem] leading-[3.5rem]'>Forgot Password</h1>
                        <span>Enter the phone number associated with your Bisame account.</span>
                    </span> :
                    step === 'verify-otp' ? <span className='flex flex-col items-center gap-1'>
                        <h1 className='font-semibold text-[2rem] leading-[3.5rem]'>Verify OTP</h1>
                        <span>Enter the 6-digit code we sent to your phone to verify your account.</span>
                    </span> : <span className='flex flex-col items-center gap-1'>
                        <h1 className='font-semibold text-[2rem] leading-[3.5rem]'>Reset Password</h1>
                        <span>Enter your new password below.</span>
                    </span>
                }

                {
                    step === 'get-otp' ? <>
                        <form className='w-full flex flex-col gap-5 mt-3' onSubmit={form.handleSubmit(getOtp)}>
                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor="phoneNumber" className='font-medium text-left'>Phone Number</label>
                                <Controller
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <PhoneInput
                                            international
                                            defaultCountry="GH"
                                            onCountryChange={(country) => {
                                                form.setValue('countryShortName', country || 'GH');
                                            }}
                                            id="phoneNumber"
                                            placeholder="Enter phone number"
                                            className='w-full rounded text-sm h-12'
                                            value={field.value || ''}
                                            onChange={(val: string | undefined) => field.onChange(val ?? '')}
                                        />
                                    )}
                                />
                                {form.formState.errors.phoneNumber && (
                                    <span className='text-sm text-red-600'>{form.formState.errors.phoneNumber.message}</span>
                                )}
                            </div>

                            <button
                                type='submit'
                                className='w-full bg-primary text-white h-12 rounded flex items-center justify-center gap-3 font-medium hover:bg-primary/90 transition disabled:opacity-60'
                                disabled={forgotPasswordMutation.isPending}
                            >
                                {forgotPasswordMutation.isPending ? 'SENDING...' : 'SEND CODE'} <ArrowRight />
                            </button>
                        </form>
                    </> :
                    step === 'verify-otp' ? <>
                        <form action="" onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }} className='w-full flex flex-col gap-5 mt-3'>
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
                            <div className="flex justify-center pt-3">
                                <button className='flex items-center gap-2 text-red-600' onClick={handleResendOtp} disabled={resendOtpMutation.isPending}>
                                    {
                                        resendOtpMutation.isPending ? 'Resending...' : 'Resend OTP'
                                    }
                                    {
                                    resendOtpMutation.isPending ? <RefreshCcw className='size-5 animate-spin' /> : null
                                }
                            </button>
                            </div>
                            <br />

                            <Button loading={verifyOtpMutation.isPending} onClick={handleVerifyOtp} className='w-full h-14 text-lg' disabled={otp.length < 6}>Verify Account</Button>
                        </form>
                    </> : <>
                        <form className='w-full flex flex-col gap-5 mt-3' onSubmit={resetForm.handleSubmit(onSubmit)}>
                            <div className="w-full flex flex-col">
                                <label htmlFor="password" className='font-medium text-left'>New Password</label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Enter new password"
                                    className='w-full rounded text-sm h-12'
                                    {...resetForm.register('password')}
                                />
                                {resetForm.formState.errors.password && (
                                    <span className='text-sm text-red-600'>{resetForm.formState.errors.password.message}</span>
                                )}

                            </div>
                            <div className="w-full flex flex-col mb-3">
                                <label htmlFor="confirmPassword" className='font-medium text-left'>Confirm New Password</label>
                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm new password"
                                    className='w-full rounded text-sm h-12'
                                    {...resetForm.register('confirmPassword')}
                                />
                                {resetForm.formState.errors.confirmPassword && (
                                    <span className='text-sm text-red-600'>{resetForm.formState.errors.confirmPassword.message}</span>
                                )}
                            </div>


                            <Button
                                type='submit'
                                className='w-full bg-primary text-white h-12 rounded flex items-center justify-center gap-3 font-medium hover:bg-primary/90 transition disabled:opacity-60'
                                loading={resetPasswordMutation.isPending}
                            >
                                {resetForm.formState.isSubmitting ? 'SAVING...' : 'SAVE CHANGES'}
                            </Button>
                        </form>
                    </>
                }

                <div className="w-full flex flex-col items-center">
                    <span>Already have an account? <span className="text-sky-700"><Link href="/user-accounts/sign-in">Sign In</Link></span></span>
                    <span>Don't have an account? <span className="text-sky-700"><Link href="/user-accounts/sign-up">Sign Up</Link></span></span>
                </div>

                <span>You may contact <span className="text-primary"><Link href="/support">Customer Service</Link></span> for help restoring access to your account.</span>
            </section>
        </div>
    )
}

export default ForgotPassword