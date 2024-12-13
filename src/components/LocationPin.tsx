"use client";

import { motion } from "motion/react";
import React from "react";

const LocationPin = () => {
    return (
        <div className="flex justify-center mb-3 relative">
            <motion.div
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                }}
                animate={{
                    y: [0, -12, 0],
                }}
                className="relative z-10"
            >
                <svg
                    version="1.1"
                    id="_x32_"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12"
                    viewBox="0 0 512 512"
                    style={{ filter: "drop-shadow(3px 2px 10px rgba(0, 0, 0, 0.25))" }}
                >
                    <defs>
                        <linearGradient
                            id="gradient1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="white" />
                            <stop offset="50%" stopColor="#add8e6" /> {/* Light blue */}
                            <stop offset="100%" stopColor="#0000ff" /> {/* Blue */}
                        </linearGradient>
                    </defs>
                    <g>
                        <path
                            fill="url(#gradient1)"
                            filter="url(#shadow)"
                            className="st0"
                            d="M256,0C139.563,0,45.172,94.406,45.172,210.828S210.875,512,256,512c45.109,0,210.828-184.75,210.828-301.172
		S372.438,0,256,0z M256,307.594c-53.453,0-96.766-43.328-96.766-96.766c0-53.453,43.313-96.766,96.766-96.766
		c53.438,0,96.766,43.313,96.766,96.766C352.766,264.266,309.438,307.594,256,307.594z"
                        />
                    </g>
                </svg>
            </motion.div>

            <motion.div
                whileInView={"ripple"}
                transition={{ staggerChildren: 0.3, delayChildren: 3 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0"
            >
                {[...Array(4).keys()].map((num, idx) => {
                    return (
                        <motion.div
                            variants={{
                                ripple: {
                                    opacity: [0, 0.8, 0],
                                },
                            }}
                            transition={{
                                repeat: Infinity,
                                repeatDelay: 2.2,
                            }}
                            key={idx}
                            style={{
                                width: 24 + 16 * num,
                                height: 8 + 8 * num,
                                bottom: -4 + -4 * num,
                            }}
                            className="rounded-[50%] absolute -bottom-1 left-1/2 -translate-x-1/2 border-2 border-white opacity-0"
                        ></motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default LocationPin;
