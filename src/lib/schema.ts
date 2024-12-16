import z from "zod";
export const contactSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    fullname: z.string().min(1, { message: "Fullname is required" }),
    content: z.string().min(1, { message: "Content is required" }),
});
