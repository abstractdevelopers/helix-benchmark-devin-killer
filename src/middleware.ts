import { auth } from "@/lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/dashboard/:path*", "/api/billing/:path*"],
};
