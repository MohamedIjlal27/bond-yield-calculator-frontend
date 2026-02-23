import { Suspense } from "react";
import BondCalculator from "@/components/BondCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bond Yield Calculator - Calculate YTM & Cash Flows",
  description:
    "Professional bond yield calculator for computing current yield, yield to maturity (YTM), and detailed cash flow schedules. Built with Next.js and TypeScript.",
  keywords: [
    "bond calculator",
    "yield to maturity",
    "YTM",
    "bond analysis",
    "cash flow",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bond Yield Calculator
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Calculate current yield, YTM, and cash flow schedules for bonds
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span
                  className="w-2 h-2 bg-green-500 rounded-full"
                  aria-label="Status indicator"
                ></span>
                <span>Connected to API</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense
          fallback={
            <div className="text-center py-12">Loading calculator...</div>
          }
        >
          <BondCalculator />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Bond Yield Calculator - Built with Next.js, React, and TypeScript
            </p>
            <p className="mt-1">
              YTM calculated using Newton-Raphson method with bisection fallback
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
