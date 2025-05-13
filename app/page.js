import Image from "next/image";
import Navbar from "~/components/Navbar";
import Landing from "~/components/Landing";

export default function Home() {
  return (
    <div className="min-h-screen w-screen">
      {/* Navbar */}
      <Navbar />
      {/* Landing */}
      <Landing />
      {/* Search functionality? */}
      {/* Categories and Links */}
    </div>
  );
}
