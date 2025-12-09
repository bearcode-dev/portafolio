"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderKanban,
  BookOpen,
  FolderTree,
  Lightbulb,
  X,
  Home
} from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Statistics'
  },
  {
    href: '/admin/profile',
    label: 'Profile',
    icon: User,
    description: 'Edit your information'
  },
  {
    href: '/admin/projects',
    label: 'Projects',
    icon: FolderKanban,
    description: 'Manage portfolio projects'
  },
  {
    href: '/admin/experiences',
    label: 'Experiences',
    icon: Briefcase,
    description: 'Work history'
  },
  {
    href: '/admin/resources',
    label: 'Resources',
    icon: BookOpen,
    description: 'Learning resources'
  },
  {
    href: '/admin/categories',
    label: 'Categories',
    icon: FolderTree,
    description: 'Resource categories'
  },
  {
    href: '/admin/skill-categories',
    label: 'Skill Categories',
    icon: FolderTree,
    description: 'Organize skills'
  },
  {
    href: '/admin/skills',
    label: 'Skills',
    icon: Lightbulb,
    description: 'Technical skills'
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar - Fixed */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col z-40">
        <SidebarContent pathname={pathname} onClose={onClose} showCloseButton={false} />
      </aside>

      {/* Mobile Sidebar - Drawer */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:hidden fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-40"
      >
        <SidebarContent pathname={pathname} onClose={onClose} showCloseButton={true} />
      </motion.aside>
    </>
  );
};

const SidebarContent: React.FC<{ pathname: string; onClose: () => void; showCloseButton: boolean }> = ({
  pathname,
  onClose,
  showCloseButton
}) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-green to-brand-medium flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-green transition-colors">
              Admin
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Portfolio CMS</p>
          </div>
        </Link>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => showCloseButton && onClose()}
                className={clsx(
                  'flex items-start gap-3 px-3 py-3 rounded-xl transition-all group',
                  isActive
                    ? 'bg-gradient-to-r from-brand-green/10 to-brand-medium/10 text-brand-green dark:text-brand-green'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                )}
              >
                <div className={clsx(
                  'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all',
                  isActive
                    ? 'bg-gradient-to-br from-brand-green to-brand-medium text-white shadow-lg shadow-brand-green/30'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-brand-green/10 group-hover:text-brand-green'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={clsx(
                    'text-sm font-semibold',
                    isActive ? 'text-brand-green' : 'text-gray-900 dark:text-white group-hover:text-brand-green'
                  )}>
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-green transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>
    </>
  );
};

export default AdminSidebar;
