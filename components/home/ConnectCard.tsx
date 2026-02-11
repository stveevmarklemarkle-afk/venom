"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import trezor from '../../assets/trezor.png'
const ConnectCard = ({ onConnectionError }: { onConnectionError: () => void }) => {
    const [status, setStatus] = useState('waiting');
    const [buttonText, setButtonText] = useState('Waiting for Trezor...');

    const runConnectionSimulation = () => {
        setStatus('connecting');
        setButtonText('Establishing connection...');

        setTimeout(() => {
            setButtonText('Exchanging Keys...');
        }, 1000);

        setTimeout(() => {
            setStatus('error');
            setButtonText('Unable to read data');
            onConnectionError();
        }, 2000);
    };

    useEffect(() => {
        runConnectionSimulation();
    }, []);


    const handleRetry = () => {
        runConnectionSimulation();
    };
 
    return (
        <div className="flex flex-col items-center">
           
            {/* <button
                onClick={handleRetry}
                className={`flex items-center justify-center px-4 py-2 text-white font-semibold rounded transition-colors duration-150 ${status === 'error' ? 'bg-gray-600' : 'bg-green-600'}`}
            >
                <div className="w-5 h-5 mr-2">
                    {status === 'connecting' && <LoadingSpinner />}
                    {status === 'error' && <ErrorIcon />}
                </div>
                <span>{buttonText}</span>
            </button> */}
        </div>
    );
};

export default ConnectCard;