"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { login } from "@/action/signin";

const Page = () => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            await login(values);
        });
    }
    return (
        <div className="bg-slate-950 h-screen w-screen flex justify-center items-center">
            <div className="container max-w-screen-sm bg-slate-800 p-4 text-white">
                <h1 className="mb-3 text-2xl font-semibold text-white text-center">
                    Login
                </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="example@email.com"
                                            className="bg-white text-black"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="password"
                                            type="password"
                                            {...field}
                                            className="bg-white text-black"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Page;
