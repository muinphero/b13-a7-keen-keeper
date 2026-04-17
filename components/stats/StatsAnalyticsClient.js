"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useTimeline } from "@/context/TimelineContext";

const COLORS = {
  text: "#7c3aed",
  call: "#1f5a49",
  video: "#3ca66b",
};

export default function StatsAnalyticsClient() {
  const { entries } = useTimeline();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const counts = entries.reduce(
    (acc, entry) => {
      if (entry.type === "text") acc.text += 1;
      if (entry.type === "call") acc.call += 1;
      if (entry.type === "video") acc.video += 1;
      return acc;
    },
    { text: 0, call: 0, video: 0 }
  );

  const data = [
    { name: "Text", value: counts.text, color: COLORS.text },
    { name: "Call", value: counts.call, color: COLORS.call },
    { name: "Video", value: counts.video, color: COLORS.video },
  ];

  return (
    <section>
      <h1 className="text-5xl font-extrabold text-slate-800">Friendship Analytics</h1>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-[#1f5a49]">By Interaction Type</h2>

        <div className="mt-4 h-[330px]">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={5}
                  stroke="none"
                >
                  {data.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : null}
        </div>

        <div className="mt-1 flex items-center justify-center gap-8 text-sm text-slate-500">
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
