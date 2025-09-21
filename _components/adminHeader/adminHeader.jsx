"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminHeader = () => {
  const pathname = usePathname();

  const tabs = [
    { label: "Control Trips", path: "/dashboard/controlTrips" },
    { label: "Advanced Infos", path: "/dashboard/advancedInfos" },
    { label: "Bookings", path: "/dashboard/bookings" },
    { label: "Users", path: "/dashboard/users" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full grid place-items-center border border-zinc-700 bg-zinc-900">
            ⚙️
          </div>
          <div className="text-xs leading-tight text-zinc-300">
            <div className="font-semibold">Admin</div>
            <div className="text-zinc-500">Name</div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path; // if the current pathname === tab.path 
            return (
              <Link key={tab.label} href={tab.path}>
                <button
                  className={`cursor-pointer px-3 py-1.5 rounded-lg border text-sm transition-colors whitespace-nowrap ${
                    isActive
                      ? "border-orange-700 bg-orange-900/40 text-orange-200"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900" //change the color
                  }`}
                >
                  {tab.label}
                </button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
