import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Category, Report, User } from '../types/navigation';

interface SidebarProps {
  categories: Category[];
  user: User;
  onSelectReport: (report: Report) => void;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  user,
  onSelectReport,
  isOpen,
  onToggle,
  isMobile,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleReportSelect = (report: Report) => {
    onSelectReport(report);
    setActiveDropdown(null);
    if (isMobile) {
      onToggle();
    }
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    reports: category.reports.filter(report =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.reports.length > 0);

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-40
          ${isOpen ? 'w-64' : 'w-0'} lg:relative lg:top-0 lg:h-[calc(100vh-4rem)] ${isOpen ? 'lg:w-64' : 'lg:w-0'}`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b dark:border-gray-700">
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredCategories.map((category) => {
              const CategoryIcon = Icons[category.icon as keyof typeof Icons];
              const isActive = activeDropdown === category.id;

              return (
                <div key={category.id} className="relative">
                  <button
                    onClick={() => setActiveDropdown(isActive ? null : category.id)}
                    className={`w-full p-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <CategoryIcon className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="font-medium dark:text-white">{category.title}</span>
                    </div>
                    <Icons.ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isActive ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {isActive && (
                    <div className="absolute left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-b-lg z-10 border dark:border-gray-700">
                      {category.reports.map((report) => (
                        <button
                          key={report.id}
                          onClick={() => handleReportSelect(report)}
                          className="w-full p-3 flex items-center text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="pl-12 flex items-center">
                            {report.isFavorite && (
                              <Icons.Star className="w-4 h-4 text-yellow-500 mr-2 fill-current" />
                            )}
                            <span className="text-sm dark:text-gray-300">{report.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;