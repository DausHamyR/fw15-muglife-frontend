import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../assets/Logo.png';
import { HiOutlineViewList } from 'react-icons/hi';
import http from '@/helpers/http.helper';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '@/redux/reducers/profile';
import User from '@/assets/user.png';
import MenuBar from './MenuBar';

function Header({ token }) {
    const profile = useSelector((state) => state.profile.data);
    const dispatch = useDispatch();
    const getProfile = React.useCallback(async () => {
        try {
            const { data } = await http(token).get('/profile');
            // console.log(data.results)
            dispatch(setProfile(data.results));
        } catch (error) {
            const message = error?.response?.data?.message;
            return console.log(message);
        }
    }, [token, dispatch]);

    React.useEffect(() => {
        getProfile();
    }, [getProfile]);
    return (
        <nav className="fixed bg-white z-10 w-full">
            <div className="w-full h-28 flex items-center justify-between px-11 lg:px-24 xl:px-40 shadow-sm">
                <div className="flex-1 flex items-center justify-start">
                    <Image src={logo} width={100} alt="logo-head" />
                </div>
                <div className="flex-1 hidden md:flex items-center justify-center gap-2 lg:gap-7">
                    <Link href="/" className="text-base text-secondary hover:font-bold w-20 text-center">
                        Home
                    </Link>
                    {profile.role === 'superadmin' ? (
                        <Link href="/admin/product" className="text-base text-secondary hover:font-bold w-20 text-center">
                            Product
                        </Link>
                    ) : (
                        <Link href="/product" className="text-base text-secondary hover:font-bold w-20 text-center">
                            Product
                        </Link>
                    )}
                    <Link href="/payment-and-delivery" className="text-base text-secondary hover:font-bold w-20 text-center">
                        Your Cart
                    </Link>
                    <Link href="/history" className="text-base text-secondary hover:font-bold w-20 text-center">
                        History
                    </Link>
                </div>
                {!token && (
                    <div className="flex-1 hidden lg:flex items-center justify-end">
                        <Link href="/auth/login" className="btn btn-ghost rounded-full lg:w-36 text-base text-primary capitalize">
                            Login
                        </Link>
                        <Link href="/auth/register" className="btn btn-accent rounded-full lg:w-36 text-base text-primary capitalize">
                            Sign Up
                        </Link>
                    </div>
                )}
                {token && (
                    <div className="flex-1 hidden lg:flex justify-end items-center gap-3">
                        <Link href="/user/profile" className="w-16 h-16 overflow-hidden rounded-2xl">
                            {profile?.picture ? <Image width={150} height={150} className="object-fit" src={profile.picture} alt="userImage" /> : <Image className="object-fit" src={User} alt="user" />}
                        </Link>
                        <div className="flex flex-col">
                            <p className="font-bold text-secondary">{profile?.fullName || '-'}</p>
                            <p className="font-semibold text-secondary">{profile?.email}</p>
                        </div>
                    </div>
                )}
                <div className="block lg:hidden dropdown dropdown-end z-10">
                    <label tabIndex={0}>
                        <HiOutlineViewList size={30} className="text-secondary" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-72 bg-white mt-5">
                        <MenuBar token={token} />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
