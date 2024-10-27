import React from 'react';
import KPICard from '../components/KPICard';
import Chart from '../components/Chart';
import { KPICardType, ChartData } from '../types/dashboard';

const Dashboard: React.FC = () => {
  const kpiData: KPICardType[] = [
    {
      title: 'Total Revenue',
      value: 2458600,
      change: 12.5,
      format: 'currency',
      icon: 'DollarSign'
    },
    {
      title: 'Active Users',
      value: 45789,
      change: 8.2,
      format: 'number',
      icon: 'Users'
    },
    {
      title: 'Conversion Rate',
      value: 3.2,
      change: -1.1,
      format: 'percent',
      icon: 'BarChart3'
    },
    {
      title: 'Average Order Value',
      value: 259,
      change: 5.3,
      format: 'currency',
      icon: 'ShoppingCart'
    }
  ];

  const revenueData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue 2024',
        data: [350000, 420000, 380000, 450000, 480000, 520000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Revenue 2023',
        data: [320000, 380000, 350000, 410000, 440000, 480000],
        borderColor: 'rgb(147, 197, 253)',
        backgroundColor: 'rgba(147, 197, 253, 0.1)',
        tension: 0.4
      }
    ]
  };

  const productData: ChartData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [{
      label: 'Revenue by Product',
      data: [125000, 95000, 85000, 115000, 95000],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(147, 197, 253, 0.8)',
        'rgba(96, 165, 250, 0.8)',
        'rgba(37, 99, 235, 0.8)',
        'rgba(191, 219, 254, 0.8)',
      ],
    }]
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="line"
          data={revenueData}
          title="Revenue Trend"
          height={400}
        />
        <Chart
          type="pie"
          data={productData}
          title="Revenue by Product"
          height={400}
        />
      </div>
    </div>
  );
};

export default Dashboard;