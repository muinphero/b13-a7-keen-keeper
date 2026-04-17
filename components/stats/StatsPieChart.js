"use client";

import { useEffect, useRef, useState } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

export default function StatsPieChart({ data }) {
  const containerRef = useRef(null);
  const [chartSize, setChartSize] = useState(320);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateChartSize = (width) => {
      if (!width) return;
      const nextSize = Math.max(260, Math.min(Math.floor(width), 360));
      setChartSize((current) => (current === nextSize ? current : nextSize));
    };
    updateChartSize(containerRef.current.clientWidth);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      updateChartSize(entry?.contentRect?.width ?? 0);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex h-full min-h-[320px] w-full items-center justify-center">
      <PieChart width={chartSize} height={chartSize}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={62}
          outerRadius={92}
          paddingAngle={5}
          stroke="none"
          cx="50%"
          cy="50%"
        >
          {data.map((item) => (
            <Cell key={item.name} fill={item.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
