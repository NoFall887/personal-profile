import { getProjects } from "@/action/project";
import GlowBox from "@/components/GlowBox";
import { Badge } from "@/components/ui/badge";
import { unstable_cache } from "next/cache";
import React from "react";
import { MdOpenInNew } from "react-icons/md";

const getCachedProjects = unstable_cache(
    async () => {
        const projects = await getProjects();
        return projects;
    },
    ["projects"],
    { revalidate: false, tags: ["projects"] }
);

const Page = async () => {
    const projects = await getCachedProjects();
    return (
        <div className="container max-w-screen-xl mx-auto flex flex-wrap gap-4 mt-8 items-center justify-center">
            {projects.map((project) => (
                <GlowBox
                    key={project.id}
                    className="w-full max-w-56 px-4 py-4 flex-col text-left group/edit text-white"
                >
                    <div className="w-full aspect-video rounded-md overflow-hidden mb-2">
                        <img
                            src={project.image || "https://placehold.co/600x400?text=IMG"}
                            alt={project.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <a
                        className="text-xl font-bold mb-1 overflow-hidden relative block"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="mr-2 max-w-[85%] line-clamp-1 text-ellipsis whitespace-nowrap">
                            {project.name}
                        </span>
                        <MdOpenInNew className="w-5 h-5 absolute inline right-0 -top-full transition-transform duration-300 group-hover/edit:top-1/2 group-hover/edit:-translate-y-1/2" />
                    </a>
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
        </div>
    );
};

export default Page;
