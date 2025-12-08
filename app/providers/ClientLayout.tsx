"use client"
import { ReactNode } from "react";
import { Footer } from "../components/Footer";

export function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
