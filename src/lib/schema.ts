import z from "zod";
export const contactSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    fullname: z.string().min(1, { message: "Fullname is required" }),
    content: z.string().min(1, { message: "Content is required" }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export const projectSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    image: z.instanceof(File),
    stacks: z.array(z.string()).min(1, { message: "Stacks is required" }),
});
