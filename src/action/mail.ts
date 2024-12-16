"use server";
import EmailTemplate from "@/components/EmailTemplate";
import { myEmail } from "@/lib/const";
import { contactSchema } from "@/lib/schema";
import { Resend } from "resend";
import z from "zod";

export async function sendMail({
    content,
    email,
    fullname,
}: z.infer<typeof contactSchema>) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { data, error } = await resend.emails.send({
            from: `My Portofolio<${
                process.env.CUSTOM_DOMAIN
                    ? "noreply@" + process.env.CUSTOM_DOMAIN
                    : "<onboarding@resend.dev>"
            }>`,
            to: [myEmail],
            subject: "Portofolio email",
            react: EmailTemplate({ content, email, fullname }),
        });

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}
