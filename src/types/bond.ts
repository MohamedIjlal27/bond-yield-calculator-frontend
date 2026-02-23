export type CouponFrequency = "annual" | "semiAnnual";

export type PremiumDiscountIndicator = "premium" | "discount" | "par";

export interface BondInputs {
  faceValue: number;
  annualCouponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: CouponFrequency;
}

export interface CashFlowScheduleItem {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface BondCalculationResponse {
  currentYield: number;
  ytm: number;
  totalInterest: number;
  premiumOrDiscount: PremiumDiscountIndicator;
  cashFlowSchedule: CashFlowScheduleItem[];
  inputsEcho: BondInputs;
}
