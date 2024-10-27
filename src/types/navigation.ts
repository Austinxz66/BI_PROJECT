export interface Report {
  id: string;
  title: string;
  path: string;
  icon?: string;
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  reports: Report[];
  isExpanded?: boolean;
}

export interface User {
  id: string;
  role: 'admin' | 'manager' | 'employee';
  name: string;
}

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
} as const;