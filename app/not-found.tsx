"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Pen, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ErrorImage from "@/assets/images/errorimg.svg"

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0F0F1A] flex items-center justify-center">
      {/* Background elements */}
      <div className="fixed left-0 right-0 top-[calc(100vh-65vh)]">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0F0F1A] opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full bg-[#FF00FF] filter blur-[100px] opacity-20 animate-pulse" />
          <div
            className="absolute top-[40%] right-[10%] w-96 h-96 rounded-full bg-[#00FFFF] filter blur-[120px] opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-[20%] left-[30%] w-80 h-80 rounded-full bg-[#9900FF] filter blur-[150px] opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl w-full">
        {/* 404 Image */}
        <motion.div
          className="w-full max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={ErrorImage}
            alt="404 Error - Page Not Found"
            width={600}
            height={400}
            className="w-full h-auto"
            priority
          />
        </motion.div>

        {/* Message */}
        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-cyan-400">
            Oops! Page not found
          </h1>

          <motion.p
            className="text-lg text-white text-opacity-70 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            The content you're looking for seems to have wandered off. Perhaps
            it's seeking inspiration elsewhere!
          </motion.p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link aria-label="go back" href="/">
            <motion.button
              className="px-8 py-3 bg-white text-[#0F0F1A] rounded-lg font-bold flex items-center space-x-2 shadow-lg group hover:bg-opacity-90 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Go Back</span>
            </motion.button>
          </Link>

          <Link
          aria-label="go to homepage"
          href="/">
            <motion.button
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-bold flex items-center space-x-2 group  hover:bg-opacity-10 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Homepage</span>
            </motion.button>
          </Link>
        </motion.div>

      
      </div>
    </div>
  );
}
