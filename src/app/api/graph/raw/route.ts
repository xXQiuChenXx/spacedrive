import { apiConfig } from "@/config/api.config";
import { getCachedUser } from "@/lib/oAuthHandler";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Only for getting images
  const params = request.nextUrl.searchParams;
  const itemId = params.get("item");
  const token = await getCachedUser();
  if (!token) return redirect("/setup");
  const { accessToken } = token;

  const response = await fetch(
    `${apiConfig.graphApi}/items/${itemId}/content`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    return Response.json(
      {
        error: {
          code: "500 Internal Server Error",
          message: "The requested content is not available",
        },
      },
      { status: 500 }
    );
  }
  const contentType = response.headers.get("content-type");

  // if (!contentType || !contentType.startsWith("image")) {
  //   return Response.json(
  //     {
  //       error: {
  //         code: "400 Bad Request",
  //         message: "The requested content only can be image type",
  //       },
  //     },
  //     { status: 400 }
  //   );
  // }
  const imageBuffer = await response.arrayBuffer();

  return new Response(Buffer.from(imageBuffer), {
    status: 200,
    headers: {
      "Content-Type": contentType as string,
      "Content-Disposition": response.headers.get(
        "content-disposition"
      ) as string,
    },
  });
}
