import React, { useState } from 'react';
import { Moon, Sun, BarChart3, ChevronDown, Search, Star } from 'lucide-react';
import { Category, Report, User } from '../types/navigation';

interface LayoutProps {
  children: React.ReactNode;
  categories: Category[];
  user: User;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onSelectReport: (report: Report) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  categories,
  user,
  darkMode,
  onToggleDarkMode,
  onSelectReport,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleReportSelect = (report: Report) => {
    onSelectReport(report);
    setActiveDropdown(null);
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    reports: category.reports.filter(report =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.reports.length > 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-20">
        <div className="max-w-full px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold dark:text-white">BusinessIQ</span>
            </div>

            {/* Navigation Dropdowns */}
            <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
              <div className="relative">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              {filteredCategories.map((category) => (
                <div key={category.id} className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === category.id ? null : category.id)}
                    className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="dark:text-white">{category.title}</span>
                    <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${
                      activeDropdown === category.id ? 'transform rotate-180' : ''
                    }`} />
                  </button>
                  {activeDropdown === category.id && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-2">
                      {category.reports.map((report) => (
                        <button
                          key={report.id}
                          onClick={() => handleReportSelect(report)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                        >
                          {report.isFavorite && (
                            <Star className="w-4 h-4 text-yellow-500 mr-2 fill-current" />
                          )}
                          <span className="text-sm dark:text-gray-300">{report.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side - User & Dark Mode */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex items-center space-x-3 pr-4 border-r dark:border-gray-700">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={onToggleDarkMode}
                  className="ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Sun className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <Moon className="h-6 w-6 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;