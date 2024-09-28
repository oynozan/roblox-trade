import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Encryption } from "./lib/encryption";

const AUTH_PAGES = ["/login", "/register", "/password-reset", "/activate"];

export async function middleware(request: NextRequest) {
    const user = cookies().get("access-token");
    const logged = cookies().get("logged");

    let decodedUser: any = null;

    // If the user is not logged in and trying to access a protected route
    if (!user?.value || !logged?.value) {
        // Check if the user is trying to access an authentication page
        for (const page of AUTH_PAGES) {
            if (request.nextUrl.pathname.startsWith(page)) {
                return NextResponse.next();
            }
        }

        // Redirect to the login page
        return NextResponse.redirect(new URL("/login", request.url));
    } else {
        // Decode the user cookie
        decodedUser = await Encryption.decodeJwt(user.value);
    }

    // Check if user has not activated their account
    if (!decodedUser.activated) {
        if (request.nextUrl.pathname === "/activate") {
            return NextResponse.next();
        }

        // Redirect to the activation page
        return NextResponse.redirect(new URL("/activate", request.url));
    } else {
        // Check if the user is logged in and trying to access an authentication page
        for (const page of AUTH_PAGES) {
            if (request.nextUrl.pathname.startsWith(page)) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }
    }

    // If the user is logged in or accessing a public route, continue as normal
    return NextResponse.next();
}

// Add your protected routes here
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         * Also exclude file requests (files with an extension)
         */
        "/((?!api|_next/static|_next/image|favicon.ico)(?!.*\\.[\\w]+$).*)",
    ],
};
