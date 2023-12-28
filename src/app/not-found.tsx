import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-indigo-400 text-white flex justify-center items-center font-black z-40 flex-col" >
    <div className="flex flex-col justify-center items-center">
        <h1 className="text-9xl">404</h1>
        <h2 className="text-4xl">Page not found</h2>
        <button className="bg-white text-indigo-400 px-5 py-2 rounded-md mt-5">
          <Link href="/">
            Go back
          </Link>
        </button>
    </div>
  </div>
  )
}