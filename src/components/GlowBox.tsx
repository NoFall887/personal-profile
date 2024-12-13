"use client";
import { cn, throttle } from "@/lib/utils";
import React, { ElementType, ReactNode, useCallback, useRef } from "react";

type GlowBoxProps<T extends ElementType = "div"> = {
    as?: T;
    children?: ReactNode;
    tilt?: boolean;
    className?: string;
} & React.ComponentPropsWithRef<T>;

const GlowBox = <T extends ElementType = "div">({
    as,
    children,
    className,
    ref,
    tilt = true,
    ...props
}: GlowBoxProps<T>) => {
    const localRef = useRef<null | HTMLElement>(null);
    const usedRef = ref || localRef;

    const onMouseTilt = useCallback(
        throttle((e: React.MouseEvent) => {
            const cardRect = usedRef!.getBoundingClientRect();
            // Calculate the position of the mouse relative to the card's top-left corner
            const x = e.clientX - cardRect.left; // X coordinate within the card
            const y = e.clientY - cardRect.top; // Y coordinate within the card
            // Find the center of the card
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            // Calculate the rotation angles based on mouse position
            // Multiply by 15 for a stronger tilt effect
            const rotateX = ((y - centerY) / centerY) * 5; // Tilt on the X-axis (up and down)
            const rotateY = ((centerX - x) / centerX) * 5; // Tilt on the Y-axis (left and right)
            usedRef.current!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            usedRef.current!.style.setProperty("--glow-x", `${x}px`);
            usedRef.current!.style.setProperty("--glow-y", `${y}px`);
        }, 100),
        []
    );
    const onMouseUntilt = () => {
        usedRef.current!.style.transform = "rotateX(0) rotateY(0)";
    };
    const Component = as || "div";
    return (
        <Component
            ref={usedRef}
            className={cn(
                " bg-slate-800 relative  shadow-2xl p-[2px] transition-all duration-150 ease-linear group/card",
                className || ""
            )}
            {...props}
            onMouseMove={tilt ? onMouseTilt : undefined}
            onMouseLeave={tilt ? onMouseUntilt : undefined}
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
            <div className="absolute  rounded-[inherit] bg-white/5 inset-0 -z-40"></div>
            <div className=" bg-inherit rounded-[inherit] inset-[2px] absolute -z-20"></div>
            <div
                className="absolute w-full h-full rounded-[inherit] -z-30 top-0 left-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200"
                style={{
                    background:
                        "radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(255, 255, 255, 0.4),transparent 40%)",
                }}
            ></div>
            <div
                className="absolute w-full h-full rounded-[inherit] -z-10 top-0 left-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200"
                style={{
                    background:
                        "radial-gradient(800px circle at var(--glow-x) var(--glow-y), rgba(255, 255, 255, 0.06),transparent 40%)",
                }}
            ></div>
            {children}
        </Component>
    );
};

export default GlowBox;