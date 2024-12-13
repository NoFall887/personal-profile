import React, { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { socialType } from "@/lib/const";
import styles from "@/css/social.module.css";
import { cn } from "@/lib/utils";

const SocialItem = ({
    url,
    desc,
    children,
    type,
}: { children: ReactNode } & Omit<socialType, "icon">) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild={true}>
                    <a href={url} className={cn(styles.socialitem, "social-icon p-2")}>
                        {children}
                    </a>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{desc}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default SocialItem;
