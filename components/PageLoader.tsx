export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F0F1A] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        {/* Rotating ring */}
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF00FF] border-r-[#00FFFF] animate-spin"></div>
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-b-[#FF00FF] border-l-[#00FFFF] animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>
        </div>

        {/* Pulsing text */}
        <div className="fixed bottom-5 z-10 text-center text-lg font-semibold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-lg font-semibold animate-pulse">
            Hold on...
          </span>
        </div>
      </div>
    </div>
  );
}
