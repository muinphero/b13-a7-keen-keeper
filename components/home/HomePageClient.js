"use client";

import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { useTimeline } from "@/context/TimelineContext";

const SUMMARY_CARDS = [
  { key: "total", label: "Total Friends" },
  { key: "onTrack", label: "On Track" },
  { key: "needAttention", label: "Need Attention" },
  { key: "interactionsThisMonth", label: "Interactions This Month" },
];

function statusClass(status) {
  if (status === "overdue") return "bg-red-500 text-white";
  if (status === "almost due") return "bg-amber-400 text-white";
  return "bg-emerald-700 text-white";
}

export default function HomePageClient({ friends }) {
  const { entries } = useTimeline();

  const summary = useMemo(() => {
    const total = friends.length;
    const onTrack = friends.filter((f) => f.status === "on-track").length;
    const needAttention = friends.filter((f) => f.status !== "on-track").length;

    const now = new Date();
    const interactionsThisMonth = entries.filter((entry) => {
      const d = new Date(entry.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    return { total, onTrack, needAttention, interactionsThisMonth };
  }, [friends, entries]);

  return (
    <section className="space-y-10 lg:space-y-12">
      <div className="surface-card overflow-hidden px-6 py-10 text-center sm:px-10 lg:px-14 lg:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
          Friendship CRM
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-800 sm:text-5xl lg:text-6xl">
          Friends to keep close in your life
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        <button
          type="button"
          aria-label="Add a new friend"
          className="primary-button mt-8"
        >
          <FiPlus />
          Add a Friend
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SUMMARY_CARDS.map((card) => (
          <div key={card.key} className="surface-card p-6 text-center">
            <p className="text-4xl font-extrabold text-[#1f5a49]">
              {summary[card.key]}
            </p>
            <p className="mt-1 text-sm text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Your Friends</h2>
          <p className="mt-2 text-sm text-slate-500">
            Review who needs a quick check-in and jump straight into their profile.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {friends.map((friend) => (
          <Link
            key={friend.id}
            href={`/friend/${friend.id}`}
            aria-label={`Open details for ${friend.name}`}
            className="surface-card group p-5 text-center hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
          >
            <Image
              src={friend.picture}
              alt={`Profile photo of ${friend.name}`}
              width={56}
              height={56}
              sizes="56px"
              className="mx-auto h-14 w-14 rounded-full object-cover ring-4 ring-emerald-50"
            />

            <h3 className="mt-4 text-xl font-extrabold text-slate-700 group-hover:text-[#1f5a49]">
              {friend.name}
            </h3>
            <p className="mt-1 text-xs text-slate-500">{friend.days_since_contact}d ago</p>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {friend.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-3">
              <span className={`pill-badge ${statusClass(friend.status)}`}>
                {friend.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
