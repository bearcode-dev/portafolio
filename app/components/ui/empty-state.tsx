import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-400 dark:text-gray-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-gradient-to-r from-brand-green to-brand-medium text-white rounded-lg hover:shadow-lg transition-all font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
