import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { ChartData } from '../types/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  type: 'line' | 'bar' | 'pie';
  data: ChartData;
  title: string;
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ type, data, title, height = 300 }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const ChartComponent = {
    line: Line,
    bar: Bar,
    pie: Pie,
  }[type];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg" style={{ height }}>
      <ChartComponent data={data} options={options} />
    </div>
  );
};

export default Chart;