"use client";

import { useEffect } from "react";

export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="surface-card max-w-lg px-8 py-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900">
          We couldn&apos;t load this page
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Try again to recover the route. If the problem keeps happening, check the
          console or server logs for the matching error digest.
        </p>
        {error?.digest ? (
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Digest: {error.digest}
          </p>
        ) : null}
        <button type="button" onClick={() => unstable_retry()} className="primary-button mt-6">
          Try Again
        </button>
      </div>
    </main>
  );
}
