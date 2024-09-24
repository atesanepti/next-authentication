import Link from "next/link"
export default function Home() {
  return (
    <div className="bg-black w-[100%] h-screen flex items-center flex-col justify-center">
      <h1 className="text-white text-3xl font-bold ">Hello Dear! </h1>
      <span className="text-white text-2xl font-semibold">What about you?</span>
      <div className="flex gap-2">
        <Link
          className="bg-transparent border border-[#6439FF] text-[#6439FF] rounded-md px-10 py-2 cursor-pointer mt-6 "
          href="/login"
        >
          Login
        </Link>
        <Link
          className="bg-transparent border border-[#1a574f] text-[#1a574f] rounded-md px-10 py-2 cursor-pointer mt-6 "
          href="/signup"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
