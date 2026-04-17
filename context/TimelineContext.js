"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import seed from "@/data/timeline-seed.json";

const TimelineContext = createContext(null);
const STORAGE_KEY = "keenkeeper_timeline_entries";

function sortByDateDesc(entries) {
  return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function readStoredEntries() {
  if (typeof window === "undefined") {
    return sortByDateDesc(seed);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return sortByDateDesc(seed);

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? sortByDateDesc(parsed) : sortByDateDesc(seed);
  } catch {
    return sortByDateDesc(seed);
  }
}

function writeStoredEntries(entries) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Ignore storage write failures so the UI remains usable.
  }
}

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(() => sortByDateDesc(seed));
  const [isStorageReady, setIsStorageReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setEntries(readStoredEntries());
      setIsStorageReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isStorageReady) return;
    writeStoredEntries(entries);
  }, [entries, isStorageReady]);

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

    setEntries((prev) => sortByDateDesc([entry, ...prev]));

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
