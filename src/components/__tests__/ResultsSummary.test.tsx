import { render, screen } from "@testing-library/react";
import ResultsSummary from "@/components/ResultsSummary";
import { BondCalculationResponse } from "@/types/bond";

describe("ResultsSummary", () => {
  const mockResults: BondCalculationResponse = {
    currentYield: 0.0526,
    ytm: 0.061,
    totalInterest: 250,
    premiumOrDiscount: "discount",
    cashFlowSchedule: [],
    inputsEcho: {
      faceValue: 1000,
      annualCouponRate: 5,
      marketPrice: 950,
      yearsToMaturity: 5,
      couponFrequency: "semiAnnual",
    },
  };

  it("shows placeholder message when no results", () => {
    render(<ResultsSummary results={null} />);

    expect(
      screen.getByText(/enter bond details and click calculate/i),
    ).toBeInTheDocument();
  });

  it("renders all result metrics", () => {
    render(<ResultsSummary results={mockResults} />);

    expect(screen.getByText(/calculation results/i)).toBeInTheDocument();
    expect(screen.getByText(/current yield/i)).toBeInTheDocument();
    expect(screen.getByText(/yield to maturity/i)).toBeInTheDocument();
    expect(screen.getByText(/total interest/i)).toBeInTheDocument();
    expect(screen.getByText(/bond status/i)).toBeInTheDocument();
  });

  it("formats current yield as percentage", () => {
    render(<ResultsSummary results={mockResults} />);

    expect(screen.getByText("5.26%")).toBeInTheDocument();
  });

  it("formats YTM as percentage", () => {
    render(<ResultsSummary results={mockResults} />);

    expect(screen.getByText("6.10%")).toBeInTheDocument();
  });

  it("formats total interest as currency", () => {
    render(<ResultsSummary results={mockResults} />);

    expect(screen.getByText("$250.00")).toBeInTheDocument();
  });

  it("displays discount badge correctly", () => {
    render(<ResultsSummary results={mockResults} />);

    expect(screen.getByText("Discount")).toBeInTheDocument();
    expect(screen.getByText(/trading below face value/i)).toBeInTheDocument();
  });

  it("displays premium badge correctly", () => {
    const premiumResults = {
      ...mockResults,
      premiumOrDiscount: "premium" as const,
    };
    render(<ResultsSummary results={premiumResults} />);

    expect(screen.getByText("Premium")).toBeInTheDocument();
    expect(screen.getByText(/trading above face value/i)).toBeInTheDocument();
  });

  it("displays par badge correctly", () => {
    const parResults = { ...mockResults, premiumOrDiscount: "par" as const };
    render(<ResultsSummary results={parResults} />);

    expect(screen.getByText("Par")).toBeInTheDocument();
    expect(screen.getByText(/trading at face value/i)).toBeInTheDocument();
  });

  it("displays input echo", () => {
    render(<ResultsSummary results={mockResults} />);

    expect(screen.getByText(/input summary/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1,000.00/)).toBeInTheDocument();
    expect(screen.getByText(/\$950.00/)).toBeInTheDocument();
  });
});
