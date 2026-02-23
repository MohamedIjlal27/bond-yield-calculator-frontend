/**
 * Environment variable validation
 * Only validates variables needed on the client side (NEXT_PUBLIC_*)
 */

function validateEnv() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiUrl) {
    console.warn(
      "NEXT_PUBLIC_API_BASE_URL is not set, using default: http://localhost:3000",
    );
  }

  return {
    NEXT_PUBLIC_API_BASE_URL: apiUrl || "http://localhost:3000",
  };
}

export const env = validateEnv();
