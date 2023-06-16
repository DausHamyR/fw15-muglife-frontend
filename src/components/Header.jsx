import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../assets/Logo.png';
import { HiOutlineViewList } from 'react-icons/hi';

function Header() {
    return (
        <nav>
            <div className="w-full h-28 flex items-center justify-between px-11 lg:px-24 xl:px-40 shadow-sm">
                <div>
                    <Image src={logo} width={100} alt="logo-head" />
                </div>
                <div className="hidden md:flex items-center gap-2 lg:gap-7">
                    <Link href="/" className="text-base text-secondary hover:font-bold w-20 text-center">
                        Home
                    </Link>
                    <Link href="/product" className="text-base text-secondary hover:font-bold w-20 text-center">
                        Product
                    </Link>
                    <Link href="/cart" className="text-base text-secondary hover:font-bold w-20 text-center">
                        Your Cart
                    </Link>
                    <Link href="/history" className="text-base text-secondary hover:font-bold w-20 text-center">
                        History
                    </Link>
                </div>
                <div className="hidden md:flex items-center">
                    <Link href="/auth/login" className="btn btn-ghost rounded-full lg:w-36 text-base text-primary capitalize">
                        Login
                    </Link>
                    <Link href="/auth/register" className="btn btn-accent rounded-full lg:w-36 text-base text-primary capitalize">
                        Sign Up
                    </Link>
                </div>
                <div className="block md:hidden dropdown dropdown-end z-10">
                    <label tabIndex={0}>
                        <HiOutlineViewList size={30} className="text-secondary" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-white mt-5">
                        <li className="h-12 text-primary hover:font-semibold">
                            <Link href="/auth/login" className="h-full flex items-center justify-start text-primary">
                                Login
                            </Link>
                        </li>
                        <li className="h-12 text-primary hover:font-semibold">
                            <Link href="/auth/register" className="h-full flex items-center justify-start text-primary">
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
