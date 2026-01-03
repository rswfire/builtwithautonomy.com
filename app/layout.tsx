// app/layout.tsx
import type { Metadata } from "next";
import { SiteNavigation } from "@/components/SiteNavigation";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import Icon from "@/components/Icon";

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
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                            {/* Left side - Philosophy */}
                            <div className="flex-1 max-w-md">
                                <h3 className="text-sm font-semibold text-zinc-900 mb-3 tracking-widest">CORE PRINCIPLES</h3>
                                <ul className="space-y-2 text-sm text-zinc-600">
                                    <li><strong>Reality has structure.</strong><br/>Patterns are real and detectable.</li>
                                    <li><strong>Cognition has architecture.</strong><br/>Coherent thinking follows traceable logic.</li>
                                    <li><strong>Systems can fragment or preserve.</strong><br/>Most platforms fragment. Autonomy preserves.</li>
                                    <li><strong>Sovereignty matters.</strong><br/>You should own your data, your patterns, your truth.</li>
                                    <li><strong>Epistemic honesty is non-negotiable.</strong><br/>Systems that reframe your reality are abusive,<br/>even when they claim to help.</li>
                                </ul>
                            </div>

                            {/* Right side - Links & Attribution */}
                            <div className="flex flex-col items-start md:items-end justify-end gap-4 self-end">
                                <div className="flex flex-col gap-2 text-sm items-start md:items-end">
                                    <p className="text-zinc-600">
                                        Created by <Link href="https://rswfire.com/handshake" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Robert Samuel White</Link>
                                    </p>
                                    <div className="flex gap-4 text-zinc-600">
                                        <Link href="https://github.com/rswfire/builtwithautonomy.com/blob/main/docs/myth.md" className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">Myth</Link>
                                        <Link href="https://github.com/rswfire/builtwithautonomy.com/blob/main/docs/roadmap.md" className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">Roadmap</Link>
                                        <Link href="https://github.com/rswfire/builtwithautonomy.com/blob/main/docs/setup.md" className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">Setup</Link>
                                        <Link href="https://github.com/rswfire/builtwithautonomy.com" className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">GitHub</Link>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex gap-2 justify-end mb-2">
                                        <Icon name="Flame" size={24} className="text-red-600" />
                                        <Icon name="Droplets" size={24} className="text-blue-900" />
                                    </div>
                                    <p className="text-xs text-zinc-500">Built with Autonomy. Built for truth. Built to remain.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        </body>
        </html>
    );
}
