import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

function getBackendBaseUrl() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return backendUrl.replace(/\/$/, "");
}

async function proxyRequest(request: NextRequest, context: RouteContext) {
  try {
    const backendBaseUrl = getBackendBaseUrl();
    const { path } = await context.params;

    const targetUrl = `${backendBaseUrl}/api/${path.join("/")}${request.nextUrl.search}`;

    // ✅ Forward only required headers
    const authHeader = request.headers.get("authorization");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    // ✅ Handle body safely
    let body: string | undefined = undefined;

    if (request.method !== "GET" && request.method !== "HEAD") {
      body = await request.text();
    }

    // ✅ Call backend
    const res = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });

    // ✅ SAFEST: parse JSON (prevents encoding issues)
    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Proxy error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ✅ Support all methods
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