"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import seed from "@/data/timeline-seed.json";

const TimelineContext = createContext(null);
const STORAGE_KEY = "keenkeeper_timeline_entries";

function sortByDateDesc(entries) {
  return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      setEntries(sortByDateDesc(JSON.parse(raw)));
    } else {
      const initial = sortByDateDesc(seed);
      setEntries(initial);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    }
  }, []);

  const addInteraction = ({ type, friendId, friendName }) => {
    const now = new Date();
    const entry = {
      id: `${type}-${friendId}-${now.getTime()}`,
      friendId,
      friendName,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} with ${friendName}`,
      date: now.toISOString(),
    };

    setEntries((prev) => {
      const updated = sortByDateDesc([entry, ...prev]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    toast.success(`${type} logged for ${friendName}`);
  };

  const value = useMemo(() => ({ entries, addInteraction }), [entries]);

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error("useTimeline must be used inside TimelineProvider");
  return ctx;
}
