"use client";
import { motion, steps } from "motion/react";

const neonContainerVariant = {
    hidden: {
        top: "100%",
        opacity: 0,
    },
    visible: {
        transition: {
            duration: 1,
        },
        top: "33.33333%",
        opacity: 1,
    },
};

const textShadow =
    "0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #30a2ff, 0 0 30px #023a69, 0 0 40px #023a69, 0 0 50px #023a69, 0 0 80px #023a69";
const name = "Naufal";

const HeadingContent = () => {
    return (
        <div className="w-screen h-screen absolute top-0 left-0 overflow-hidden z-[0]">
            <motion.div
                variants={neonContainerVariant}
                initial="hidden"
                whileInView="visible"
                className="flex justify-center absolute -translate-y-1/2 mx-auto left-1/2 -translate-x-1/2 text-white"
            >
                <h1>
                    <div className="text-4xl font-light ml-1 mb-2">Hi, I&apos;ts me</div>
                    <div className="text-[108px] font-medium leading-none relative text-stroke-white">
                        {name.split("").map((font, id) => {
                            const delay = Math.random() * (5 - 2 + 1) + 2;
                            const repeatDelay = Math.random() * (8 - 3 + 1) + 3;
                            return (
                                <span className="inline-block relative" key={id}>
                                    <motion.span
                                        transition={{
                                            delay: delay,
                                            repeatDelay: repeatDelay,
                                            type: "tween",
                                            ease: steps(1),
                                            times: [
                                                0, 0.18, 0.2, 0.22, 0.24, 0.25, 0.53,
                                                0.55, 0.57, 1, 1,
                                            ],
                                            duration: 1.5,
                                            repeat: Infinity,
                                        }}
                                        animate={{
                                            color: [
                                                "rgba(255,255,255,1)",
                                                "rgba(0,0,0,1)",
                                                "rgba(255,255,255,1)",
                                                "rgba(0,0,0,1)",
                                                "rgba(255,255,255,1)",
                                                "rgba(0,0,0,1)",
                                                "rgba(0,0,0,1)",
                                                "rgba(255,255,255,1)",
                                                "rgba(0,0,0,1)",
                                                "rgba(255,255,255,1)",
                                                "rgba(255,255,255,1)",
                                            ],
                                        }}
                                        className="text-white inset-0 z-10 absolute"
                                    >
                                        {font}
                                    </motion.span>
                                    <motion.span
                                        animate={{
                                            textShadow: [
                                                textShadow,
                                                "none",
                                                textShadow,
                                                "none",
                                                textShadow,
                                                "none",
                                                "none",
                                                textShadow,
                                                "none",
                                                textShadow,
                                                textShadow,
                                            ],
                                        }}
                                        transition={{
                                            delay: delay,
                                            repeatDelay: repeatDelay,
                                            type: "tween",
                                            ease: steps(1),
                                            times: [
                                                0, 0.18, 0.2, 0.22, 0.24, 0.25, 0.53,
                                                0.55, 0.57, 1, 1,
                                            ],
                                            duration: 1.5,
                                            repeat: Infinity,
                                        }}
                                        className="mr-3"
                                    >
                                        {font}
                                    </motion.span>
                                </span>
                            );
                        })}
                    </div>
                    <div className="text-3xl font-light ml-1 tracking-wider neon-text">
                        I am a fullstack developer
                    </div>
                </h1>
            </motion.div>
        </div>
    );
};

export default HeadingContent;
