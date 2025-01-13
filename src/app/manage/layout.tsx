export const metadata = {
    robots: {
        index: false, // Do not index this page
        follow: false, // Do not follow links on this page
    },
};
const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
