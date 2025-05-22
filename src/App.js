import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./index.css"; // Tailwind CSS

const transitionWords = ["Innovate", "Create", "Inspire"];
const heroTrail = ["Welcome", "to", "E-CELL"];

function App() {
  const [showHero, setShowHero] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const fillControls = useAnimation();
  const wordControls = useAnimation();
  const capsuleWrapperControls = useAnimation();
  const backgroundControls = useAnimation();
  const heroControls = useAnimation();
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
          backgroundControls.start({
            scale: 1.1,
            transition: { duration: 6, ease: "easeInOut" },
          });
          heroControls.start({
            opacity: 1,
            scale: 1,
            transition: { duration: 1.2, ease: "easeInOut" },
          });
        });
    }, 3500);

    return () => {
      clearInterval(wordInterval);
    };
  }, [fillControls, wordControls, capsuleWrapperControls, backgroundControls, heroControls]);

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
    <div className="w-screen h-screen overflow-hidden relative">
      {/* College logo in top-left */}
      <div className="absolute top-4 left-6 z-50 flex flex-col items-center">
  <img
    src={`${process.env.PUBLIC_URL}/college.png`}
    alt="College Logo"
    className="w-10 h-10 object-contain mb-1"
  />
  <span className="text-white text-sm font-semibold tracking-wide">BMSIT&M</span>
</div>


      {/* Navigation */}
      <div className="absolute top-4 right-6 z-50">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
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

      {/* Background with floating shape */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/back.png"})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="absolute w-40 h-40 bg-white/10 rounded-full blur-3xl top-1/3 left-1/4"
          animate={{ x: [0, 20, -20, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.65, 0, 0.22, 1], delay: 0.2 }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4"
      >
        {/* Centered E-CELL logo + text */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={`${process.env.PUBLIC_URL}/ecell.png`}
            alt="E-Cell Logo"
            className="w-14 h-13 md:w-20 md:h-20 mb-2"
          />
          <span className="text-2xl md:text-3xl font-bold tracking-wide">E-CELL</span>
        </div>

        {/* Glassmorphism pill behind text */}
        <div className="absolute w-96 h-32 bg-white/10 backdrop-blur-xl rounded-full z-0 blur-2xl opacity-30" />

        {/* Word-by-word animated heading */}
        <h1 className="font-poppins text-2xl md:text-4xl font-extrabold drop-shadow-xl space-x-2 z-10">

          {heroTrail.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mx-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <p className="font-poppins text-xl md:text-2xl mt-1 drop-shadow-md z-10 text-slate-300">

        Dream Big. Start Small. Move Fast
        </p>
      </motion.div>
    </div>
  );
}

export default App;

