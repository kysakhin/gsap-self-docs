import Navbar from "~/components/Navbar";

export default function CustomLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
