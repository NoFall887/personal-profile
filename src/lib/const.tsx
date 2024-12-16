import { ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

export const myEmail = "naufalamiruddin123456@gmail.com";

export type experienceType = {
    name: string;
    company: string;
    location?: string;
    dateStart: Date;
    dateStop?: Date;
    imgPath?: string;
    description: string; // markdown text
    stack: string[];
};

export type socialType = {
    url: string;
    desc: string;
    icon: ReactNode;
    type: "social" | "mail";
};

export const experiences: experienceType[] = [
    {
        name: "Information Technology Major",
        company: "Univevrsity of Jember",
        dateStart: new Date("2020-08-01"),
        dateStop: new Date("2024-10-01"),
        description: `During my time at the University of Technology, I developed a strong foundation in computer science with a focus on software development and web technologies.
I graduated with a **3.9 GPA**, demonstrating my dedication to academic excellence and a strong grasp of computer science principles. To further improve my skills and gain practical experience, I earned a **Fullstack Developer Certificate** from Binar Academy.`,
        stack: [],
    },

    {
        name: "Backend Developer Intern",
        company: "M-Knows Consulting",
        location: "South Tangerang",
        dateStart: new Date("2023-02-01"),
        dateStop: new Date("2023-07-01"),
        stack: ["NodeJs", "ExpressJs", "PostgreSQL", "Docker", "GCP", "Swagger"],
        description: `During this internship, I'm involved in the development of the API of a Learning Management System (LMS).
- Designed and implemented a scalable database schema ensuring data integrity, security, and efficient query performance.
- Developed RESTful API endpoints for key features
- Created comprehensive API documentation using Swagger, enabling seamless integration by the front-end teams.`,
    },
    {
        name: "Freelance Web Developer",
        company: "Self Employed",
        dateStart: new Date("2024-01-01"),
        stack: ["NextJs", "Laravel", "Wordpress", "Elementor"],
        description: `
- Designed and developed responsive websites and web applications for small businesses, from concept to deployment.
- Collaborated directly with clients to identify project requirements and deliver client-oriented solutions, Managed project timelines and client communications to ensure fulfilled clients and business needs.
- Conducted performance optimization and implemented SEO best practices`,
    },
];

export type toolType = { path: string; desc: string };

export const socials: socialType[] = [
    {
        icon: <FaGithub />,
        url: "https://github.com/NoFall887",
        desc: "@NoFall887",
        type: "social",
    },
    {
        icon: <FaLinkedin />,
        url: "https://www.linkedin.com/in/naufal-amiruddin-868057223/",
        desc: "Naufal Amiruddin",
        type: "social",
    },
    {
        icon: <MdMail />,
        url: myEmail,
        desc: myEmail,
        type: "mail",
    },
];

export const tools: toolType[] = [
    { desc: "NextJs", path: "/next-js.svg" },
    { desc: "NodeJs", path: "/nodejs.svg" },
    { desc: "ExpressJs", path: "/express.svg" },
    { desc: "Laravel", path: "/laravel.svg" },
    { desc: "PostgreSQL", path: "/postgresql.svg" },
    { desc: "Docker", path: "/docker.svg" },
    { desc: "WordPress", path: "/wordpress.svg" },
    { desc: "Elementor", path: "/elementor.svg" },
    { desc: "Google Cloud Platform", path: "/gcp.svg" },
    { desc: "GitHub", path: "/github.svg" },
    { desc: "TypeScript", path: "/typescript.svg" },
    { desc: "MongoDB", path: "/mongo.svg" },
];

export const resumePath = "/NaufalAmiruddinResume.pdf";

const expDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
});

export const formatexpDate = (date: Date) => {
    return expDateFormatter.format(date).replace(",", "");
};
