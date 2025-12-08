import Link from 'next/link';
import React from 'react'
import DashBoardSidebar from './(components)/DashBoardSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashBoardSidebar/>  
       
        <main className="content">
          {children}
        </main>
      </div>
    );
  }