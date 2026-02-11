import Image from "next/image";
import TrezorLogo from "../TrezorLogo";

const LeftPanel = () => {
    return (
        <div className="w-full lg:w-2/5 h-auto lg:h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
           <Image
          
                                  src={"/logo.svg"}
                                  alt="logo"
                                  width={150}
                                  height={60}
                              />

            <h1 className="text-5xl font-bold text-gray-800 mt-8">Welcome!</h1>
        </div>
    );
};

export default LeftPanel;