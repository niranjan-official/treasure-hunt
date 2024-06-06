import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const Scanner = ({qrData, setIsScannerOn, setScanSuccess}) => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  const onScanSuccess = (result) => {
    console.log(result);
    console.log(qrData);
    if(result.data === qrData){
        console.log("QR DATA MATCHED");
        setIsScannerOn(false);
        setScanSuccess(true);
    }
  };

  const onScanFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
    }
  }, [qrOn]);

  return (
    <div className="w-full aspect-square relative">
      <video className="w-full h-full object-cover" ref={videoEl}></video>
      <div ref={qrBoxEl} className="w-full left-0 border-4 border-white">
        {/* <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        /> */}
      </div>
      <button onClick={()=>setIsScannerOn(false)} className="bg-red-500 text-white font-semibold px-3 py-1 absolute bottom-0 left-[40%]" >Stop</button>
    </div>
  );
};

export default Scanner;
