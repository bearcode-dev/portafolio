"use client"
import { ReactNode } from "react";
import MainLayout from "../components/MainLayout";

interface PageWrapperProps {
  children: ReactNode;
  showBackground?: boolean;
  backgroundOpacity?: number;
  backgroundClassName?: string;
}

export default function PageWrapper({ 
  children, 
  showBackground = true, 
  backgroundOpacity = 0.2,
  backgroundClassName = ""
}: PageWrapperProps) {
  return (
    <MainLayout 
      showBackground={showBackground}
      backgroundOpacity={backgroundOpacity}
      backgroundClassName={backgroundClassName}
    >
      {children}
    </MainLayout>
  );
}