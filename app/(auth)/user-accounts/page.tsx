'use client';

import useMain from '@/hooks/useMain';
import React from 'react'
import SignIn from './Includes/SignIn';
import SignUp from './Includes/SignUp';

function UserAccounts() {
    const { router, searchParams } = useMain();
    const tab = searchParams.get('tab') as 'sign-in'|'sign-up' || 'sign-in';

    return (
        <div className='w-full py-[4rem] flex flex-col items-center min-h-[70dvh]'>
            <section className="p-6 flex flex-col items-center gap-5 w-[550px] min-h-[300px] shadow rounded px-[4rem]">
                <div className="w-full border-b grid grid-cols-2 text-lg">
                    <button className={`w-full flex justify-center h-12 items-center ${tab === 'sign-in' ? 'border-b-2 text-primary border-primary font-semibold' : ''}`} onClick={() => router.replace('/user-accounts?tab=sign-in')}>
                        Sign In
                    </button>
                    <button className={`w-full flex justify-center h-12 items-center ${tab === 'sign-up' ? 'border-b-2 text-primary border-primary font-semibold' : ''}`} onClick={() => router.replace('/user-accounts?tab=sign-up')}>
                        Sign Up
                    </button>
                </div>
                <br />
                {
                    tab === 'sign-in' ? <SignIn /> : 
                    tab === 'sign-up' ? <SignUp/> : null
                }
            </section>
        </div>
    )
}

export default UserAccounts