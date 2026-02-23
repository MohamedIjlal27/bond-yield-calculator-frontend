import { BondCalculationResponse } from "@/types/bond";
import {
  formatPercentage,
  formatCurrency,
  getBadgeColor,
  capitalizeFirst,
  getBondStatusDescription,
} from "@/lib/utils";

interface ResultsSummaryProps {
  results: BondCalculationResponse | null;
}

export default function ResultsSummary({ results }: ResultsSummaryProps) {
  if (!results) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 h-full flex items-center justify-center">
        <p className="text-gray-500 text-center">
          Enter bond details and click Calculate to see results
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Calculation Results
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Current Yield */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Current Yield</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatPercentage(results.currentYield)}
          </p>
        </div>

        {/* YTM */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Yield to Maturity (YTM)</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatPercentage(results.ytm)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Effective annual rate</p>
        </div>

        {/* Total Interest */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Total Interest</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(results.totalInterest)}
          </p>
        </div>

        {/* Premium/Discount */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Bond Status</p>
          <div className="flex items-center mt-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getBadgeColor(
                results.premiumOrDiscount,
              )}`}
            >
              {capitalizeFirst(results.premiumOrDiscount)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {getBondStatusDescription(results.premiumOrDiscount)}
          </p>
        </div>
      </div>

      {/* Input Echo */}
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <p className="text-xs font-semibold text-gray-700 mb-2">
          Input Summary
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <span className="font-medium">Face Value:</span>{" "}
            {formatCurrency(results.inputsEcho.faceValue)}
          </div>
          <div>
            <span className="font-medium">Market Price:</span>{" "}
            {formatCurrency(results.inputsEcho.marketPrice)}
          </div>
          <div>
            <span className="font-medium">Coupon Rate:</span>{" "}
            {results.inputsEcho.annualCouponRate}%
          </div>
          <div>
            <span className="font-medium">Maturity:</span>{" "}
            {results.inputsEcho.yearsToMaturity} years
          </div>
        </div>
      </div>
    </div>
  );
}
