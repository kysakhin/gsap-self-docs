import Navbar from "~/components/Navbar";

export default function CustRoot({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
