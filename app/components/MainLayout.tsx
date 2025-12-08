"use client"
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./header";
import BackgroundSpline from "./backgroundSpline";

interface MainLayoutProps {
  children: ReactNode;
  showBackground?: boolean;
  backgroundOpacity?: number;
  backgroundClassName?: string;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState("/");
  const [isDark, setIsDark] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    setActiveRoute(pathname);
    
    // Don't show header for dashboard routes
    setShowHeader(!pathname.startsWith('/dashboard'));
  }, [pathname]);

  // Detect current theme based on document class
  useEffect(() => {
    const updateTheme = () => {
      const isDarkTheme = document.documentElement.classList.contains('dark');
      setIsDark(isDarkTheme);
    };

    // Initial theme detection
    updateTheme();

    // Listen for theme changes using MutationObserver
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // If dashboard route, render children directly without header
  if (!showHeader) {
    return <>{children}</>;
  }

  return (
    <div className="overflow-hidden relative min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
      {/* Background Spline */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <BackgroundSpline />
      </div>

      {/* Header - Fixed position */}
      <div className="fixed top-0 right-0 left-0 z-50">
        <Header active={activeRoute} isDark={isDark} />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Add padding-top to account for fixed header */}
        <div className="pt-24 md:pt-32">
          {children}
        </div>
      </div>
    </div>
  );
}