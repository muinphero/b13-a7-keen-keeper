"use client";

import { useTimeline } from "@/context/TimelineContext";

import {
  FiClock,
  FiInbox,
  FiTrash2,
  FiPhoneCall,
  FiMessageSquare,
  FiVideo,
  FiEdit2,
} from "react-icons/fi";

function statusBadge(status) {
  if (status === "overdue") return "bg-red-500 text-white";
  if (status === "almost due") return "bg-amber-400 text-white";
  return "bg-emerald-700 text-white";
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FriendDetailsView({ friend }) {
  const { addInteraction } = useTimeline();

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <aside className="space-y-3 lg:col-span-4">
        <article className="rounded-lg border border-slate-200 bg-white p-6 text-center">
          <img
            src={friend.picture}
            alt={friend.name}
            className="mx-auto h-20 w-20 rounded-full object-cover"
          />

          <h1 className="mt-4 text-[28px] font-extrabold leading-none text-slate-800">
            {friend.name}
          </h1>

          <div className="mt-3">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusBadge(friend.status)}`}
            >
              {friend.status}
            </span>
          </div>

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

          <p className="mt-5 text-[16px] font-semibold italic text-slate-500">
            "{friend.bio}"
          </p>
          <p className="mt-2 text-[15px] text-slate-500">
            Preferred: <span className="font-semibold">email</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">{friend.email}</p>
        </article>

        <button className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700">
          <FiClock className="text-[16px]" />
          Snooze 2 Weeks
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700">
          <FiInbox className="text-[16px]" />
          Archive
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-md border border-red-100 bg-white px-4 py-2.5 text-[14px] font-semibold text-red-500">
          <FiTrash2 className="text-[16px]" />
          Delete
        </button>
      </aside>

      <div className="space-y-4 lg:col-span-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <article className="rounded-lg border border-slate-200 bg-white px-6 py-7 text-center">
            <p className="text-[32px] font-extrabold leading-none text-[#1f5a49]">
              {friend.days_since_contact}
            </p>
            <p className="mt-2 text-[16px] text-slate-500">
              Days Since Contact
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white px-6 py-7 text-center">
            <p className="text-[32px] font-extrabold leading-none text-[#1f5a49]">
              {friend.goal}
            </p>
            <p className="mt-2 text-[16px] text-slate-500">Goal (Days)</p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white px-6 py-7 text-center">
            <p className="text-[32px] font-extrabold leading-none text-[#1f5a49]">
              {formatDate(friend.next_due_date)}
            </p>
            <p className="mt-2 text-[16px] text-slate-500">Next Due</p>
          </article>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[24px] font-extrabold leading-none text-[#1f5a49]">
                Relationship Goal
              </h2>
              <p className="mt-3 text-[18px] leading-none text-slate-500">
                Connect every{" "}
                <span className="font-extrabold text-slate-700">
                  {friend.goal} days
                </span>
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500">
              <FiEdit2 />
              Edit
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-[24px] font-extrabold leading-none text-[#1f5a49]">
            Quick Check-In
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              onClick={() =>
                addInteraction({
                  type: "call",
                  friendId: friend.id,
                  friendName: friend.name,
                })
              }
              className="rounded-lg border border-slate-200 bg-[#edf0f4] px-8 py-5 text-center"
            >
              <FiPhoneCall className="mx-auto text-[30px] text-slate-700" />
              <span className="mt-1 block text-[14px] text-slate-700">
                Call
              </span>
            </button>
            <button
              onClick={() =>
                addInteraction({
                  type: "text",
                  friendId: friend.id,
                  friendName: friend.name,
                })
              }
              className="rounded-lg border border-slate-200 bg-[#edf0f4] px-8 py-5 text-center"
            >
              <FiMessageSquare className="mx-auto text-[30px] text-slate-700" />
              <span className="mt-1 block text-[14px] text-slate-700">
                Text
              </span>
            </button>
            <button
              onClick={() =>
                addInteraction({
                  type: "video",
                  friendId: friend.id,
                  friendName: friend.name,
                })
              }
              className="rounded-lg border border-slate-200 bg-[#edf0f4] px-8 py-5 text-center"
            >
              <FiVideo className="mx-auto text-[30px] text-slate-700" />
              <span className="mt-1 block text-[14px] text-slate-700">
                Video
              </span>
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
