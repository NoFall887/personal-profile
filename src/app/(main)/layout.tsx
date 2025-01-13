import Nav from "@/components/Nav";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="px-3 pt-4">
            <Nav />
            {children}
            <object
                className="mx-auto mt-4 mb-6"
                data="https://img.shields.io/github/stars/NoFall887/personal-profile?style=flat&logo=github"
            />
        </div>
    );
};

export default Layout;
