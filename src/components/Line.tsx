"use client";

import { HTMLMotionProps, motion } from "motion/react";
import React, { forwardRef } from "react";
import { generateLine } from "./Stars";

export type variant = "red" | "green" | "blue" | "yellow";
type variantColors = Record<variant, string>;
export type coordinate = { x: number; y: number };
export type lineProps = {
    start: coordinate;
    direction: number;
    move: coordinate;
    scale: number;
    color: variant;
    delay: number;
    duration: number;
    width?: number;
};

type motionLineProps = HTMLMotionProps<"div"> &
    lineProps & {
        setLinesProps: React.Dispatch<
            React.SetStateAction<{ key: number; line: lineProps }[]>
        >;
        container: HTMLDivElement;
        index: number;
    };

const Line = forwardRef<HTMLDivElement, motionLineProps>(
    (
        {
            container,
            setLinesProps,
            index,
            move,
            scale,
            start,
            color = "blue",
            duration,
            direction,
            delay,
            width = 20,
            className,
            ...props
        },
        ref
    ) => {
        const variantColors: variantColors = {
            red: "from-red-400 via-red-500",
            green: "from-green-400 via-green-500",
            blue: "from-blue-300 via-blue-400",
            yellow: "from-yellow-400 via-yellow-500",
        };
        console.log(index);

        return (
            <motion.div
                key={index}
                ref={ref}
                {...props}
                style={{
                    left: start.x,
                    top: start.y,
                    rotateZ: direction,
                    // transformOrigin: "center left",
                }}
                initial={{
                    scale: 0,
                    opacity: 0,
                }}
                animate={{
                    scale: [null, scale, 0],
                    opacity: [null, 1, 0],
                    x: [null, move.x],
                    y: [null, move.y],
                }}
                transition={{ ease: "linear", duration: duration, delay: delay }}
                className={`absolute mb-12 h-7 w-28 ${className} `}
                onAnimationComplete={() => {
                    setLinesProps((lines) => {
                        return lines.map((line, i) => {
                            return i === index
                                ? {
                                      key: Math.random(),
                                      line: generateLine(container, 1)[0],
                                  }
                                : line;
                        });
                    });
                }}
            >
                <div
                    className={`w-5 h-5 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${
                        variantColors[color].split(" ")[0]
                    } to-transparent absolute top-1/2 -translate-y-1/2 right-1 blur-sm`}
                ></div>

                <div
                    className={`bg-gradient-to-l ${variantColors[color]} to-transparent h-2 w-[88%] blur-sm absolute top-1/2 -translate-y-1/2 rounded`}
                ></div>
                <div
                    className={`bg-gradient-to-l ${variantColors[color]} to-transparent h-1 w-[88%] absolute top-1/2 -translate-y-1/2 rounded`}
                ></div>
            </motion.div>
        );
    }
);
Line.displayName = "Line";
export default Line;
