import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CashFlowTable from "@/components/CashFlowTable";
import { CashFlowScheduleItem } from "@/types/bond";

describe("CashFlowTable", () => {
  const mockCashFlow: CashFlowScheduleItem[] = [
    {
      period: 1,
      paymentDate: "2026-08-23",
      couponPayment: 25,
      cumulativeInterest: 25,
      remainingPrincipal: 1000,
    },
    {
      period: 2,
      paymentDate: "2027-02-23",
      couponPayment: 25,
      cumulativeInterest: 50,
      remainingPrincipal: 1000,
    },
    {
      period: 3,
      paymentDate: "2027-08-23",
      couponPayment: 25,
      cumulativeInterest: 75,
      remainingPrincipal: 0,
    },
  ];

  it("shows placeholder when no cash flow data", () => {
    render(<CashFlowTable cashFlowSchedule={null} />);

    expect(
      screen.getByText(/cash flow schedule will appear here/i),
    ).toBeInTheDocument();
  });

  it("renders table with headers", () => {
    render(<CashFlowTable cashFlowSchedule={mockCashFlow} />);

    expect(screen.getByText(/^period$/i)).toBeInTheDocument();
    expect(screen.getByText(/payment date/i)).toBeInTheDocument();
    expect(screen.getByText(/coupon payment/i)).toBeInTheDocument();
    expect(screen.getByText(/cumulative interest/i)).toBeInTheDocument();
    expect(screen.getByText(/remaining principal/i)).toBeInTheDocument();
  });

  it("renders all cash flow items", () => {
    render(<CashFlowTable cashFlowSchedule={mockCashFlow} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("formats currency values correctly", () => {
    render(<CashFlowTable cashFlowSchedule={mockCashFlow} />);

    const couponPayments = screen.getAllByText("$25.00");
    expect(couponPayments.length).toBeGreaterThan(0);
  });

  it("displays period count", () => {
    render(<CashFlowTable cashFlowSchedule={mockCashFlow} />);

    expect(screen.getByText(/showing 3 payment periods/i)).toBeInTheDocument();
  });

  it("toggles sort order when sort button is clicked", async () => {
    const user = userEvent.setup();
    render(<CashFlowTable cashFlowSchedule={mockCashFlow} />);

    const sortButton = screen.getByRole("button", { name: /sort/i });

    // Initial state should be ascending
    expect(sortButton).toHaveTextContent("↓");

    await user.click(sortButton);

    // After click should be descending
    expect(sortButton).toHaveTextContent("↑");
  });
});
