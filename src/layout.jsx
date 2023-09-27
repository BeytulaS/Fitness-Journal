import Navbar from "./shared/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-w-screen min-h-[calc(100vh-40px)] bg-[#f5fdff]">
        {children}
      </main>
    </>
  );
}
