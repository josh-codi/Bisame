'use client';

import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneInput } from '@/components/ui/phoneInput';
import * as RPNInput from "react-phone-number-input";

import Link from 'next/link';
import useAuthQueries from '@/hooks/Queries/useAuthQueries';
import useMain from '@/hooks/useMain';
import { Button } from '@/components/ui/button';

export const signInSchema = z.object({
    phoneNumber: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^\+?[1-9]\d{6,14}$/, 'Invalid phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    countryShortName: z.string().optional(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

function SignIn() {
    const {router} = useMain();
    const {loginMutation} = useAuthQueries();
    const [showPassword, setShowPassword] = React.useState(false);
    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            phoneNumber: '',
            password: '',
            countryShortName: 'GH',
        },
        mode: 'onTouched',
    });

    const handleSignIn = (data: SignInFormValues) => {
        loginMutation.mutate({
            phoneNumber: data.phoneNumber,
            password: data.password,
            countryShortName: data.countryShortName || 'GH',
        }, {
            onSuccess: (res) => {
                router.push('/user-accounts/verification?from=sign-in');
            }
        });
    }
    return (
        <div className='main-content w-full flex flex-col gap-5'>
            
            <span className="w-full flex flex-col items-center gap-1">
                <h1 className="font-extrabold text-[3rem] leading-[3.5rem] text-primary">Welcome Back!</h1>
                <div className="border-3 border-primary w-[25%]"/>
                <span>Ready to continue your journey on <span className="text-sky-800"><a href="#">Bisame</a></span></span>
            </span>

            <br />
            <form className='w-full flex flex-col items-center gap-5' onSubmit={form.handleSubmit(handleSignIn)}>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor='phoneNumber' className='font-medium'>Phone Number</label>
                    <PhoneInput
                        defaultCountry="GH"
                        onCountryChange={(country) => {
                            form.setValue('countryShortName', country);
                        }}
                        value={form.watch('phoneNumber')}
                        onChange={(val) => form.setValue('phoneNumber', val)}
                        className="w-full rounded text-sm h-12"
                    /> 
                    {form.formState.errors.phoneNumber && (
                        <span className='text-sm text-red-600'>{form.formState.errors.phoneNumber.message}</span>
                    )}
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <div className="w-full flex items-center justify-between">
                        <label htmlFor='password' className='font-medium'>Password</label>
                        <Link href="/user-accounts/forgot-password" className='text-sm text-sky-700 font-medium'>Forgot Password?</Link>
                    </div>
                    <div className="w-full h-12 border rounded-lg px-3 flex items-center gap-2">
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            id='password' 
                            placeholder='Your password' 
                            className='w-full border-none rounded px-3 h-full outline-none'
                            {...form.register('password')}
                        />
                        <span className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <i className="fa fa-eye"></i>
                            ) : (
                                <i className="fa fa-eye-slash"></i>
                            )}
                        </span>
                    </div>
                    {form.formState.errors.password && (
                        <span className='text-sm text-red-600'>{form.formState.errors.password.message}</span>
                    )}
                </div>

                <Button loading={loginMutation.isPending} type='submit' className='w-[250px] bg-primary text-white text-xl font-semibold py-2 rounded hover:bg-primary/90 transition'>
                    Sign In
                </Button>
            </form>

            <span className='text-sm text-gray-600 text-center'>
                Don't have an account? <a href="/user-accounts?tab=sign-up" className='text-primary font-medium'>Sign Up</a>
            </span>
        </div>
    )
}

export default SignIn