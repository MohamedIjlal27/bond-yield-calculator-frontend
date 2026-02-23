"use client";

import { useState } from "react";
import { CashFlowScheduleItem } from "@/types/bond";
import { formatCurrency, formatDate } from "@/lib/utils";

interface CashFlowTableProps {
  cashFlowSchedule: CashFlowScheduleItem[] | null;
}

export default function CashFlowTable({
  cashFlowSchedule,
}: CashFlowTableProps) {
  const [sortAscending, setSortAscending] = useState(true);

  if (!cashFlowSchedule || cashFlowSchedule.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">
          Cash flow schedule will appear here after calculation
        </p>
      </div>
    );
  }

  const sortedSchedule = [...cashFlowSchedule].sort((a, b) => {
    return sortAscending ? a.period - b.period : b.period - a.period;
  });

  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Cash Flow Schedule
        </h3>
        <button
          onClick={toggleSort}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Sort {sortAscending ? "↓" : "↑"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Period
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Coupon Payment
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cumulative Interest
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Remaining Principal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedSchedule.map((item, index) => (
                <tr
                  key={item.period}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.period}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {formatDate(item.paymentDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(item.couponPayment)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(item.cumulativeInterest)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(item.remainingPrincipal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>
          Showing {cashFlowSchedule.length} payment period
          {cashFlowSchedule.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
