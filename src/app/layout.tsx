import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";

const rubik = Rubik({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "Naufal Amiruddin",
    description: "Naufal Amiruddin's personal website",
    openGraph: {
        title: "Naufal Amiruddin",
        description: "Naufal Amiruddin's personal website",
        url: "https://naufaladev.my.id",
        siteName: "Naufal Amiruddin",

        locale: "en_US",
        type: "profile",
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${rubik.className} antialiased bg-slate-900 min-h-screen pt-8 relative px-3`}
            >
                <Nav />
                <Toaster
                    toastOptions={{
                        style: {
                            background: "rgb(30,41,59,1)",
                            color: "white",
                        },
                    }}
                    className=""
                />
                {children}
                <object
                    className="mx-auto mt-10 mb-6"
                    data="https://img.shields.io/github/stars/NoFall887/personal-profile?style=flat&logo=github"
                />
            </body>
        </html>
    );
}
