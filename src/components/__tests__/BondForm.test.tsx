import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BondForm from "@/components/BondForm";

describe("BondForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders all form fields", () => {
    render(<BondForm onSubmit={mockOnSubmit} isLoading={false} />);

    expect(screen.getByLabelText(/face value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual coupon rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/market price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/years to maturity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/coupon frequency/i)).toBeInTheDocument();
  });

  it("renders calculate and reset buttons", () => {
    render(<BondForm onSubmit={mockOnSubmit} isLoading={false} />);

    expect(
      screen.getByRole("button", { name: /calculate/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("has default values", () => {
    render(<BondForm onSubmit={mockOnSubmit} isLoading={false} />);

    const faceValueInput = screen.getByLabelText(
      /face value/i,
    ) as HTMLInputElement;
    const couponRateInput = screen.getByLabelText(
      /annual coupon rate/i,
    ) as HTMLInputElement;
    const marketPriceInput = screen.getByLabelText(
      /market price/i,
    ) as HTMLInputElement;
    const yearsInput = screen.getByLabelText(
      /years to maturity/i,
    ) as HTMLInputElement;

    expect(faceValueInput.value).toBe("1000");
    expect(couponRateInput.value).toBe("5");
    expect(marketPriceInput.value).toBe("950");
    expect(yearsInput.value).toBe("5");
  });

  it("shows validation error for negative face value", async () => {
    const user = userEvent.setup();
    render(<BondForm onSubmit={mockOnSubmit} isLoading={false} />);

    const faceValueInput = screen.getByLabelText(/face value/i);
    const submitButton = screen.getByRole("button", { name: /calculate/i });

    await user.clear(faceValueInput);
    await user.type(faceValueInput, "-100");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/face value must be greater than 0/i),
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("disables form when loading", () => {
    render(<BondForm onSubmit={mockOnSubmit} isLoading={true} />);

    const submitButton = screen.getByRole("button", { name: /calculating/i });
    const faceValueInput = screen.getByLabelText(/face value/i);

    expect(submitButton).toBeDisabled();
    expect(faceValueInput).toBeDisabled();
  });

  it("calls onSubmit with valid data", async () => {
    const user = userEvent.setup();
    render(<BondForm onSubmit={mockOnSubmit} isLoading={false} />);

    const submitButton = screen.getByRole("button", { name: /calculate/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      const callArgs = mockOnSubmit.mock.calls[0][0];
      expect(callArgs).toEqual({
        faceValue: 1000,
        annualCouponRate: 5,
        marketPrice: 950,
        yearsToMaturity: 5,
        couponFrequency: "semiAnnual",
      });
    });
  });
});
