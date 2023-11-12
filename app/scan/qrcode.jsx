'use client'
import { Html5QrcodeScanner } from 'html5-qrcode'
import React, { useEffect, useState } from 'react'

const Qrcode = () => {
    const [text, setText] = useState(null)
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 100,
                height: 100
            },
            fps: 5,
        })
        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setText(result)
        }
        function error(err) {
            console.log("Scanning failed", err);
        }
    },[])
    return (
        <div>{text?<h1>{text}</h1>:
            <div id='reader'></div>
        }
        </div>
    )
}

export default Qrcode