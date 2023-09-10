import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const authtoken = "token";
  const admintoken = "admintoken";
  if (request.cookies.get(authtoken) || request.cookies.get(admintoken)) {
    if (pathname == "/admin" && request.cookies.get(admintoken)) {
      return NextResponse.redirect(new URL("/admin/home", request.url));
    } else {
      const adminPath = ["/admin/home", "/admin/orders", "/admin/products"];
      const isMatch = adminPath.some((route) => pathname.includes(route));
      if (isMatch) {
        if (!request.cookies.get(admintoken))
          return NextResponse.redirect(new URL("/admin", request.url));
      } else {
        if (pathname.startsWith("/admin")) {
          return NextResponse.next();
        } else {
          if (request.cookies.get(authtoken)) {
            if (
              !pathname.startsWith("/login") &&
              !pathname.startsWith("/register")
            ) {
              return NextResponse.next();
            } else {
              return NextResponse.redirect(new URL("/home", request.url));
            }
          }
        }
      }
    }
  } else {
    const AdminRoute = ["/admin/home", "/admin/orders", "/admin/products"];
    const isAdminRoute = AdminRoute.some((route) => route == pathname);
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    const secureRoute = ["/home", "/checkout", "/profile"];
    const isSecureRoute = secureRoute.some((route) =>
      pathname.startsWith(route)
    );
    if (isSecureRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  }
}
