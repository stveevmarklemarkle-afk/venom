"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col">

      {/* Mesh Gradient Background */}
      <div className="absolute inset-0">
        {/* Green Left */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/60 blur-[180px] rounded-full" />

        {/* Cyan Top */}
        <div className="absolute top-[-100px] left-[40%] w-[600px] h-[600px] bg-cyan-400/60 blur-[200px] rounded-full" />

        {/* Blue Right */}
        <div className="absolute top-[100px] right-[-150px] w-[650px] h-[650px] bg-blue-600/60 blur-[220px] rounded-full" />

        {/* Bottom Blue */}
        <div className="absolute bottom-[-200px] left-[30%] w-[700px] h-[700px] bg-blue-500/50 blur-[250px] rounded-full" />

        {/* Bottom Green */}
        <div className="absolute bottom-[-150px] left-[-200px] w-[650px] h-[650px] bg-green-500/50 blur-[240px] rounded-full" />
      </div>

      {/* Dark Overlay (to match screenshot) */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-10 py-10">

        {/* Logo */}
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
            Welcome to <br /> Venom Wallet
          </h1>

          <p className="text-gray-300 mt-6 text-lg">
            Create a new wallet or sign in
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-col gap-5 w-full max-w-md">
            <button onClick={() => router.push("/wallet")} className="bg-white text-black font-medium py-4 rounded-xl shadow-md hover:bg-gray-200 transition">
              Create a new wallet
            </button>

            <button onClick={() => router.push("/wallet")} className="border border-gray-500 text-white font-medium py-4 rounded-xl hover:bg-white/10 transition">
              Sign in with seed phrase
            </button>

            <button onClick={() => router.push("/wallet")} className="border border-gray-500 text-white font-medium py-4 rounded-xl hover:bg-white/10 transition">
              Sign in with ledger
            </button>

            <button className="text-gray-300 font-medium mt-2 hover:text-white transition">
              Restore from backup
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
