import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) => {
  try {
    // Resolve the params promise
    const resolvedParams = await params;
    
    const mockProject = {
      id: resolvedParams.projectId,
      name: "Sample Project",
      settings: {
        color: "#3B82F6",
        show_branding: true,
        auto_approve_status: "pending",
      },
    };

    return NextResponse.json(mockProject, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch widget configuration" },
      { status: 500 }
    );
  }
};

export const OPTIONS = async () => {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};