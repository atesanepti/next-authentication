import Link from "next/link"
export default function Home() {
  return (
    <div className="bg-black w-[100%] h-screen flex items-center flex-col justify-center">
      <h1 className="text-white text-3xl font-bold ">Hello Dear! </h1>
      <span className="text-white text-2xl font-semibold">What about you?</span>
      <Link className="bg-white text-black rounded-md px-4 py-2 cursor-pointer" href="/login">Go to the Login Page</Link>
    </div>
  );
}
