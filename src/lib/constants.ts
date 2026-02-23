/**
 * Application-wide constants
 */

export const APP_CONFIG = {
  name: "Bond Yield Calculator",
  description:
    "Calculate current yield, YTM, and cash flow schedules for bonds",
  version: "1.0.0",
} as const;

export const BOND_DEFAULTS = {
  faceValue: 1000,
  annualCouponRate: 5,
  marketPrice: 950,
  yearsToMaturity: 5,
  couponFrequency: "semiAnnual" as const,
} as const;

export const VALIDATION_MESSAGES = {
  faceValueRequired: "Face value is required",
  faceValuePositive: "Face value must be greater than 0",
  couponRateMin: "Coupon rate must be 0 or greater",
  marketPriceRequired: "Market price is required",
  marketPricePositive: "Market price must be greater than 0",
  yearsRequired: "Years to maturity is required",
  yearsPositive: "Years to maturity must be greater than 0",
  frequencyRequired: "Coupon frequency is required",
} as const;

export const API_ENDPOINTS = {
  calculateBond: "/api/v1/bonds/calculate",
} as const;
