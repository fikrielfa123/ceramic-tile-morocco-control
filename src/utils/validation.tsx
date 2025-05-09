
import { Measurement } from "@/types";

export const validateMeasurement = (
  value: number,
  min: number,
  max: number
): "pass" | "fail" | "warning" => {
  if (value >= min && value <= max) {
    return "pass";
  } else if (
    (value < min && value >= min * 0.95) ||
    (value > max && value <= max * 1.05)
  ) {
    // Allow a 5% grace margin for warnings
    return "warning";
  } else {
    return "fail";
  }
};

export const generateISOReport = (measurements: Measurement[]): {
  isCompliant: boolean;
  nonCompliantCount: number;
  warningCount: number;
  passCount: number;
} => {
  const nonCompliant = measurements.filter((m) => m.status === "fail");
  const warnings = measurements.filter((m) => m.status === "warning");
  const passes = measurements.filter((m) => m.status === "pass");

  return {
    isCompliant: nonCompliant.length === 0,
    nonCompliantCount: nonCompliant.length,
    warningCount: warnings.length,
    passCount: passes.length,
  };
};

export const getCorrectiveAction = (
  parameter: string,
  value: number,
  min: number,
  max: number
): string => {
  if (parameter === "Water Absorption" && value > max) {
    return "Increase firing temperature by 10-15°C or extend firing time by 5-10 minutes.";
  } else if (parameter === "Warping" && value > max) {
    return "Reduce cooling rate after firing. Check kiln temperature uniformity.";
  } else if (parameter === "Breaking Strength" && value < min) {
    return "Check clay composition. Consider increasing thickness or adjusting material formula.";
  } else if (parameter === "Thickness" && (value < min || value > max)) {
    return "Adjust pressing parameters. Check for wear on pressing tools.";
  } else if (
    (parameter === "Length" || parameter === "Width") &&
    (value < min || value > max)
  ) {
    return "Calibrate cutting tools. Check for wear on molds.";
  } else {
    return "Review production process parameters and raw materials quality.";
  }
};
