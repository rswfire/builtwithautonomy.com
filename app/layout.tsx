// app/layout.tsx
import type { Metadata } from "next";
import { SiteNavigation } from "@/components/SiteNavigation";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const openSans = Open_Sans({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Built with Autonomy",
        template: "%s | Built with Autonomy",
    },
    description: "Built with Autonomy.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
        <body className={openSans.className}>
        <div className="flex min-h-screen">
            <SiteNavigation />

            <div className="flex-1 flex flex-col">
                <main className="site-main flex-1">
                    {children}
                </main>

                <footer className="mt-24 border-t border-zinc-200 bg-zinc-50">
                    <div className="mx-auto max-w-6xl px-6 py-12">
                        <p className="text-sm text-zinc-600">
                            Built with Autonomy
                        </p>
                    </div>
                </footer>
            </div>
        </div>
        </body>
        </html>
    );
}
