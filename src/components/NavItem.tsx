import Link from "next/link";
import { overlayPositionStateType } from "./Nav";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const NavItem = ({
    data,
    setPosition,
    container,
}: {
    data: { href: string; text: string };
    setPosition: React.Dispatch<React.SetStateAction<overlayPositionStateType>>;
    container: React.MutableRefObject<HTMLUListElement | null>;
}) => {
    const navItem = useRef<HTMLLIElement | null>(null);
    const pathName = usePathname();

    const calculateOverlay = () => {
        const containerRect = container.current!.getBoundingClientRect();
        const itemRect = navItem.current!.getBoundingClientRect();

        const leftPercent =
            ((itemRect.left - containerRect.left) / containerRect.width) * 100;
        const rightPercent =
            ((containerRect.right - itemRect.right) / containerRect.width) * 100;
        return { left: leftPercent, right: rightPercent };
    };

    const handleHover = () => {
        setPosition((prev) => {
            return { ...prev, current: calculateOverlay() };
        });
    };

    const handleHoverOut = () => {
        setPosition((prev) => {
            return {
                ...prev,
                current: prev.init,
            };
        });
    };
    const setInit = () => {
        setPosition((prev) => {
            return { ...prev, init: calculateOverlay() };
        });
    };

    useEffect(() => {
        if (pathName === data.href) {
            const overlayPost = calculateOverlay();
            setPosition({ init: overlayPost, current: overlayPost });
        }
    }, []);
    return (
        <li
            className="flex-1 text-center"
            ref={navItem}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
        >
            <Link className="p-4 block w-full" href={data.href} onClick={setInit}>
                {data.text}
            </Link>
        </li>
    );
};

export default NavItem;
