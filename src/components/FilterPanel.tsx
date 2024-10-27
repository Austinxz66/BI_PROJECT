import React from 'react';
import { FilterState } from '../types/dashboard';
import { Calendar, Globe2, Building2, Package } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-6 dark:text-white">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange({ dateRange: e.target.value })}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ytd">Year to Date</option>
            <option value="last12m">Last 12 Months</option>
            <option value="last6m">Last 6 Months</option>
            <option value="last3m">Last 3 Months</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Globe2 className="w-4 h-4 mr-2" />
            Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => onFilterChange({ region: e.target.value })}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Regions</option>
            <option value="na">North America</option>
            <option value="eu">Europe</option>
            <option value="asia">Asia Pacific</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Building2 className="w-4 h-4 mr-2" />
            Department
          </label>
          <select
            value={filters.department}
            onChange={(e) => onFilterChange({ department: e.target.value })}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="rd">R&D</option>
            <option value="ops">Operations</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Package className="w-4 h-4 mr-2" />
            Product Category
          </label>
          <select
            value={filters.product}
            onChange={(e) => onFilterChange({ product: e.target.value })}
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Products</option>
            <option value="software">Software</option>
            <option value="hardware">Hardware</option>
            <option value="services">Services</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;