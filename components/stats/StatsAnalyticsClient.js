"use client";

import dynamic from "next/dynamic";
import { useTimeline } from "@/context/TimelineContext";

const StatsPieChart = dynamic(() => import("@/components/stats/StatsPieChart"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center rounded-2xl bg-slate-50 text-sm text-slate-500">
      Preparing analytics chart...
    </div>
  ),
});

const COLORS = {
  text: "#7c3aed",
  call: "#1f5a49",
  video: "#3ca66b",
};

function buildChartData(entries) {
  const counts = {
    text: 0,
    call: 0,
    video: 0,
  };

  for (const entry of entries) {
    if (entry.type === "text") counts.text += 1;
    if (entry.type === "call") counts.call += 1;
    if (entry.type === "video") counts.video += 1;
  }

  return [
    { name: "Text", value: counts.text, color: COLORS.text },
    { name: "Call", value: counts.call, color: COLORS.call },
    { name: "Video", value: counts.video, color: COLORS.video },
  ];
}

export default function StatsAnalyticsClient() {
  const { entries } = useTimeline();
  const data = buildChartData(entries);

  const totalInteractions = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-800 sm:text-5xl">
          Friendship Analytics
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Track which channels you use most often so your follow-up habits stay balanced.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.map((item) => (
          <article key={item.name} className="surface-card p-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              {item.name}
            </p>
            <p className="mt-3 text-4xl font-extrabold" style={{ color: item.color }}>
              {item.value}
            </p>
          </article>
        ))}
      </div>

      <div className="surface-card p-6">
        <h2 className="text-2xl font-bold text-[#1f5a49]">By Interaction Type</h2>
        <p className="mt-2 text-sm text-slate-500">
          Total logged interactions:{" "}
          <span className="font-semibold text-slate-700">{totalInteractions}</span>
        </p>

        <div
          className="mt-4 h-[330px] min-w-0 overflow-hidden"
          aria-label="Pie chart of interaction types"
        >
          <StatsPieChart data={data} />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
