import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="surface-card max-w-md px-8 py-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">
          The page you&apos;re looking for isn&apos;t available anymore or never existed.
        </p>
        <Link href="/" className="primary-button mt-6">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
