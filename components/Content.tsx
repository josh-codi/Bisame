'use client';

import React from 'react'

function Content({ className, content }: { className?: string, content: React.ReactNode }) {
    return <section className="w-full flex flex-col items-center xl:px-0 px-5">
        <div className={`w-full xl:w-[1100px] 2xl:w-[1500px] ${className}`}>
            {content}
        </div>
    </section>
}

export default Content