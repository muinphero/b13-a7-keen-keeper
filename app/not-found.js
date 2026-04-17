import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2 text-slate-600">Page not found.</p>
      <Link href="/" className="btn btn-primary mt-4">
        Back to Home
      </Link>
    </main>
  );
}
