"use client";

import Image from "next/image";
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
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <aside className="space-y-3 xl:col-span-4">
        <article className="surface-card p-6 text-center sm:p-8">
          <Image
            src={friend.picture}
            alt={`Profile photo of ${friend.name}`}
            width={80}
            height={80}
            sizes="80px"
            className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-emerald-50"
          />

          <h1 className="mt-4 text-[28px] font-extrabold leading-none text-slate-800">
            {friend.name}
          </h1>

          <div className="mt-3">
            <span className={`pill-badge ${statusBadge(friend.status)}`}>
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
            &ldquo;{friend.bio}&rdquo;
          </p>
          <p className="mt-2 text-[15px] text-slate-500">
            Preferred: <span className="font-semibold">email</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">{friend.email}</p>
        </article>

        <button
          type="button"
          aria-label={`Snooze reminders for ${friend.name} by 2 weeks`}
          className="secondary-button w-full"
        >
          <FiClock className="text-[16px]" />
          Snooze 2 Weeks
        </button>
        <button
          type="button"
          aria-label={`Archive ${friend.name}`}
          className="secondary-button w-full"
        >
          <FiInbox className="text-[16px]" />
          Archive
        </button>
        <button
          type="button"
          aria-label={`Delete ${friend.name}`}
          className="danger-button w-full"
        >
          <FiTrash2 className="text-[16px]" />
          Delete
        </button>
      </aside>

      <div className="space-y-4 xl:col-span-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <article className="surface-card px-6 py-7 text-center">
            <p className="text-[32px] font-extrabold leading-none text-[#1f5a49]">
              {friend.days_since_contact}
            </p>
            <p className="mt-2 text-[16px] text-slate-500">Days Since Contact</p>
          </article>

          <article className="surface-card px-6 py-7 text-center">
            <p className="text-[32px] font-extrabold leading-none text-[#1f5a49]">
              {friend.goal}
            </p>
            <p className="mt-2 text-[16px] text-slate-500">Goal (Days)</p>
          </article>

          <article className="surface-card px-6 py-7 text-center">
            <p className="text-[32px] font-extrabold leading-none text-[#1f5a49]">
              {formatDate(friend.next_due_date)}
            </p>
            <p className="mt-2 text-[16px] text-slate-500">Next Due</p>
          </article>
        </section>

        <section className="surface-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
            <button
              type="button"
              aria-label={`Edit the relationship goal for ${friend.name}`}
              className="secondary-button shrink-0"
            >
              <FiEdit2 />
              Edit
            </button>
          </div>
        </section>

        <section className="surface-card p-6">
          <h2 className="text-[24px] font-extrabold leading-none text-[#1f5a49]">
            Quick Check-In
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() =>
                addInteraction({
                  type: "call",
                  friendId: friend.id,
                  friendName: friend.name,
                })
              }
              aria-label={`Log a call with ${friend.name}`}
              className="rounded-2xl border border-slate-200 bg-[#edf0f4] px-8 py-5 text-center shadow-sm hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50"
            >
              <FiPhoneCall className="mx-auto text-[30px] text-slate-700" />
              <span className="mt-1 block text-[14px] text-slate-700">Call</span>
            </button>
            <button
              type="button"
              onClick={() =>
                addInteraction({
                  type: "text",
                  friendId: friend.id,
                  friendName: friend.name,
                })
              }
              aria-label={`Log a text with ${friend.name}`}
              className="rounded-2xl border border-slate-200 bg-[#edf0f4] px-8 py-5 text-center shadow-sm hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50"
            >
              <FiMessageSquare className="mx-auto text-[30px] text-slate-700" />
              <span className="mt-1 block text-[14px] text-slate-700">Text</span>
            </button>
            <button
              type="button"
              onClick={() =>
                addInteraction({
                  type: "video",
                  friendId: friend.id,
                  friendName: friend.name,
                })
              }
              aria-label={`Log a video call with ${friend.name}`}
              className="rounded-2xl border border-slate-200 bg-[#edf0f4] px-8 py-5 text-center shadow-sm hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50"
            >
              <FiVideo className="mx-auto text-[30px] text-slate-700" />
              <span className="mt-1 block text-[14px] text-slate-700">Video</span>
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
