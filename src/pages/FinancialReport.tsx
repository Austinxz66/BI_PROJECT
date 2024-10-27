import React, { useState } from 'react';
import KPICard from '../components/KPICard';
import Chart from '../components/Chart';
import FilterPanel from '../components/FilterPanel';
import { KPICardType, ChartData, FilterState } from '../types/dashboard';
import { filterData, generateTimeSeriesData } from '../utils/dataTransforms';

const FinancialReport: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'ytd',
    region: 'all',
    department: 'all',
    product: 'all'
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const timeSeriesData = generateTimeSeriesData(filters);
  const filteredData = filterData(timeSeriesData, filters);

  const kpiData: KPICardType[] = [
    {
      title: 'Total Revenue',
      value: filteredData.revenue,
      change: 12.5,
      format: 'currency',
      icon: 'DollarSign'
    },
    {
      title: 'Gross Profit Margin',
      value: filteredData.profitMargin,
      change: 2.3,
      format: 'percent',
      icon: 'TrendingUp'
    },
    {
      title: 'Operating Expenses',
      value: filteredData.expenses,
      change: -5.2,
      format: 'currency',
      icon: 'Receipt'
    },
    {
      title: 'Net Profit',
      value: filteredData.netProfit,
      change: 15.7,
      format: 'currency',
      icon: 'PiggyBank'
    }
  ];

  const revenueData: ChartData = {
    labels: filteredData.timeLabels,
    datasets: [
      {
        label: 'Revenue',
        data: filteredData.revenueTrend,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: filteredData.expensesTrend,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      }
    ]
  };

  const profitMarginData: ChartData = {
    labels: filteredData.timeLabels,
    datasets: [{
      label: 'Profit Margin %',
      data: filteredData.marginTrend,
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4
    }]
  };

  const departmentData: ChartData = {
    labels: filteredData.departments,
    datasets: [{
      label: 'Revenue by Department',
      data: filteredData.departmentRevenue,
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
    }]
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        className="lg:w-64 shrink-0"
      />
      
      <div className="flex-1 space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 dark:text-white">Revenue Analysis</h1>
          <div className="h-1 w-20 bg-blue-500"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart
            type="line"
            data={revenueData}
            title="Revenue vs Expenses"
            height={400}
          />
          <Chart
            type="line"
            data={profitMarginData}
            title="Profit Margin Trend"
            height={400}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart
            type="pie"
            data={departmentData}
            title="Revenue by Department"
            height={400}
          />
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Key Insights</h3>
            <ul className="space-y-4">
              {filteredData.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                  <span className="text-gray-600 dark:text-gray-300">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;