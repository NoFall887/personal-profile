import { auth } from "@/app/api/auth/auth";

export default auth((req) => {
    if (req.nextUrl.pathname === "/manage/login") {
        if (req.auth) {
            const newUrl = new URL("/manage", req.nextUrl.origin);
            return Response.redirect(newUrl);
        }
        return;
    }

    if (!req.auth) {
        const newUrl = new URL("/manage/login", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
});

export const config = {
    matcher: "/manage/:path*",
};
