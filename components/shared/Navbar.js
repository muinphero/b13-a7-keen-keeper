"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiClock, FiBarChart2 } from "react-icons/fi";

const links = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/timeline", label: "Timeline", icon: FiClock },
  { href: "/stats", label: "Stats", icon: FiBarChart2 },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-slate-800">
          KeenKeeper
        </Link>

        <nav className="flex items-center gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-md border text-sm font-medium transition ${
                  active
                    ? "bg-[#1f5a49] border-[#1f5a49] text-white"
                    : "border-transparent text-slate-500 hover:bg-slate-100 hover:border-slate-200"
                }`}
              >
                <Icon className="text-sm" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
