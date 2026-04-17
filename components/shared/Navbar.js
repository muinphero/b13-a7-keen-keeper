"use client";

import Image from "next/image";
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
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-col gap-4 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:py-2">
        <Link
          href="/"
          aria-label="Go to the KeenKeeper home page"
          className="inline-flex items-center"
        >
          <Image
            src="/assets/logo.png"
            alt="KeenKeeper logo"
            width={124}
            height={28}
            priority
            style={{ width: "124px", height: "28px" }}
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap items-center gap-2"
        >
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium ${
                  active
                    ? "border-[#1f5a49] bg-[#1f5a49] text-white shadow-sm"
                    : "border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-700"
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
