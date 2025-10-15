import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    img: "/src/assets/homepage/image4.jpg",
    title: "Working Together for Safer Roads",
    description:
      "Our system bridges the gap between drivers and authorities for clear, fair traffic management.",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
  {
    img: "/src/assets/homepage/trafficlights.jpg",
    title: "Obey Traffic Signals, Save Lives",
    description:
      "Your actions on the road matter — follow the rules, avoid fines, and stay safe.",
    buttonText: "View Traffic Rules",
    buttonLink: "/traffic-rules",
  },
  {
    img: "/src/assets/homepage/traffic.jpeg",
    title: "Building Smarter Roads Together",
    description:
      "Empowering officers and citizens with a digital platform for safer transportation.",
    buttonText: "Get Started",
    buttonLink: "/search",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative w-full h-[90vh] sm:h-[85vh] md:h-[95vh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url(${slides[index].img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Slide content */}
          <div className="relative z-10 flex flex-col items-start justify-center h-full px-4 sm:px-6 md:px-12 max-w-[90%] md:max-w-2xl text-white">
            {/* Title */}
            <motion.h1
              key={slides[index].title}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg tracking-tight"
            >
              {slides[index].title}
            </motion.h1>

            {/* Description */}
            <motion.p
              key={slides[index].description}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl drop-shadow-md leading-relaxed max-w-lg"
            >
              {slides[index].description}
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
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
    </motion.div>
  );
};

export default Hero;
