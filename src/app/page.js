// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function Home() {
//   const router = useRouter();

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.code === "Space") {
//         event.preventDefault(); // Prevent the default behavior (video pause/stop)
//         router.push("/memory"); // Redirect to the `/memory` URL
//       }
//     };

//     // Add event listener for keydown
//     window.addEventListener("keydown", handleKeyDown);

//     // Cleanup the event listener on unmount
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [router]);

//   return (
//     <div className="w-screen h-screen bg-black">
//       <main className="w-screen h-screen flex items-center justify-center">
//         <iframe
//           src="https://www.youtube.com/embed/JKzpwTs0w1o?autoplay=1"
//           frameBorder="0"
//           allow="autoplay; encrypted-media"
//           allowFullScreen
//           className="w-full h-full"
//         ></iframe>
//       </main>

//       <h1 className="fixed bottom-10 left-1/2 -translate-x-1/2 text-3xl text-white mix-blend-exclusion">
//         To Skip Press SPACE
//       </h1>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import NavBar from "@/components/design/NavBar";
import VideoScroller from "@/components/video/VideoScroller";
import ScoreBox from "@/components/game/ScoreBox";
import GameLogicWrapper from "@/components/game/logic/GameLogicWrapper";
import { GameProvider } from "@/components/game/logic/GameProvider";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isScoreBoxVisible, setScoreBoxVisible] = useState(true);

  return (
    <GameProvider>
      <GameLogicWrapper>
        {showSplash && (
          <div className="fixed inset-0 bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] bg-opacity-80 z-50 flex items-center justify-center">
            <div className="bg-[#2c3e50] text-white rounded-lg w-[85%] max-w-[60vw] aspect-video p-6 flex flex-col justify-between shadow-md">
              <iframe
                src="https://www.youtube.com/embed/JKzpwTs0w1o?autoplay=1"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full rounded"
              ></iframe>
              <div className="mt-6">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
                  Welcome
                </h1>
                <p className="text-gray-300 text-center mb-6">
                  Learn the basics or jump right in.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowSplash(false)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={`w-screen h-screen fixed top-0 bg-modern-gray text-modern-charcoal ${
            showSplash ? "pointer-events-none opacity-50" : "pointer-events-auto opacity-100"
          } transition-opacity duration-300`}
        >
          <div className="w-screen h-screen grid grid-cols-6">
            <div className="h-full col-span-1 bg-modern-dark flex flex-col">
              <NavBar />
            </div>
            <div className="h-full col-span-5 bg-modern-light"></div>
          </div>
          <div
            className={`fixed top-4 right-4 z-50 bg-modern-accent transition-all duration-300 rounded-l-full flex items-center ${
              isScoreBoxVisible ? "w-32 h-12" : "w-12 h-12"
            }`}
          >
            <div
              className={`cursor-pointer text-center text-lg font-medium flex items-center justify-center bg-modern-dark text-modern-light hover:bg-modern-charcoal transition-colors ${
                isScoreBoxVisible ? "rounded-l-full h-full w-6" : "rounded-full h-8 w-8"
              }`}
              onClick={() => setScoreBoxVisible(!isScoreBoxVisible)}
            >
              {isScoreBoxVisible ? ">" : "<"}
            </div>
            {isScoreBoxVisible && (
              <div className="flex-grow text-modern-dark">
                <ScoreBox />
              </div>
            )}
          </div>
        </div>
        <main className="w-screen h-screen">
          <div className="w-screen h-screen grid grid-cols-6">
            <div className="h-full col-span-1 bg-modern-dark"></div>
            <div className="h-full col-span-5 bg-modern-light flex flex-col">
              <div className="flex-grow bg-modern-light overflow-hidden">
                <VideoScroller />
              </div>
            </div>
          </div>
        </main>
      </GameLogicWrapper>
    </GameProvider>
  );
}
