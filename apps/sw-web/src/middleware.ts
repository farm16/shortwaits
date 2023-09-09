// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export function middleware(req: NextRequest) {
  // Clone the URL
  const request = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(request.pathname) || request.pathname.includes("_next")) return;

  const host = req.headers.get("host");
  const subdomain = getValidSubdomain(host);

  if (subdomain) {
    const redirect = `/${subdomain}${request.pathname}`;
    console.log(`>>> Rewriting: ${redirect}`);
    request.pathname = redirect;
  }

  return NextResponse.rewrite(request);
}

const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes(".")) {
    const candidate = host.split(".")[0];
    if (candidate && !candidate.includes("localhost")) {
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};
