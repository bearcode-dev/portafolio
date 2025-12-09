import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Icon className="w-8 h-8 text-brand-green" />
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
