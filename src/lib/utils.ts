import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function throttle<T extends (...args: any[]) => any>(func: T, delay: number) {
    let lastCall = 0;

    return (...args: Parameters<T>) => {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}
