"use client";

import { useEffect, useRef } from "react";
import GlowBox from "./GlowBox";

const Sprite = () => {
    const ball = useRef<null | HTMLDivElement>(null);
    const ballContainer = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        let x =
            Math.random() *
            (ballContainer.current!.offsetWidth - ball.current!.offsetWidth);
        let y =
            Math.random() *
            (ballContainer.current!.offsetHeight - ball.current!.offsetHeight);

        let dx = (Math.random() < 0.5 ? -1 : 1) * (1 + Math.random());
        let dy = (Math.random() < 0.5 ? -1 : 1) * (1 + Math.random());

        const gradients = [
            "linear-gradient(to right, #ff7e5f, #feb47b)",
            "linear-gradient(to right, #6a11cb, #2575fc)",
            "linear-gradient(to right, #43cea2, #185a9d)",
            "linear-gradient(to right, #f7971e, #ffd200)",
            "linear-gradient(to right, #00c6ff, #0072ff)",
        ];

        const getRandomGradient = () => {
            return gradients[Math.floor(Math.random() * gradients.length)];
        };

        const updateBallPosition = () => {
            x += dx;
            y += dy;

            if (
                x <= 0 ||
                x + ball.current!.offsetWidth >= ballContainer.current!.offsetWidth
            ) {
                dx = -dx;
                ball.current!.style.background = getRandomGradient();
            }

            if (
                y <= 0 ||
                y + ball.current!.offsetHeight >= ballContainer.current!.offsetHeight
            ) {
                dy = -dy;
                ball.current!.style.background = getRandomGradient();
            }

            ball.current!.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(updateBallPosition);
        };
        updateBallPosition();
    }, []);
    return (
        <GlowBox as={"div"} className="item rounded-xl relative" ref={ballContainer}>
            <div className="absolute rounded-[50%] w-10 h-10 bg-red-500" ref={ball}></div>
        </GlowBox>
    );
};

export default Sprite;
