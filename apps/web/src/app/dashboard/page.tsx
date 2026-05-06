"use client";

import { useState } from "react";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, Bell, MessageSquare, Trophy } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { dashboardMetrics, leaderboard } from "@/lib/data";

const attendanceData = [
  { name: "Mon", value: 92 },
  { name: "Tue", value: 84 },
  { name: "Wed", value: 90 },
  { name: "Thu", value: 87 },
  { name: "Fri", value: 91 },
  { name: "Sat", value: 78 }
];

export default function DashboardPage() {
  const [role, setRole] = useState<"student" | "coach" | "admin">("admin");
  const roleCopy = {
    student: "View personal schedule, payments, progress, coach messages, AI suggestions, leaderboard rank, and injury status.",
    coach: "Manage assigned students, attendance, reports, batch plans, announcements, and student chat.",
    admin: "Approve admissions, manage users/programs, track payments, view analytics, and operate the academy."
  };

  return (
    <main>
      <PageHero eyebrow="Dashboards" title="Three portals, one academy brain" copy={roleCopy[role]} />
      <section className="section-pad">
        <div className="container-wide">
          <div className="mb-6 inline-flex rounded-lg bg-slate-100 p-1 dark:bg-white/10">
            {(["student", "coach", "admin"] as const).map((item) => (
              <button key={item} onClick={() => setRole(item)} className={`rounded-md px-5 py-2 text-sm font-bold capitalize ${role === item ? "bg-navy text-white" : "text-muted dark:text-white/60"}`}>{item}</button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <div key={metric.label} className="panel p-5">
                <metric.icon className="text-orange" size={24} />
                <p className="mt-6 font-display text-4xl font-bold text-ink dark:text-white">{metric.value}</p>
                <p className="mt-1 text-sm font-bold text-muted dark:text-white/60">{metric.label}</p>
                <p className="mt-3 text-xs text-green">{metric.change}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
            <div className="panel p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold uppercase text-ink dark:text-white">Attendance trend</h2>
                <Activity className="text-orange" size={22} />
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#E8500A" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="panel p-6">
                <div className="mb-4 flex items-center gap-2"><Trophy className="text-orange" size={20} /><h2 className="font-display text-2xl font-bold uppercase">Leaderboard</h2></div>
                <div className="grid gap-3">
                  {leaderboard.map((student, index) => (
                    <div key={student.name} className="flex items-center justify-between rounded-md bg-slate-50 p-3 dark:bg-white/5">
                      <span className="font-bold">{index + 1}. {student.name}</span>
                      <span className="text-sm font-bold text-orange">{student.score}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel p-6">
                <div className="mb-4 flex items-center gap-2"><Bell className="text-orange" size={20} /><h2 className="font-display text-2xl font-bold uppercase">AI insights</h2></div>
                <p className="text-sm leading-6 text-muted dark:text-white/60">Increase sprint recovery by 8 minutes, reduce bowling load this week, and schedule mobility screening for two flagged students.</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-navy dark:text-white"><MessageSquare size={16} /> Coach chat ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
