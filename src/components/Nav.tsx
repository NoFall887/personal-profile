"use client";
import { useRef, useState } from "react";
import NavItem from "./NavItem";
import { motion } from "motion/react";
import GlowBox from "./GlowBox";

const navItem = [
    {
        href: "/",
        text: "Home",
    },

    {
        href: "/projects",
        text: "Projects",
    },
    {
        href: "/contact",
        text: "Contact",
    },
];

export type overlayPositionType = {
    left: number;
    right: number;
};

export type overlayPositionStateType = {
    init: overlayPositionType;
    current: overlayPositionType;
};

const Nav = () => {
    const [overlayPosition, setOverlayPosition] = useState<overlayPositionStateType>({
        init: {
            left: 0,
            right: 100,
        },
        current: {
            left: 0,
            right: 100,
        },
    });

    const navContainer = useRef<HTMLUListElement | null>(null);
    return (
        <nav className="text-white sticky top-3 z-50 lg:relative">
            <GlowBox
                as="ul"
                className="flex mx-auto rounded-2xl max-w-sm px-2 py-1 relative"
                ref={navContainer}
            >
                <motion.div
                    className="w-full h-full bg-white absolute top-0 left-0 text-black flex pointer-events-none px-2 py-1"
                    initial={{ clipPath: `inset(12% 0% 12% 100% round 12px)` }}
                    animate={{
                        clipPath: `inset(12% ${overlayPosition.current.right}% 12% ${overlayPosition.current.left}% round 10px)`,
                    }}
                >
                    {navItem.map((item, idx) => {
                        return (
                            <div
                                key={`${idx}-ovr`}
                                className="flex-1 text-center p-4 block w-full"
                            >
                                {item.text}
                            </div>
                        );
                    })}
                </motion.div>
                {navItem.map((item, idx) => (
                    <NavItem
                        key={idx}
                        data={item}
                        container={navContainer}
                        setPosition={setOverlayPosition}
                    />
                ))}
            </GlowBox>
        </nav>
    );
};

export default Nav;
