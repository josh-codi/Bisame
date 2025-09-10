'use client';

import React from 'react'

function Footer() {
    return (
        <footer className='w-full py-6 flex flex-col items-center bg-black text-white'>
            <div className="2xl:w-[1500px] flex flex-col items-center px-10 py-[3rem]">
                <section className="w-full grid grid-cols-4 gap-10">
                    <div className="flex flex-col gap-5 w-full">
                        <span><h1 className="text-3xl font-bold">Bisame</h1></span>
                        <div className="flex flex-col gap-1">
                            <span className="flex flex-col">
                                <p>Customer Supports:</p>
                                <b>+233 54 289 3124</b>
                            </span>
                            <p>Koree Mari Link</p>
                            <p>Achimota, Greater Accra</p>
                            <p>bisamecustomercare@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-full">
                        <span><h1 className="text-xl font-bold">QUICK LINKS</h1></span>
                        <div className="flex flex-col gap-2">
                            <a href="#">Wishlist</a>
                            <a href="#">Customer Support</a>
                            <a href="#">About Us</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Use</a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-full">
                        <span><h1 className="text-xl font-bold">DOWNLOAD APP</h1></span>
                        <div className="flex flex-col gap-2">
                            <aside className="rounded-lg p-5 bg-slate-800 flex items-center gap-4">
                                <i className="fab fa-google-play text-2xl"></i>
                                <div className="flex flex-col">
                                    <p className="text-sm">Get it Now</p>
                                    <b className="text-lg font-bold">Google Play</b>
                                </div>
                            </aside>
                            <aside className="rounded-lg p-5 bg-slate-800 flex items-center gap-4">
                                <i className="fab fa-apple text-2xl"></i>
                                <div className="flex flex-col">
                                    <p className="text-sm">Get it Now</p>
                                    <b className="text-lg font-bold">App Store</b>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-full">
                        <span><h1 className="text-xl font-bold">POPULAR TAG</h1></span>
                        <span className="flex flex-wrap gap-2">
                            {
                                ['Game', 'iPhone', 'TV', 'Asus Laptops', 'Headphones', 'Speakers', 'Camera', 'Macbook Pro', 'Smart Watches', 'Home Appliances'].map((tag, index) => (
                                    <span key={index} className="px-3 py-1 rounded-lg bg-slate-800 text-sm cursor-pointer hover:bg-slate-300">
                                        {tag}
                                    </span>
                                ))
                            }
                        </span>
                    </div>
                </section>
            </div>
            <section className="w-full py-6 border-t border-gray-600 flex justify-center items-center text-center">
                <span>Bisame online store © {new Date().getFullYear()}</span>
            </section>
        </footer>
    )
}

export default Footer