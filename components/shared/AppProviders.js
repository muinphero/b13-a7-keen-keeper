"use client";

import { TimelineProvider } from "@/context/TimelineContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppProviders({ children }) {
  return (
    <TimelineProvider>
      {children}
      <ToastContainer position="top-right" autoClose={1800} />
    </TimelineProvider>
  );
}
