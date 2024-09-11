import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { apiConfig } from "@/config/api.config";

const secretKey = apiConfig.secretKey;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt({
  payload,
  expTime,
}: {
  payload: { refreshToken: string };
  expTime?: number | Date | string;
}) {
  const encrypted = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt();

  if (expTime) encrypted.setExpirationTime(expTime);
  return encrypted.sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as { refreshToken: string };
  } catch (error) {
    console.log("Failed to verify session");
  }
}
