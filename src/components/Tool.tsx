import { toolType } from "@/lib/const";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import styles from "@/css/tools.module.css";
import { cn } from "@/lib/utils";

const prefix = "/tools-icons";

const Tool = async ({ path, desc }: toolType) => {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger className="group">
                    <div
                        className={
                            "w-11 h-11 bg-gradient-to-bl from-slate-300 to-slate-100 rounded-[50%] p-2 flex items-center justify-center relative overflow-hidden"
                        }
                    >
                        <div className="absolute  group-hover:translate-x-40 -left-5 hover:left-14 transition-transform duration-500  skew-x-[-20deg] h-full w-5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                        <img
                            src={prefix + path}
                            alt={"icon " + desc}
                            className="w-full h-full"
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent>{desc}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default Tool;
