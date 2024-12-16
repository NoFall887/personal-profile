"use client";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/schema";
import { useState, useTransition } from "react";
import { sendMail } from "@/action/mail";
import { myEmail } from "@/lib/const";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { z } from "zod";
import { toast } from "sonner";
import { ErrorResponse } from "resend";

const ContactForm = () => {
    const form = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            email: "",
            fullname: "",
            content: "",
        },
        mode: "onChange",
    });
    const [isPending, startTransition] = useTransition();
    const [copied, setCopied] = useState<boolean>(false);
    async function handleCopy(e: React.MouseEvent) {
        e.preventDefault();
        navigator.clipboard.writeText(myEmail);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }
    const onSubmit = (data: z.infer<typeof contactSchema>) => {
        startTransition(() => {
            sendMail(data)
                .then((value) => {
                    toast.success("Email sent!", {
                        position: "bottom-right",
                        description: "Thanks for reaching me out!",
                        duration: 2000,
                        dismissible: true,
                    });
                })
                .catch((err: ErrorResponse | unknown) => {
                    toast.error("Oh no!", {
                        position: "bottom-right",
                        description: JSON.stringify(err),
                        duration: 2000,
                        dismissible: true,
                    });
                });
        });
    };

    return (
        <>
            <div className="text-center ">
                <h1 className="text-3xl mb-1 font-semibold">Get in Touch</h1>
                <p className="text-white/70">Feel free to reach me via the form below.</p>
                <div className="text-sm text-muted-foreground">Or</div>
                <button
                    onClick={handleCopy}
                    className="mb-3 rounded-md flex mx-auto items-center gap-2 bg-slate-900 px-3 py-2 justify-center text-sm"
                >
                    <span>{myEmail}</span>
                    {copied ? <FaCheck color="white" /> : <FaRegCopy />}
                </button>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-3">
                                <FormLabel>Your Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Your email"
                                        className="focus:bg-slate-900 transition-colors duration-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem className="mb-3">
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Your full name"
                                        className="focus:bg-slate-900 transition-colors duration-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="mb-5">
                                <FormLabel>Your Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="focus:bg-slate-900 transition-colors duration-300"
                                        placeholder="Enter your message here"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="text-center">
                        <Button
                            type="submit"
                            className="bg-white hover:bg-slate-200 text-slate-800 w-full"
                            size={"default"}
                            disabled={isPending}
                        >
                            {isPending ? "Sending..." : "Send Email"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default ContactForm;
