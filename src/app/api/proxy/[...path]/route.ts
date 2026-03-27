import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

function getBackendBaseUrl() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return backendUrl.replace(/\/$/, "");
}

async function proxyRequest(request: NextRequest, context: RouteContext) {
  const backendBaseUrl = getBackendBaseUrl();
  const { path } = await context.params;
  const backendPath = path.join("/");
  const targetUrl = `${backendBaseUrl}/api/${backendPath}${request.nextUrl.search}`;

  const outgoingHeaders = new Headers(request.headers);
  HOP_BY_HOP_HEADERS.forEach((header) => outgoingHeaders.delete(header));

  const shouldSendBody = request.method !== "GET" && request.method !== "HEAD";
  const requestBody = shouldSendBody ? await request.text() : undefined;

  const upstreamResponse = await fetch(targetUrl, {
    method: request.method,
    headers: outgoingHeaders,
    body: requestBody,
    cache: "no-store",
  });

  const responseHeaders = new Headers(upstreamResponse.headers);
  HOP_BY_HOP_HEADERS.forEach((header) => responseHeaders.delete(header));

  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}
