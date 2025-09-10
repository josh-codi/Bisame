'use client';

import React from 'react'
import Content from './Content';
import { Button } from './ui/button';
import { AlertCircle, ChevronDown, CircleAlert, Headphones, Heart, MapPin, MessageCircle, MessageCircleCode, Phone, Search, User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


function Header() {
    return <header className='w-full flex flex-col items-center'>
        <section className="w-full flex justify-center bg-black py-5 text-white">
            <h1 className="text-3xl font-bold">NOTIFICATION BAR</h1>
        </section>
        <section className="w-full flex flex-col bg-blue-800 text-white">
            <Content className='flex items-center justify-between py-5' content={<>
                <b className='text-lg'>Welcome to Bisame online store.</b>
                <span className="flex items-center gap-3">
                    <p>Follow us: </p>
                    <i className="fab fa-x-twitter"></i>
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-tiktok"></i>
                    <i className="fab fa-youtube"></i>
                    <i className="fab fa-instagram"></i>
                </span>
            </>}/>
            <hr className='border-gray-500' />
            <Content className='py-5' content={<>
                <div className="flex items-center justify-between">
                    <h1 className="text-[2rem] lg:text-[3rem] font-bold">BisaMe</h1>
                    <section className="flex gap-3 w-full justify-center text-gray-700">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className='h-12 px-4 gap-3 rounded-xl flex items-center bg-white text-black'>
                                    <MapPin /> <p>All Ghana</p> <ChevronDown className='size-4' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" align="start" sideOffset={8} className='sm:w-[600px] md:w-[700px] xl:w-[800px] 2xl:w-[1000px]'>
                                <div className="w-full flex items-center justif-between">
                                    <div className="w-full">
                                        <span>All Ghana <span className='size-2 bg-primary'/> <span className="text-primary">0 Ads</span></span>
                                    </div>
                                    <div className="w-[300px] border rounded-xl px-4 h-14 flex items-center gap-2">
                                        <Search className='size-4 text-gray-500'/>
                                        <input type="text" placeholder='Find by Region, city or distance...' className="w-full h-full outline-none border-none text-sm" />
                                    </div>
                                </div>
                                <br />
                                <div className="w-full border rounded-2xl p-10 flex flex-col items-center justify-center gap-3">
                                    <Search className='size-14 text-gray-500'/>
                                    <h1 className="text-2xl font-bold text-gray-600">No Locations found</h1>
                                    <span className="text-center text-gray-400">Try adjusting your search terms.</span>
\                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="w-[300px] xl:w-[400px] flex px-4 bg-white rounded-xl items-center gap-2 h-12">
                            <input type="text" placeholder='I am looking for...' className="w-full h-full outline-none border-none text-sm" />
                            <Search/>
                        </div>
                    </section>
                    <div className="flex items-center gap-3">
                        <Button className='h-10 px-6'>SELL</Button>
                        <button>
                            <Heart />
                        </button>
                        <button>
                            <User />
                        </button>
                    </div>
                </div>
            </>} />
        </section>
        <Content className='h-[100px] flex items-center justify-between' content={<>
            <div className="flex items-center gap-3">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className='h-12 px-4 gap-3 rounded-xl flex items-center bg-white text-black'>
                            <p>Services</p> <ChevronDown className='size-4' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='mt-5 w-[350px]'>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className='h-12 px-4 gap-3 rounded-xl flex items-center bg-white text-black'>
                            <p>Buy / Sell</p> <ChevronDown className='size-4' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='mt-5 w-[350px]'>
                    </PopoverContent>
                </Popover>
                <span className="flex items-center gap-3 btn">
                    <Headphones/>
                    <p>Customer Support</p>
                </span>
                <span className="flex items-center gap-3 btn">
                    <CircleAlert/>
                    <p>Need Help</p>
                </span>
            </div>
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                    <Phone/>
                    <b>+233 54 289 3124</b>
                </span>
                <button className="size-16 border rounded-xl relative flex items-center justify-center">
                    <div className="absolute -top-3 -right-3 flex items-center justify-center">
                        <div className='size-6 bg-red-500 animate-ping absolute rounded-full'/>
                        <div className="size-6 rounded-full bg-red-500 flex items-center justify-center text-white">
                            <span className="text-[0.9rem]">3</span>
                        </div>
                    </div>
                    <MessageCircleCode className='size-6'/>
                </button>
            </div>
        </>}/>
            <hr className='w-full border-gray-200'/>
    </header>
}

export default Header