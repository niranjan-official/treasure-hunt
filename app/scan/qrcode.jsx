'use client'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useGlobalContext } from '../context';

const Qrcode = () => {
    const text = "abcdefg";
    const Router = useRouter();
    const { setScan } = useGlobalContext()
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 100,
                height: 100
            },
            fps: 50,
        })
        scanner.render(success, error);

        function success(result) {
            if (result === text) {
                scanner.clear();
                setScan(true);
                Router.push("/question")
            } else {
                alert("Try Again !!!")
            }
        }
        function error(err) {
            console.log("Scanning failed", err);
        }
    }, [])
    return (
        <div>
            <div id='reader' className='flex flex-col gap-2 items-center justify-center font-serif p-4'></div>
        </div>

    )
}

export default Qrcode