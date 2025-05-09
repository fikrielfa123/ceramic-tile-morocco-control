
export type UserRole = 'admin' | 'qualityManager' | 'productionStaff' | 'auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface BatchStatus {
  status: 'pending' | 'inProgress' | 'completed' | 'failed';
  color: string;
}

export interface Batch {
  id: string;
  name: string;
  date: string;
  kiln: string;
  materialLot: string;
  status: BatchStatus;
  createdBy: string;
  passingRate?: number;
}

export interface Measurement {
  id: string;
  batchId: string;
  parameter: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: 'pass' | 'fail' | 'warning';
  date: string;
  measuredBy: string;
}

export interface Defect {
  id: string;
  batchId: string;
  type: 'crack' | 'chip' | 'colorDeviation' | 'glazeDefect' | 'other';
  description: string;
  severity: 'low' | 'medium' | 'high';
  imageUrl?: string;
  date: string;
  reportedBy: string;
}

export interface QualityParameter {
  id: string;
  name: string;
  isoCode: string;
  description: string;
  unit: string;
  minValue: number;
  maxValue: number;
  category: 'dimensional' | 'visual' | 'physical' | 'other';
}

export interface Report {
  id: string;
  batchId: string;
  title: string;
  date: string;
  isCompliant: boolean;
  parameters: Measurement[];
  defects: Defect[];
  summary: string;
  generatedBy: string;
}

export interface QualityMetric {
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  status: 'positive' | 'negative' | 'neutral';
  unit?: string;
}
