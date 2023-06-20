import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import User from '@/assets/user.png'
import {MdOutlineLogout} from 'react-icons/md'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

function MenuBar({token}) {
    const profile = useSelector(state => state.profile.data)
    const router = useRouter()
    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };

  return (
    <div className='flex flex-col justify-center items-center gap-3'>
        <div >
            {!token && <div className="flex-1 flex flex-col items-center justify-end">
                <Link href="/auth/login" className="btn btn-ghost rounded-full lg:w-36 text-base text-primary capitalize">
                    Login
                </Link>
                <Link href="/auth/register" className="btn btn-accent rounded-full lg:w-36 text-base text-primary capitalize">
                    Sign Up
                </Link>
            </div>}
            {token && <div className="flex-1 flex flex-col justify-end items-center gap-3">
                <Link href="/user/profile" className="w-16 h-16 overflow-hidden rounded-2xl">
                    {profile?.picture ? (<Image width={150} height={150} className="object-fit" src={profile.picture} alt="userImage"/>) 
                        : (<Image className="object-fit" src={User} alt="user"/>) }
                </Link>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-secondary">{profile?.fullName || "-"}</p>
                    <p className="font-semibold text-secondary">{profile?.email}</p>
                </div>
            </div>}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-2 lg:gap-7 w-full">
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
            {token && <button onClick={doLogout} className="flex justify-center gap-3 text-base text-secondary hover:font-bold w-20 text-center w-full">
                <MdOutlineLogout size={25}/>
                Log out
            </button>}
        </div>
    </div>
  )
}

export default MenuBar