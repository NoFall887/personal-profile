"use client";
import { getProjects } from "@/action/project";
import GlowBox from "@/components/GlowBox";
import DialogForm from "@/components/manage/DialogForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import useSWR from "swr";
import { FaEdit } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { projectSchema } from "@/lib/schema";

const fetcher = () => getProjects().then((res) => res);
export type projectDataType = {
    id: string;
    data: Omit<z.infer<typeof projectSchema>, "image">;
};
const Page = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<null | projectDataType>(null);
    const { data } = useSWR("/api/projects", fetcher);
    return (
        <div className="container max-w-screen-xl mx-auto p-4 flex flex-wrap gap-4 text-white items-center justify-center">
            {data?.map((project) => (
                <GlowBox
                    key={project.id}
                    tilt={false}
                    className="w-full max-w-56 px-4 py-4 flex-col text-left group/edit"
                    as="button"
                    onClick={() => {
                        const { id, ...data } = project;
                        setFormData({ id, data });
                        setOpen(true);
                    }}
                >
                    <div className="w-full aspect-video rounded-md overflow-hidden mb-2">
                        <img
                            src={project.image || "https://placehold.co/600x400?text=IMG"}
                            alt={project.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-xl font-bold mb-1 overflow-hidden relative">
                        <span className="mr-2 max-w-[85%] line-clamp-1 text-ellipsis whitespace-nowrap">
                            {project.name}
                        </span>
                        <FaEdit className="w-5 h-5 absolute inline right-0 -top-full transition-transform duration-300 group-hover/edit:top-1/2 group-hover/edit:-translate-y-1/2" />
                    </h3>
                    <p className="text-sm text-white/50 mb-3 line-clamp-2 text-ellipsis">
                        {project.description}
                    </p>
                    {project.stacks.map((stack, idx) => (
                        <Badge
                            key={idx}
                            className="mr-2 bg-white text-black hover:bg-white/90"
                        >
                            {stack}
                        </Badge>
                    ))}
                </GlowBox>
            ))}
            <Dialog onOpenChange={setOpen} open={open}>
                <DialogTrigger
                    onClick={() => {
                        setFormData(null);
                        setOpen(true);
                    }}
                    className="rounded-xl border-2 hover:bg-white/10 border-white border-dashed flex justify-center items-center p-3 w-full max-w-32 aspect-square"
                >
                    <FaPlus className="w-8 h-8" />
                </DialogTrigger>
                <DialogForm setOpen={setOpen} formData={formData} />
            </Dialog>
        </div>
    );
};

export default Page;
