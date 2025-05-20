import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import "./index.css"; // Tailwind CSS

const transitionWords = ["Innovate", "Create", "Inspire"];

function App() {
  const [showHero, setShowHero] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const fillControls = useAnimation();
  const wordControls = useAnimation();
  const capsuleWrapperControls = useAnimation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fillControls.start({
      width: "100%",
      transition: { duration: 2.5, ease: [0.6, 0.05, 0.22, 1] },
    });

    let index = 0;
    const wordInterval = setInterval(() => {
      wordControls.start({ opacity: 0 }).then(() => {
        setCurrentWordIndex((prev) => {
          const nextIndex = (prev + 1) % transitionWords.length;
          wordControls.start({ opacity: 1 });
          return nextIndex;
        });
      });
      index++;
      if (index === transitionWords.length - 1) {
        clearInterval(wordInterval);
      }
    }, 800);

    setTimeout(() => {
      capsuleWrapperControls
        .start({
          scale: 1.2,
          opacity: 0,
          transition: { duration: 0.8, ease: [0.65, 0, 0.22, 1] },
        })
        .then(() => {
          setShowHero(true);
        });
    }, 3500);

    return () => {
      clearInterval(wordInterval);
    };
  }, [fillControls, wordControls, capsuleWrapperControls]);

  if (!showHero) {
    return (
      <div className="fixed inset-0 bg-[#121212] z-50 flex items-center justify-center">
        <motion.div
          className="relative w-[320px] h-[100px] rounded-full overflow-hidden border border-[#f6f1e9] shadow-[0_0_30px_#ffffff20] bg-[#f6f1e9]/5 backdrop-blur-sm"
          initial={{ scale: 1, opacity: 1 }}
          animate={capsuleWrapperControls}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#f9fbf9] to-[#eae5dd] z-10"
            initial={{ width: 0 }}
            animate={fillControls}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 1 }}
            animate={wordControls}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-black font-extrabold text-[2.5rem] md:text-[3.5rem] tracking-tight leading-none uppercase">
              {transitionWords[currentWordIndex]}
            </h1>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Navbar (outside of zoom animation) */}
      <div className="absolute top-4 right-6 z-50">
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center border border-white/20 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 shadow-md">
          {["Home", "Events", "Team", "Gallery", "About Us"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "")}`}
              className="text-white/80 hover:text-white transition text-sm font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white/10 border border-white/20 rounded-lg shadow-lg backdrop-blur-sm z-40">
              {["Home", "Events", "Team", "Gallery", "About Us"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                  className="block px-4 py-2 text-sm text-white hover:bg-white/20"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hero Section with animation */}
      <motion.div
        className="fixed inset-0 overflow-hidden w-full h-full max-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: 'url("/back.png")',
        }}
        initial={{ scale: 1, backgroundPosition: "center" }}
        animate={{
          scale: 1.1,
          backgroundPosition: "center 40%",
        }}
        transition={{
          duration: 20,
          ease: [0.4, 0, 0.2, 1],
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {/* Transparent noise overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: 'url("/noise.png")',
            backgroundRepeat: "repeat",
            mixBlendMode: "overlay",
            opacity: 0.04,
          }}
        />

        {/* Main content */}
        <h1 className="text-6xl font-bold mb-4 z-20">Welcome to E-Cell</h1>
        <p className="text-lg text-white max-w-xl z-20">
          Igniting Innovation • Empowering Entrepreneurs
        </p>
        <button className="mt-8 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition z-20">
          Explore Now
        </button>
      </motion.div>
    </>
  );
}

export default App;
