import LoadingGif from "../assets/loading.gif";

export default function LoadingPage() {
  return (
    <main className="w-screen h-screen bg-blue-500 text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl text-center text-white">Warming up</h1>
      <img src={LoadingGif} width="175" height="190" />
    </main>
  );
}
