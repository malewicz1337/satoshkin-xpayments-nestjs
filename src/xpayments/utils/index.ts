export interface ProcessPaymentResult {
  success: boolean;
  message: string;
}

export function createSuccessResult(message: string): ProcessPaymentResult {
  return { success: true, message };
}

export function createErrorResult(message: string): ProcessPaymentResult {
  return { success: false, message };
}
