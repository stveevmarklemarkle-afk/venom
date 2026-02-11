"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SaveSeedPhrasePage() {
    const router = useRouter()
    const seedWords = [
        "uniform",
        "detail",
        "spatial",
        "oyster",
        "cram",
        "health",
        "appear",
        "link",
        "resist",
        "excite",
        "media",
        "survey",
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col">

            {/* Mesh Gradient Background */}
            <div className="absolute inset-0">
                {/* Green Left */}
                <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-green-500/60 blur-[200px] rounded-full" />

                {/* Cyan Top */}
                <div className="absolute top-[-150px] left-[40%] w-[650px] h-[650px] bg-cyan-400/60 blur-[230px] rounded-full" />

                {/* Blue Right */}
                <div className="absolute top-[120px] right-[-200px] w-[700px] h-[700px] bg-blue-600/60 blur-[250px] rounded-full" />

                {/* Bottom Blue */}
                <div className="absolute bottom-[-250px] left-[30%] w-[750px] h-[750px] bg-blue-500/50 blur-[280px] rounded-full" />

                {/* Bottom Green */}
                <div className="absolute bottom-[-200px] left-[-250px] w-[700px] h-[700px] bg-green-500/50 blur-[270px] rounded-full" />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="relative z-10 flex flex-col flex-1 px-10 py-10">

                {/* Top Logo */}
                <div className="flex items-center gap-3 text-white">
                    <Image

                        src={"/logo.svg"}
                        alt="logo"
                        width={150}
                        height={60}
                    />
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-1 items-center justify-center text-center">

                    <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
                        Save the seed phrase
                    </h1>

                    {/* Seed Words */}
                    <div className="mt-14 grid grid-cols-2 gap-x-24 gap-y-5 text-gray-200 text-lg">
                        {seedWords.map((word, index) => (
                            <div key={index} className="flex items-center gap-5">
                                <span className="text-gray-400 w-8 text-right">
                                    {index + 1}.
                                </span>
                                <span className="font-medium">{word}</span>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-20 flex flex-col gap-5 w-full max-w-md">
                        <button onClick={() => router.push("/seeds")} className="bg-white text-black font-medium py-4 rounded-xl shadow-md hover:bg-gray-200 transition">
                            I wrote it down on paper
                        </button>

                        <button onClick={() => router.push("/seeds")} className="border border-gray-500 text-white font-medium py-4 rounded-xl hover:bg-white/10 transition">
                            Copy all words
                        </button>

                        <button onClick={() => router.back()} className="text-gray-300 font-medium mt-4 hover:text-white transition">
                            Back
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-gray-400 text-sm mt-auto">
                    © Venom. All rights reserved
                </div>
            </div>
        </div>
    );
}
