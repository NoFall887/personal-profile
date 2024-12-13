"use client";
import { experienceType, formatexpDate } from "@/lib/const";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Markdown from "markdown-to-jsx";
import styles from "@/css/exp.module.css";
import { cn } from "@/lib/utils";

const ExperienceItem = ({
    company,
    dateStart,
    name,
    stack,
    dateStop,
    location,
    description,
}: experienceType) => {
    return (
        <Popover>
            <PopoverTrigger className={cn(styles.expCard, "block w-full text-left ")}>
                <div
                    className={cn(
                        "pl-5 pr-4 py-3 items-center transition-all duration-200 relative"
                    )}
                >
                    <p>
                        <span className="block font-medium leading-tight text-lg">
                            {name}
                        </span>
                        <span className="block text-white/80 text-sm font-medium">
                            {`${company}${location ? ` - ${location}` : ""}`}
                        </span>
                        <span className="block font-light text-sm text-white/80">{`${formatexpDate(
                            dateStart
                        )} - ${dateStop ? `${formatexpDate(dateStop)}` : "Now"}`}</span>
                    </p>
                </div>
            </PopoverTrigger>
            <PopoverContent
                side="right"
                className="bg-gradient-to-tr from-slate-100 to-slate-300 max-w-md w-full"
            >
                <p className="mb-2">
                    <span className="block font-medium leading-tight text-lg">
                        {name}
                    </span>
                    <span className="block  text-sm font-medium">
                        {`${company}${location ? ` - ${location}` : ""}`}
                    </span>
                    <span className="block font-light text-sm ">{`${formatexpDate(
                        dateStart
                    )} - ${dateStop ? `${formatexpDate(dateStop)}` : "Now"}`}</span>
                </p>
                <div className="flex gap-1 flex-wrap mb-3 ">
                    {stack.map((item, idx) => {
                        return <Badge key={idx}>{item}</Badge>;
                    })}
                </div>
                <Markdown className="markdown-list">{description}</Markdown>
            </PopoverContent>
        </Popover>
    );
};

export default ExperienceItem;
