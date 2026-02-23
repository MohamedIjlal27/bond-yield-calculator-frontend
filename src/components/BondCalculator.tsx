"use client";

import { useState, useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";
import BondForm from "@/components/BondForm";
import ResultsSummary from "@/components/ResultsSummary";
import CashFlowTable from "@/components/CashFlowTable";
import { calculateBondAction } from "@/app/actions";
import { BondInputs, BondCalculationResponse } from "@/types/bond";

export default function BondCalculator() {
  const [results, setResults] = useState<BondCalculationResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCalculate = async (data: BondInputs) => {
    startTransition(async () => {
      try {
        console.log("🚀 Calling backend API via Server Action...");
        console.log("Input data:", data);
        
        const result = await calculateBondAction(data);
        
        console.log("✅ Received response from Server Action");

        if (result.success) {
          setResults(result.data);
          toast.success("Bond metrics calculated successfully!");
        } else {
          toast.error(result.error);
          setResults(null);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
        setResults(null);
      }
    });
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Bond Details
          </h2>
          <BondForm onSubmit={handleCalculate} isLoading={isPending} />
        </div>

        {/* Right: Results Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <ResultsSummary results={results} />
        </div>
      </div>

      {/* Below: Cash Flow Schedule Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <CashFlowTable cashFlowSchedule={results?.cashFlowSchedule || null} />
      </div>
    </>
  );
}
