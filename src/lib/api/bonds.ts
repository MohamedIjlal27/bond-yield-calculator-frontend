import axios from "axios";
import { BondInputs, BondCalculationResponse } from "@/types/bond";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const bondsApi = {
  calculateBond: async (
    inputs: BondInputs,
  ): Promise<BondCalculationResponse> => {
    const response = await apiClient.post<BondCalculationResponse>(
      "/api/v1/bonds/calculate",
      inputs,
    );
    return response.data;
  },
};
