"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FolderKanban,
  Briefcase,
  BookOpen,
  FolderTree,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  // Fetch all data for statistics
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: experiences = [] } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const res = await fetch('/api/experiences');
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: resources = [] } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const res = await fetch('/api/resources');
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['resource-categories'],
    queryFn: async () => {
      const res = await fetch('/api/resource-categories');
      if (!res.ok) return [];
      return res.json();
    },
  });

  // Stats cards configuration
  const stats = [
    {
      title: 'Projects',
      value: projects.length,
      description: 'Portfolio projects',
      icon: FolderKanban,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      href: '/admin/projects',
    },
    {
      title: 'Experiences',
      value: experiences.length,
      description: 'Work experiences',
      icon: Briefcase,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      href: '/admin/experiences',
    },
    {
      title: 'Resources',
      value: resources.length,
      description: 'Learning resources',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
      href: '/admin/resources',
    },
    {
      title: 'Categories',
      value: categories.length,
      description: 'Resource categories',
      icon: FolderTree,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      href: '/admin/categories',
    },
  ];

  // Calculate resource stats by type
  const resourcesByType = resources.reduce((acc: Record<string, number>, resource: any) => {
    acc[resource.type] = (acc[resource.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your portfolio content
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Overview */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Resources by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-green" />
              Resources by Type
            </CardTitle>
            <CardDescription>
              Distribution of resources across different types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(resourcesByType).length > 0 ? (
                Object.entries(resourcesByType).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {type}
                    </span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No resources yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-green" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <a
                    key={stat.href}
                    href={stat.href}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Icon className="w-6 h-6 text-brand-green" />
                    <span className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">
                      Manage {stat.title}
                    </span>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Admin Dashboard</CardTitle>
          <CardDescription>
            Manage your portfolio content from the sidebar navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Edit your profile information and welcome message</p>
            <p>• Add and manage your portfolio projects</p>
            <p>• Update your work experience and career history</p>
            <p>• Curate learning resources for visitors</p>
            <p>• Organize content with categories and tags</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
