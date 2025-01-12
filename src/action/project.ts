"use server";
import { db } from "@/db";
import { project } from "@/db/schema/project";
import { supabase } from "@/lib/supabase";
import { projectSchema } from "@/lib/schema";
import { z } from "zod";

export const addProject = async (projectForm: z.infer<typeof projectSchema>) => {
    const projectData = projectSchema.safeParse(projectForm);

    if (!projectData.success) {
        throw new Error(projectData.error.message);
    }

    const { name, description, stacks, image, url } = projectData.data;
    const { data, error } = await supabase.storage
        .from("project")
        .upload(`public/${new Date().getTime()}${image.name}`, image);
    if (error) {
        throw new Error(error.message);
    }
    const imageurl = supabase.storage.from("project").getPublicUrl(data.path)
        .data.publicUrl;
    await db.insert(project).values({
        name,
        description,
        stacks,
        image: imageurl,
        url,
    });

    return { status: "success", data: { name, description, stacks, image: imageurl } };
};

export const getProjects = async () => {
    try {
        const projects = await db.select().from(project);
        return projects;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};
