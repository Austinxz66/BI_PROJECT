import { Category, User } from '../types/navigation';

export const mockUser: User = {
  id: '1',
  role: 'admin',
  name: 'John Doe',
};

export const mockCategories: Category[] = [
  {
    id: '1',
    title: 'Sales Reports',
    icon: 'DollarSign',
    reports: [
      {
        id: '1-1',
        title: 'Monthly Sales Overview',
        path: '/sales/monthly',
        isFavorite: true,
      },
      {
        id: '1-2',
        title: 'Product Performance',
        path: '/sales/products',
      },
      {
        id: '1-3',
        title: 'Regional Analysis',
        path: '/sales/regional',
      },
    ],
  },
  {
    id: '2',
    title: 'Financial Reports',
    icon: 'PieChart',
    reports: [
      {
        id: '2-1',
        title: 'Revenue Analysis',
        path: '/financial/revenue',
        isFavorite: true,
      },
      {
        id: '2-2',
        title: 'Expense Tracking',
        path: '/financial/expenses',
      },
    ],
  },
  {
    id: '3',
    title: 'Operations',
    icon: 'Settings',
    reports: [
      {
        id: '3-1',
        title: 'Efficiency Metrics',
        path: '/operations/efficiency',
      },
      {
        id: '3-2',
        title: 'Resource Utilization',
        path: '/operations/resources',
      },
    ],
  },
];