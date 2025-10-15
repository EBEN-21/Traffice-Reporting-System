import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import heropic1 from "../assets/homepage/image4.jpg";
import heropic2 from "../assets/homepage/trafficlights.jpg";
import heropic3 from "../assets/homepage/traffic.jpeg";

const slides = [
  {
    img: heropic1,
    title: "Working Together for Safer Roads",
    description:
      "Our system bridges the gap between drivers and authorities for clear, fair traffic management.",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
  {
    img: heropic2,
    title: "Obey Traffic Signals, Save Lives",
    description:
      "Your actions on the road matter — follow the rules, avoid fines, and stay safe.",
    buttonText: "View Traffic Rules",
    buttonLink: "/traffic-rules",
  },
  {
    img: heropic3,
    title: "Building Smarter Roads Together",
    description:
      "Empowering officers and citizens with a digital platform for safer transportation.",
    buttonText: "Get Started",
    buttonLink: "/search",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      zIndex: 0,
    }),
  };

  return (
    <div className="relative w-full h-[90vh] sm:h-[85vh] md:h-[95vh] overflow-hidden">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 70, damping: 20 },
            opacity: { duration: 0.6 },
          }}
          className="absolute w-full h-full"
          style={{
            backgroundImage: `url(${slides[index].img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Slide content */}
          <div className="relative z-10 flex flex-col items-start justify-center h-full px-4 sm:px-6 md:px-12 max-w-[90%] md:max-w-2xl text-white">
            <motion.h1
              key={slides[index].title}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg tracking-tight"
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              key={slides[index].description}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl drop-shadow-md leading-relaxed max-w-lg"
            >
              {slides[index].description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Link
                to={slides[index].buttonLink}
                className="mt-5 sm:mt-6 inline-block px-5 sm:px-8 py-2 sm:py-3 border border-green-300 text-sm sm:text-base md:text-lg text-white font-medium rounded-lg shadow-md hover:bg-green-800 transition"
              >
                {slides[index].buttonText}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
