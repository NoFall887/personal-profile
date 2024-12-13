"use client";
import { socialType } from "@/lib/const";
import { ReactNode, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import styles from "@/css/social.module.css";
import { FaCheck, FaRegCopy } from "react-icons/fa6";

const SocialItemEmail = ({
    url,
    desc,
    children,
    type,
}: { children: ReactNode } & socialType) => {
    const [copied, setCopied] = useState<boolean>(false);

    async function handleCopy(e: React.MouseEvent) {
        e.preventDefault();
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger
                    onClick={handleCopy}
                    className={cn(styles.socialitem, "social-icon p-2")}
                >
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className="flex gap-3 items-center"
                    onPointerDownOutside={(e) => e.preventDefault()}
                >
                    <p>{desc}</p>
                    {copied ? <FaCheck color="white" /> : <FaRegCopy />}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default SocialItemEmail;
