'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { set } from 'react-hook-form';

function useMain() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();
    const params = useParams();
    const [loading, setLoading] = useState('')

    return {
        searchParams,
        router,
        path,
        params,
        loading,
        setLoading: (loading?: string) => setLoading(loading || ''),
    }
}

export default useMain