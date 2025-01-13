"use client";

import { z } from "zod";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TagsInput from "./TagsInput";
import { addProject, updateProject } from "@/action/project";
import { Dispatch, SetStateAction, useEffect, useTransition } from "react";
import { useSWRConfig } from "swr";
import { projectDataType } from "@/app/manage/page";

const DialogForm = ({
    setOpen,
    formData,
}: {
    setOpen: Dispatch<SetStateAction<boolean>>;
    formData: projectDataType | null;
}) => {
    const { mutate } = useSWRConfig();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            stacks: [],
            url: "",
        },
    });

    function closeAndRefetch() {
        setOpen(false);
        mutate("/api/projects");
    }

    useEffect(() => {
        if (formData) {
            form.reset(formData.data);
        } else {
            form.reset({
                name: "",
                description: "",
                stacks: [],
                url: "",
            });
        }
    }, [formData]);
    async function onSubmit(values: z.infer<typeof projectSchema>) {
        startTransition(async () => {
            if (formData) {
                await updateProject(formData.id, values)
                    .then(() => {
                        closeAndRefetch();
                    })
                    .catch((error) => {
                        closeAndRefetch();
                        console.error(error);
                    });
            } else {
                await addProject(values)
                    .then(() => {
                        closeAndRefetch();
                    })
                    .catch((error) => {
                        closeAndRefetch();
                        console.error(error);
                    });
            }
        });
    }
    return (
        <DialogContent className="bg-slate-950 text-white">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Add Project</DialogTitle>
                    </DialogHeader>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project X" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <TagsInput
                        control={form.control}
                        name="stacks"
                        setVal={form.setValue}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project URL" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Project description"
                                        {...fieldProps}
                                        onChange={(event) =>
                                            onChange(event.target.files?.[0])
                                        }
                                        accept="image/*"
                                        type="file"
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
        </DialogContent>
    );
};

export default DialogForm;
