"use client";
import { motion } from "motion/react";

const LocationGreenDots = () => {
    return (
        <motion.div
            animate={{
                opacity: [0.5, 1, 0.5],
                transition: { ease: "easeInOut", duration: 3, repeat: Infinity },
            }}
            className="w-2 h-2 bg-green-500 rounded-full"
        ></motion.div>
    );
};

export default LocationGreenDots;
