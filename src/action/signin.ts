"use server";

import { signIn } from "@/app/api/auth/auth";
import { loginSchema } from "@/lib/schema";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function login(data: z.infer<typeof loginSchema>) {
    try {
        const validateFields = loginSchema.safeParse(data);

        if (!validateFields.success) {
            throw new Error(validateFields.error.message);
        }

        const { email, password } = validateFields.data;
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/manage",
        });
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credential!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }
}
