'use client';

import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneInput } from '@/components/ui/phoneInput';
import * as RPNInput from "react-phone-number-input";
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import useAuthQueries from '@/hooks/Queries/useAuthQueries';
import {toast} from 'react-hot-toast'
import { on } from 'events';
import { Button } from '@/components/ui/button';
import useMain from '@/hooks/useMain';

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    countryShortName: z.string().optional(),
    countryName: z.string().optional(),
    countryCode: z.string().optional(),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^\+?[1-9]\d{6,14}$/, 'Invalid phone number'),
    email: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    heardFrom: z
      .enum([
        'facebook',
        'instagram',
        'twitter',
        'linkedin',
        'tiktok',
        'whatsapp',
        'youtube',
        'snapchat',
        'pinterest',
        'friend',
        'search_engine',
        'other',
      ])
      .optional(),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

function SignUp() {
  const { signupMutation } = useAuthQueries();
  const {router} = useMain();
  const [showPassword, setShowPassword] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      heardFrom: undefined,
      referralCode: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = (data: SignUpFormValues) => {
    if (!termsAccepted) {
      toast.error('You must accept the terms and conditions to proceed.');
      return;
    }

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      otherNames: '',
      phoneNumber: data.phoneNumber,
      countryShortName: data.countryShortName || 'GH',
      password: data.password,
      referralType: data.heardFrom ?? null,
      countryCode: data.countryCode ? data.countryCode : '+233',
      countryName: data.countryName ? data.countryName : 'Ghana',
      referralCode: data.referralCode ? data.referralCode : null,
      email: data.email ?? null,
    };



    signupMutation.mutate(payload, {
      onSuccess: (res) => {
        toast.success('Signup successful! Please check your phone for OTP verification.');
        form.reset();
        router.push('/user-accounts/verification?from=sign-up');
      },
      onError: (err: any) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('An error occurred during signup. Please try again.');
        }
      },
    })
  }

  return (
    <div className='main-content w-full flex flex-col gap-5'>

      <span className="w-full flex flex-col items-center gap-1">
        <h1 className="font-extrabold text-[3rem] leading-[3.5rem] text-primary">Let's Get Started!</h1>
        <div className="border-3 border-primary w-[25%]" />
        <span>Join <span className="text-sky-800">50K+</span> user on <span className="text-sky-800"><a href="#">Bisame</a></span></span>
      </span>

      <br />
      <form className='w-full flex flex-col items-center gap-5' onSubmit={form.handleSubmit(onSubmit)}>

        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='firstName' className='font-medium'>First name</label>
          <input
            id='firstName'
            placeholder='First name'
            className='w-full rounded text-sm h-12 px-3 border'
            {...form.register('firstName')}
          />
          {form.formState.errors.firstName && (
            <span className='text-sm text-red-600'>{form.formState.errors.firstName.message}</span>
          )}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='lastName' className='font-medium'>Last name</label>
          <input
            id='lastName'
            placeholder='Last name'
            className='w-full rounded text-sm h-12 px-3 border'
            {...form.register('lastName')}
          />
          {form.formState.errors.lastName && (
            <span className='text-sm text-red-600'>{form.formState.errors.lastName.message}</span>
          )}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='phoneNumber' className='font-medium'>Phone Number</label>
          <PhoneInput
            defaultCountry="GH"
            onCountryChange={(country) => {
              console.log(country);
              form.setValue('phoneNumber', '', { shouldValidate: false });
              form.setValue('countryShortName', country, { shouldValidate: false });
              form.setValue('countryCode', `+${RPNInput.getCountryCallingCode(country||'GH')}`, { shouldValidate: false });
              form.setValue('countryName', country ? new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || '' : 'Ghana', { shouldValidate: false }); 
            }}
            value={form.watch('phoneNumber')}
            onChange={(val) => {
              console.log(val);
              form.setValue('phoneNumber', val, { shouldValidate: true });
            }}
            className="w-full rounded text-sm h-12"
          />
          {form.formState.errors.phoneNumber && (
            <span className='text-sm text-red-600'>{form.formState.errors.phoneNumber.message}</span>
          )}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='email' className='font-medium'>Email Address (optional)</label>
          <input
            id='email'
            placeholder='you@example.com'
            className='w-full rounded text-sm h-12 px-3 border'
            {...form.register('email')}
            required={false}
          />
          {form.formState.errors.email && (
            <span className='text-sm text-red-600'>{form.formState.errors.email.message}</span>
          )}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='password' className='font-medium'>Password</label>
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

        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='confirmPassword' className='font-medium'>Confirm Password</label>
          <div className="w-full h-12 border rounded-lg px-3 flex items-center gap-2">
            <input
              type={showPassword ? 'text' : 'password'}
              id='confirmPassword'
              placeholder='Confirm password'
              className='w-full border-none rounded px-3 h-full outline-none'
              {...form.register('confirmPassword')}
            />
          </div>
          {form.formState.errors.confirmPassword && (
            <span className='text-sm text-red-600'>{form.formState.errors.confirmPassword.message}</span>
          )}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='heardFrom' className='font-medium'>How did you hear about us?</label>
          <select
            id='heardFrom'
            className='w-full h-12 border rounded px-3'
            {...form.register('heardFrom')}
            defaultValue={''}
          >
            <option value=''>Select an option</option>
            <option value='facebook'>Facebook</option>
            <option value='instagram'>Instagram</option>
            <option value='twitter'>Twitter / X</option>
            <option value='linkedin'>LinkedIn</option>
            <option value='tiktok'>TikTok</option>
            <option value='whatsapp'>WhatsApp</option>
            <option value='youtube'>YouTube</option>
            <option value='snapchat'>Snapchat</option>
            <option value='pinterest'>Pinterest</option>
            <option value='friend'>Friend</option>
            <option value='search_engine'>Search engine</option>
            <option value='other'>Other</option>
          </select>
          {form.formState.errors.heardFrom && (
            <span className='text-sm text-red-600 text-wrap truncate'>{form.formState.errors.heardFrom.message}</span>
          )}
        </div>

        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='referralCode' className='font-medium'>Referral Code (optional)</label>
          <input
            id='referralCode'
            placeholder='Referral code'
            className='w-full rounded text-sm h-12 px-3 border'
            {...form.register('referralCode')}
          />
          {form.formState.errors.referralCode && (
            <span className='text-sm text-red-600'>{form.formState.errors.referralCode.message}</span>
          )}
        </div>

        <span className="w-full flex items-center gap-2">
          <Checkbox checked={termsAccepted} onCheckedChange={()=>setTermsAccepted(!termsAccepted)} />
          <span>I have read & agree to the <span className="text-sky-800"><a href="#">Terms of Use</a></span> and <span className="text-sky-800"><a href="#">Privacy Policy</a></span></span>
        </span>

        <Button loading={signupMutation.isPending} type='submit' className='w-[250px] bg-primary text-white text-xl font-semibold py-2 rounded hover:bg-primary/90 transition'>
          Sign Up
        </Button>
      </form>

      <span className='text-sm text-gray-600 text-center'>
        Already have an account? <Link href="/user-accounts?tab=sign-in" className='text-primary font-medium'>Sign In</Link>
      </span>
    </div>
  )
}

export default SignUp