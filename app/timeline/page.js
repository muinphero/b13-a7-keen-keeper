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
      alt={type}
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
    <section>
      <h1 className="text-5xl font-extrabold text-slate-800">Timeline</h1>

      <div className="mt-5 max-w-xs">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered w-full bg-white"
        >
          <option value="all">Filter timeline</option>
          <option value="call">Call</option>
          <option value="text">Text</option>
          <option value="video">Video</option>
        </select>
      </div>

      <div className="mt-5 space-y-3">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="rounded-md border border-slate-200 bg-white p-4 flex items-center gap-3"
          >
            <IconByType type={item.type} />
            <div>
              <p className="font-semibold text-slate-700">{item.title}</p>
              <p className="text-sm text-slate-500">
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
    </section>
  );
}
