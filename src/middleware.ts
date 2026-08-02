import { auth } from "@/lib/auth";

export default auth((req) => {
  // Middleware logic can go here
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/billing/:path*"],
};
