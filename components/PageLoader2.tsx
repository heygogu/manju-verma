// import React from "react";
// import { motion } from "framer-motion";

// const PageLoader = () => {
//   return (
//     <>
   
//       <motion.div
//         className="h-[calc(100vh-10vh)] flex z-50 items-center justify-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <motion.div
//           className="flex gap-4"
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 360],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         >
//           {[...Array(3)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]"
//               animate={{
//                 y: ["0%", "-100%", "0%"],
//                 scale: [1, 0.8, 1],
//               }}
//               transition={{
//                 duration: 1,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//                 ease: "easeInOut",
//               }}
//             />
//           ))}
//         </motion.div>
//       </motion.div>
//       <motion.p
//         className=" text-center text-lg font-semibold "
//         animate={{
//           opacity: [0.5, 1, 0.5],
//         }}
//         transition={{
//           duration: 1.5,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       >
//     <span className="bg-clip-text  text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">
//         Hold on...
//     </span>
//       </motion.p>
//     </>
//   );
// };

// export default PageLoader;
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
