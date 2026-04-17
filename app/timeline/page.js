"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTimeline } from "@/context/TimelineContext";

const ICON_MAP = {
  call: "/assets/call.png",
  text: "/assets/text.png",
  video: "/assets/video.png",
};

function IconByType({ type }) {
  const icon = ICON_MAP[type] || ICON_MAP.text;
  return (
    <Image
      src={icon}
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      className="h-5 w-5 object-contain"
    />
  );
}

export default function TimelinePage() {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return entries;
    return entries.filter((e) => e.type === filter);
  }, [entries, filter]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 sm:text-5xl">Timeline</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Review your latest check-ins and filter the activity feed by interaction type.
          </p>
        </div>
      </div>

      <div className="max-w-sm">
        <label
          htmlFor="timeline-filter"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Filter interactions
        </label>
        <select
          id="timeline-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter interactions by type"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-emerald-600"
        >
          <option value="all">All interactions</option>
          <option value="call">Call</option>
          <option value="text">Text</option>
          <option value="video">Video</option>
        </select>
      </div>

      {filtered.length ? (
        <div className="space-y-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="surface-card flex items-center gap-4 p-4 sm:p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50">
                <IconByType type={item.type} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-700">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="surface-card p-8 text-center">
          <p className="text-lg font-semibold text-slate-700">No interactions match this filter.</p>
          <p className="mt-2 text-sm text-slate-500">
            Try a different interaction type or log a new check-in from a friend profile.
          </p>
        </div>
      )}
    </section>
  );
}
