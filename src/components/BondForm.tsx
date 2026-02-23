"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BondInputs } from "@/types/bond";
import { BOND_DEFAULTS, VALIDATION_MESSAGES } from "@/lib/constants";

const bondSchema = z.object({
  faceValue: z.number().positive(VALIDATION_MESSAGES.faceValuePositive),
  annualCouponRate: z.number().min(0, VALIDATION_MESSAGES.couponRateMin),
  marketPrice: z.number().positive(VALIDATION_MESSAGES.marketPricePositive),
  yearsToMaturity: z.number().positive(VALIDATION_MESSAGES.yearsPositive),
  couponFrequency: z.enum(["annual", "semiAnnual"]),
});

interface BondFormProps {
  onSubmit: (data: BondInputs) => void;
  isLoading: boolean;
}

export default function BondForm({ onSubmit, isLoading }: BondFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BondInputs>({
    resolver: zodResolver(bondSchema),
    defaultValues: BOND_DEFAULTS,
  });

  const handleReset = () => {
    reset(BOND_DEFAULTS);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Face Value */}
        <div>
          <label
            htmlFor="faceValue"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Face Value ($)
          </label>
          <input
            id="faceValue"
            type="number"
            step="0.01"
            {...register("faceValue", { valueAsNumber: true })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.faceValue ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.faceValue && (
            <p className="mt-1 text-sm text-red-600">
              {errors.faceValue.message}
            </p>
          )}
        </div>

        {/* Annual Coupon Rate */}
        <div>
          <label
            htmlFor="annualCouponRate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Annual Coupon Rate (%)
          </label>
          <input
            id="annualCouponRate"
            type="number"
            step="0.01"
            {...register("annualCouponRate", { valueAsNumber: true })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.annualCouponRate ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.annualCouponRate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.annualCouponRate.message}
            </p>
          )}
        </div>

        {/* Market Price */}
        <div>
          <label
            htmlFor="marketPrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Market Price ($)
          </label>
          <input
            id="marketPrice"
            type="number"
            step="0.01"
            {...register("marketPrice", { valueAsNumber: true })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.marketPrice ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.marketPrice && (
            <p className="mt-1 text-sm text-red-600">
              {errors.marketPrice.message}
            </p>
          )}
        </div>

        {/* Years to Maturity */}
        <div>
          <label
            htmlFor="yearsToMaturity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Years to Maturity
          </label>
          <input
            id="yearsToMaturity"
            type="number"
            step="0.01"
            {...register("yearsToMaturity", { valueAsNumber: true })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.yearsToMaturity ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.yearsToMaturity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.yearsToMaturity.message}
            </p>
          )}
        </div>

        {/* Coupon Frequency */}
        <div>
          <label
            htmlFor="couponFrequency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Coupon Frequency
          </label>
          <select
            id="couponFrequency"
            {...register("couponFrequency")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.couponFrequency ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          >
            <option value="">Select frequency</option>
            <option value="annual">Annual</option>
            <option value="semiAnnual">Semi-Annual</option>
          </select>
          {errors.couponFrequency && (
            <p className="mt-1 text-sm text-red-600">
              {errors.couponFrequency.message}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Calculating..." : "Calculate"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
