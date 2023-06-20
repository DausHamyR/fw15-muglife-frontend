import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../assets/Logo.png';
import { HiOutlineViewList } from 'react-icons/hi';
import {MdOutlineLogout} from 'react-icons/md'
import {BiChat } from 'react-icons/bi'
import {LuSearch} from 'react-icons/lu'
import http from '@/helpers/http.helper';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '@/redux/reducers/profile';
import User from '@/assets/user.png'
import MenuBar from './MenuBar';
import { useRouter } from 'next/router';

function Header({token}) {
    const profile = useSelector(state => state.profile.data);
    const dispatch = useDispatch()
    const router = useRouter()
    const [search, setSearch] = React.useState('');

    const getProfile = React.useCallback(async()=>{
        try {
            const {data} = await http(token).get("/profile")
            console.log(data.results)
            dispatch(setProfile(data.results))
        } catch (error) {
            const message = error?.response?.data?.message
            return console.log(message)
        }
    },[token])

    React.useEffect(()=>{
        getProfile()
    },[getProfile])

    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };

    return (
        <nav className="fixed bg-white z-10 w-full">
            <div className="w-full h-28 flex items-center justify-between px-11 lg:px-24 xl:px-40 shadow-sm">
                <div className="flex-1 flex items-center justify-start">
                    <Image src={logo} width={100} alt="logo-head" />
                </div>
                <div className="flex-1 hidden lg:flex items-center justify-center gap-2 lg:gap-7">
                    <Link href="/" className="text-base text-secondary hover:font-bold w-20 text-center">
                        Home
                    </Link>
                    {profile.role === "superadmin" ? (<Link href="/admin/product" className="text-base text-secondary hover:font-bold w-20 text-center">
                        Product
                    </Link>) : 
                    (<Link href="/product" className="text-base text-secondary hover:font-bold w-20 text-center">
                        Product
                    </Link>)}
                    <Link href="/cart" className="text-base text-secondary hover:font-bold w-20 text-center">
                        Your Cart
                    </Link>
                    <Link href="/history" className="text-base text-secondary hover:font-bold w-20 text-center">
                        History
                    </Link>
                </div>
                {!token && <div className="flex-1 hidden lg:flex items-center justify-end">
                    <Link href="/auth/login" className="btn btn-ghost rounded-full lg:w-36 text-base text-primary capitalize">
                        Login
                    </Link>
                    <Link href="/auth/register" className="btn btn-accent rounded-full lg:w-36 text-base text-primary capitalize">
                        Sign Up
                    </Link>
                </div>}
                {token && 
                    <div className="flex-1 hidden lg:flex justify-end items-center gap-6">
                        {router.pathname !== "/product" && router.pathname !== "/" && <>
                            {profile?.role === "general" && <Link href="/product" className="flex justify-center items-center">
                                <LuSearch className="text-primary" size={27}/>
                            </Link>} </>}
                        {router.pathname !== "/admin/product" && router.pathname !== "/" && <>
                            {profile?.role === "superadmin" && <Link href="/admin/product" className="flex flex-col justify-center items-center">
                                <LuSearch className="text-primary" size={27}/>
                            </Link>}</>}

                        <button className='text-secondary'><BiChat size={30}/></button>

                        <div className="dropdown dropdown-end">
                            <button tabIndex={0} className="w-16 h-16 overflow-hidden rounded-full">
                                {profile?.picture ? (<Image width={150} height={150} className="object-fit" src={profile.picture} alt="userImage"/>) 
                                    : (<Image className="object-fit" src={User} alt="user"/>) }
                            </button>
                            <ul tabIndex={0} className="dropdown-content flex justify-center items-center menu p-2 pb-4 gap-4 shadow bg-white rounded-box w-60">
                                <span href="/cart" className="font-bold text-base text-secondary hover:font-bold w-full text-center">
                                    {profile?.fullName}
                                </span>
                                <Link href="/user/profile" className="text-base text-secondary hover:font-bold w-20 text-center">
                                    Profile
                                </Link>
                                {token && <button onClick={doLogout} className="flex justify-center gap-3 text-base text-secondary hover:font-bold w-20 text-center w-full">
                                    <MdOutlineLogout size={25}/>
                                    Log out
                                </button>}
                            </ul>
                    </div>
                    {/* <div className="flex flex-col">
                        <p className="font-bold text-secondary">{profile?.fullName || "-"}</p>
                        <p className="font-semibold text-secondary">{profile?.email}</p>
                    </div> */}
                </div>}
                <div className="block lg:hidden dropdown dropdown-end z-10">
                    <label tabIndex={0}>
                        <HiOutlineViewList size={30} className="text-secondary" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-72 bg-white mt-5">
                        <MenuBar token={token}/>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
