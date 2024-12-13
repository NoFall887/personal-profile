"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { lineProps } from "./Line";
import { AnimatePresence, motion } from "motion/react";

export const generateLine = (
    lineCont: HTMLDivElement,
    lineCount: number
): lineProps[] => {
    const variants: variant[] = ["blue", "green", "red", "yellow"];
    const move = { max: 500, min: 300 };
    const maxScale = 1;
    const maxDelay = 4;
    const containerWidth = lineCont.offsetWidth;
    const containerHeight = lineCont.offsetHeight - 500;

    const lines: lineProps[] = [];

    function calculateOffset(angle: number, distance: number) {
        const radians = (angle * Math.PI) / 180;
        const translateX = Math.cos(radians) * distance;
        const translateY = Math.sin(radians) * distance;

        return { x: translateX, y: translateY };
    }

    for (let i = 0; i < lineCount; i++) {
        const angle = Math.random() * (170 - 10) + 10;

        lines.push({
            color: variants[Math.floor(Math.random() * variants.length)],
            direction: angle,
            start: {
                x: Math.floor(Math.random() * containerWidth),
                y: Math.floor(Math.random() * containerHeight),
            },
            delay: Math.random() * maxDelay,
            duration: 3,
            move: calculateOffset(
                angle,
                Math.floor(Math.random() * (move.max - move.min) + move.min)
            ),
            scale: Math.random() * maxScale,
        });
    }

    return lines;
};
export type variant = "red" | "green" | "blue" | "yellow";
type variantColors = Record<variant, string>;

const Stars = () => {
    type linesState = {
        key: number;
        line: lineProps;
    }[];
    const [linesProps, setLinesProps] = useState<linesState>([]);
    const lineContainer = useRef<HTMLDivElement | null>(null);
    const variantColors: variantColors = {
        red: "from-red-400 via-red-500",
        green: "from-green-400 via-green-500",
        blue: "from-blue-300 via-blue-400",
        yellow: "from-yellow-400 via-yellow-500",
    };
    useEffect(() => {
        setLinesProps((prev) => {
            return generateLine(lineContainer.current!, 1).map((line, idx) => {
                return { key: idx, line };
            });
        });
    }, []);
    return (
        <div ref={lineContainer} className="h-screen w-screen overflow-hidden">
            <p className="text-white">{JSON.stringify(linesProps)}</p>
            <AnimatePresence>
                {linesProps.map((lineprop) => {
                    return (
                        <motion.div
                            key={lineprop.key}
                            style={{
                                left: lineprop.line.start.x,
                                top: lineprop.line.start.y,
                                rotateZ: lineprop.line.direction,
                            }}
                            initial={{
                                scale: 0,
                                opacity: 0,
                            }}
                            animate={{
                                scale: [null, lineprop.line.scale, 0],
                                opacity: [null, 1, 0],
                                x: [null, lineprop.line.move.x],
                                y: [null, lineprop.line.move.y],
                            }}
                            transition={{
                                ease: "linear",
                                duration: lineprop.line.duration,
                                delay: lineprop.line.delay,
                            }}
                            className={`absolute mb-12 h-7 w-28`}
                            onAnimationComplete={() => {
                                const randkey = Math.random();
                                setLinesProps((lines) => {
                                    return lines.map((line, i) => {
                                        return i === line.key
                                            ? {
                                                  key: randkey,
                                                  line: generateLine(
                                                      lineContainer.current!,
                                                      1
                                                  )[0],
                                              }
                                            : line;
                                    });
                                });
                            }}
                        >
                            <div
                                className={`w-5 h-5 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${
                                    variantColors[lineprop.line.color].split(" ")[0]
                                } to-transparent absolute top-1/2 -translate-y-1/2 right-1 blur-sm`}
                            ></div>

                            <div
                                className={`bg-gradient-to-l ${
                                    variantColors[lineprop.line.color]
                                } to-transparent h-2 w-[88%] blur-sm absolute top-1/2 -translate-y-1/2 rounded`}
                            ></div>
                            <div
                                className={`bg-gradient-to-l ${
                                    variantColors[lineprop.line.color]
                                } to-transparent h-1 w-[88%] absolute top-1/2 -translate-y-1/2 rounded`}
                            ></div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default Stars;
