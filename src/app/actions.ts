"use server";

import { BondInputs, BondCalculationResponse } from "@/types/bond";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://bond-yield-calculator-backend.vercel.app";

export async function calculateBondAction(
  inputs: BondInputs,
): Promise<
  | { success: true; data: BondCalculationResponse }
  | { success: false; error: string }
> {
  try {
    // Log the API URL for debugging
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("Full request URL:", `${API_BASE_URL}/api/v1/bonds/calculate`);

    const response = await fetch(`${API_BASE_URL}/api/v1/bonds/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.message ||
        `Server error: ${response.status} ${response.statusText}`;

      if (Array.isArray(errorMessage)) {
        return {
          success: false,
          error: errorMessage.join(", "),
        };
      }

      return {
        success: false,
        error:
          typeof errorMessage === "string"
            ? errorMessage
            : "Failed to calculate bond metrics",
      };
    }

    const data: BondCalculationResponse = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error in calculateBondAction:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        error:
          "Unable to connect to the server. Please ensure the backend is running.",
      };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
