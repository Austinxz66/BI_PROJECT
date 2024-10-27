import { FilterState } from '../types/dashboard';

export const generateTimeSeriesData = (filters: FilterState) => {
  // Simulated data generation based on filters
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  let timeLabels: string[] = [];
  let revenueTrend: number[] = [];
  let expensesTrend: number[] = [];
  let marginTrend: number[] = [];
  
  switch (filters.dateRange) {
    case 'last3m':
      timeLabels = months.slice(currentMonth - 2, currentMonth + 1);
      break;
    case 'last6m':
      timeLabels = months.slice(currentMonth - 5, currentMonth + 1);
      break;
    case 'last12m':
      timeLabels = [...months.slice(currentMonth + 1), ...months.slice(0, currentMonth + 1)];
      break;
    default: // ytd
      timeLabels = months.slice(0, currentMonth + 1);
  }

  // Generate mock data
  timeLabels.forEach(() => {
    const revenue = 500000 + Math.random() * 500000;
    const expenses = revenue * (0.6 + Math.random() * 0.1);
    revenueTrend.push(revenue);
    expensesTrend.push(expenses);
    marginTrend.push(((revenue - expenses) / revenue) * 100);
  });

  return {
    timeLabels,
    revenueTrend,
    expensesTrend,
    marginTrend
  };
};

export const filterData = (timeSeriesData: any, filters: FilterState) => {
  // Apply filters and return processed data
  const multiplier = filters.region === 'all' ? 1 : 0.7;
  
  return {
    revenue: 2458600 * multiplier,
    profitMargin: 32.5,
    expenses: 1537900 * multiplier,
    netProfit: 920700 * multiplier,
    timeLabels: timeSeriesData.timeLabels,
    revenueTrend: timeSeriesData.revenueTrend.map(v => v * multiplier),
    expensesTrend: timeSeriesData.expensesTrend.map(v => v * multiplier),
    marginTrend: timeSeriesData.marginTrend,
    departments: ['Sales', 'Marketing', 'R&D', 'Operations'],
    departmentRevenue: [350000, 280000, 420000, 310000].map(v => v * multiplier),
    insights: [
      'Revenue has shown a consistent upward trend over the selected period',
      'Profit margins have improved by 2.3% compared to the previous period',
      'Operating expenses have decreased due to cost optimization initiatives',
      'R&D department shows the highest revenue contribution this quarter'
    ]
  };
};