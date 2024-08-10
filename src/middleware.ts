import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const web_token = request.cookies.get("session")?.value; // web acess
  const auth_token = request.cookies.get("auth")?.value; // access key
  if(web_token && auth_token) return NextResponse.next();
  return NextResponse.redirect(new URL("/setup", request.url));
}

export const config = {
  matcher: ["/"],
};
