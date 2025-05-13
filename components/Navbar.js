import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center space-x-4 p-4 bg-gray-800 text-white w-screen">
      <Link href="/" className="font-semibold">
        Home
      </Link>
      <Link href="/links" className="font-semibold">
        Links
      </Link>
    </nav>
  );
}
