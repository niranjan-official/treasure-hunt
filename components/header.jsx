import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';

const Header = ({ UserName }) => {

    const Router = useRouter();
    const handleLogout = () => {
        console.log("Called");
        const auth = getAuth();
        signOut(auth).then(() => {
            Router.push("/login")
        }).catch((error) => {
            alert("Logging out failed !!!, Try Again");
        });
    }
    return (
        <div className='w-full p-2 flex justify-between items-center pt-3 pb-3 shadow fixed z-50'>
            <h1 className='text-2xl text-orange-950 font-semibold font-serif '>Treasure-Hunt</h1>
            <div className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-950">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                <select name="" id="" defaultValue={UserName} onChange={handleLogout} className='bg-transparent text-orange-950'>
                    <option disabled>{UserName}</option>
                    <option value="Logout">Logout</option>
                </select>
            </div>
        </div>
    )
}

export default Header