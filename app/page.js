"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import friendsData from "@/data/friends.json";

function statusClass(status) {
  if (status === "overdue") return "bg-red-500 text-white";
  if (status === "almost due") return "bg-amber-400 text-white";
  return "bg-emerald-700 text-white";
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 900);

    return () => clearTimeout(t);
  }, []);

  const summary = useMemo(() => {
    const total = friends.length;
    const onTrack = friends.filter((f) => f.status === "on-track").length;
    const needAttention = friends.filter((f) => f.status !== "on-track").length;
    const interactionsThisMonth = 12;
    return { total, onTrack, needAttention, interactionsThisMonth };
  }, [friends]);

  if (loading) {
    return (
      <section className="min-h-[55vh] flex flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#1f5a49]" />
        <p className="text-slate-500">Loading friends...</p>
      </section>
    );
  }

  return (
    <section>
      <div className="text-center pt-8">
        <h1 className="text-5xl font-extrabold text-slate-800">
          Friends to keep close in your life
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        <button className="btn mt-6 bg-[#1f5a49] text-white border-[#1f5a49] hover:bg-[#18483a]">
          <FiPlus />
          Add a Friend
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-4xl font-extrabold text-[#1f5a49]">
            {summary.total}
          </p>
          <p className="text-sm text-slate-500 mt-1">Total Friends</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-4xl font-extrabold text-[#1f5a49]">
            {summary.onTrack}
          </p>
          <p className="text-sm text-slate-500 mt-1">On Track</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-4xl font-extrabold text-[#1f5a49]">
            {summary.needAttention}
          </p>
          <p className="text-sm text-slate-500 mt-1">Need Attention</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-4xl font-extrabold text-[#1f5a49]">
            {summary.interactionsThisMonth}
          </p>
          <p className="text-sm text-slate-500 mt-1">Interactions This Month</p>
        </div>
      </div>

      <h2 className="mt-12 text-3xl font-extrabold text-slate-800">
        Your Friends
      </h2>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {friends.map((friend) => (
          <Link
            key={friend.id}
            href={`/friend/${friend.id}`}
            className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition"
          >
            <img
              src={friend.picture}
              alt={friend.name}
              className="h-14 w-14 rounded-full object-cover mx-auto"
            />

            <h3 className="mt-3 text-xl font-extrabold text-slate-700">
              {friend.name}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {friend.days_since_contact}d ago
            </p>

            <div className="mt-2 flex justify-center gap-1.5 flex-wrap">
              {friend.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusClass(friend.status)}`}
              >
                {friend.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
