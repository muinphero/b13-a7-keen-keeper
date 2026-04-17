import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { href: "#", label: "Instagram", icon: "/assets/instagram.png" },
  { href: "#", label: "Facebook", icon: "/assets/facebook.png" },
  { href: "#", label: "Twitter", icon: "/assets/twitter.png" },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#1f5a49] px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">KeenKeeper</h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-emerald-100">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        <p className="mt-8 text-2xl font-semibold sm:text-3xl">Social Links</p>

        <div className="mt-4 flex items-center justify-center gap-3">
          {socialLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-label={`Visit ${item.label}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm hover:-translate-y-0.5 hover:scale-105"
            >
              <Image
                src={item.icon}
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
            </Link>
          ))}
        </div>

        <div className="mt-12 h-px w-full bg-emerald-700/70" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-emerald-200 md:flex-row">
          <p>(c) 2026 KeenKeeper. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="hover:text-white">Privacy Policy</span>
            <span className="hover:text-white">Terms of Service</span>
            <span className="hover:text-white">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
