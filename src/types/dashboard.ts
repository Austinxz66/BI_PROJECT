export interface KPICard {
  title: string;
  value: number;
  change: number;
  format: string;
  icon: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
    tension?: number;
  }[];
}

export interface FilterState {
  dateRange: 'ytd' | 'last12m' | 'last6m' | 'last3m';
  region: 'all' | 'na' | 'eu' | 'asia';
  department: 'all' | 'sales' | 'marketing' | 'rd' | 'ops';
  product: 'all' | 'software' | 'hardware' | 'services';
}

export interface SalesData {
  date: string;
  amount: number;
}

export interface RevenueByProduct {
  product: string;
  revenue: number;
}