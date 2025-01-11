import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/schema";
import { users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    adapter: DrizzleAdapter(db),
    pages: {
        signIn: "/manage/login",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    let user = null;
                    const validateFields = loginSchema.safeParse(credentials);
                    if (!validateFields.success) {
                        throw new Error(validateFields.error.message);
                    }

                    const { email, password } = validateFields.data;

                    // logic to verify if the user exists
                    user = (
                        await db
                            .select({
                                id: users.id,
                                email: users.email,
                                password: users.password,
                            })
                            .from(users)
                            .where(eq(users.email, email))
                            .limit(1)
                    )[0];
                    const passvalid = bcrypt.compareSync(password, user.password!);

                    if (!user || !passvalid) {
                        throw new Error("Invalid credentials.");
                    }
                    console.log(user);
                    // return user object with their profile data
                    return user;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
});
