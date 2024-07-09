"use client";

import Link from "next/link";
import { ModeToggle } from "../modeToggle";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b-2 border-slate-200 dark:border-slate-600 ">
            <div className="w-full mx-auto px-4 py-4 flex items-center justify-between">
                <div><Link href="/">Home</Link></div>
                <div className="flex justify-between items-center gap-10">
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}