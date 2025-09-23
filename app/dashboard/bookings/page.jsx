"use client";

import { getAllBookings } from "../../../lib/apis/bookingsApi";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Dummy rows – replace with your API data
const SEED = [
  {
    id: "b1",
    userName: "Mariam Hassan",
    phone: "+20 100 555 1234",
    email: "mariam@example.com",
    tripName: "Island Escape",
    adults: 2,
    children: 1,
    transfer: "Yes",
    bookedAt: "2025-07-01",
  },
  {
    id: "b2",
    userName: "Omar N.",
    phone: "+20 111 331 8989",
    email: "omar@example.com",
    tripName: "Mountain Trek",
    adults: 1,
    children: 0,
    transfer: "No",
    bookedAt: "2025-06-28",
  },
  {
    id: "b3",
    userName: "Laila Farouk",
    phone: "+20 122 444 9090",
    email: "laila@example.com",
    tripName: "Island Escape",
    adults: 4,
    children: 2,
    transfer: "Yes",
    bookedAt: "2025-06-21",
  },
  {
    id: "b4",
    userName: "Youssef Adel",
    phone: "+20 151 000 2222",
    email: "youssef@example.com",
    tripName: "City Lights",
    adults: 3,
    children: 0,
    transfer: "No",
    bookedAt: "2025-06-18",
  },
  {
    id: "b5",
    userName: "Nour Samir",
    phone: "+20 109 777 4321",
    email: "nour@example.com",
    tripName: "Desert Safari",
    adults: 2,
    children: 2,
    transfer: "Yes",
    bookedAt: "2025-06-15",
  },
  {
    id: "b6",
    userName: "Karim M.",
    phone: "+20 102 808 7788",
    email: "karim@example.com",
    tripName: "Island Escape",
    adults: 2,
    children: 0,
    transfer: "No",
    bookedAt: "2025-06-12",
  },
];

export default function BookingsPage() {
  const [q, setQ] = useState("");
  const [searchField, setSearchField] = useState("name"); // name | phone | email
  const [transferFilter, setTransferFilter] = useState("all"); // all | yes | no
  const [sort, setSort] = useState("recent"); // recent | oldest | nameAsc | nameDesc
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // const filtered = useMemo(() => {
  //   let rows = [...bookings];

  //   // Search
  //   if (q.trim()) {
  //     const needle = q.toLowerCase();
  //     rows = rows.filter((r) => {
  //       const map = {
  //         name: r.userName,
  //         phone: r.phone,
  //         email: r.email,
  //       };
  //       return (map[searchField] || "").toLowerCase().includes(needle);
  //     });
  //   }

  //   // Transfer filter
  //   if (transferFilter !== "all") {
  //     rows = rows.filter((r) =>
  //       transferFilter === "yes" ? r.transfer === "Yes" : r.transfer === "No"
  //     );
  //   }

  //   // Sort
  //   rows.sort((a, b) => {
  //     switch (sort) {
  //       case "recent":
  //         return new Date(b.bookedAt) - new Date(a.bookedAt);
  //       case "oldest":
  //         return new Date(a.bookedAt) - new Date(b.bookedAt);
  //       case "nameAsc":
  //         return a.userName.localeCompare(b.userName);
  //       case "nameDesc":
  //         return b.userName.localeCompare(a.userName);
  //       default:
  //         return 0;
  //     }
  //   });

  //   return rows;
  // }, [q, searchField, transferFilter, sort]);
  // console.log(filtered)
  // const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  // const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const resetToFirst = () => setPage(1);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200">
      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-lg font-semibold tracking-wide">TOTAL BOOKINGS</h1>

        {/* Controls */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  resetToFirst();
                }}
                placeholder={`search by ${searchField}`}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-10 py-2 text-sm placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-700"
              />
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 fill-neutral-500"
              >
                <path d="M10 2a8 8 0 105.3 14.1l4.3 4.3 1.4-1.4-4.3-4.3A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
              </svg>
            </div>
            <div className="shrink-0">
              <select
                value={searchField}
                onChange={(e) => {
                  setSearchField(e.target.value);
                  resetToFirst();
                }}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-xs text-neutral-300 focus:ring-2 focus:ring-neutral-700"
              >
                <option value="name">nname</option>
                <option value="phone">phone</option>
                <option value="email">email</option>
              </select>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-neutral-400">
              filter
            </span>
            <select
              value={transferFilter}
              onChange={(e) => {
                setTransferFilter(e.target.value);
                resetToFirst();
              }}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
            >
              <option value="all">Transfer: All</option>
              <option value="yes">Transfer: Yes</option>
              <option value="no">Transfer: No</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-neutral-400">
              sort
            </span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                resetToFirst();
              }}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
            >
              <option value="recent">Most recent</option>
              <option value="oldest">Oldest</option>
              <option value="nameAsc">Name A → Z</option>
              <option value="nameDesc">Name Z → A</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/40">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-900/50 text-neutral-400">
                <tr>
                  <Th>User name</Th>
                  <Th>phone</Th>
                  <Th>email</Th>
                  <Th>Trip name</Th>
                  <Th>Adult num</Th>
                  <Th>Child num</Th>
                  <Th>transfer</Th>
                  <Th>Trip date</Th>
                  <Th>Booking date</Th>
                </tr>
              </thead>
              {/* <tbody>
                {bookings?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-6 text-center text-neutral-400"
                    >
                      No results.
                    </td>
                  </tr>
                ) : (
                  bookings?.map((r) => (
                    <tr
                      key={r._id}
                      className="border-t border-neutral-800 hover:bg-neutral-900/40"
                    >
                      <Td>{r.user.firstName}</Td>
                      <Td className="whitespace-nowrap">{r.user.phone}</Td>
                      <Td className="truncate max-w-[220px]">{r.user.email}</Td>
                      <Td>{r?.tripInfo?.name}</Td>
                      <Td>{r.adult}</Td>
                      <Td>{r.child}</Td>
                      <Td>
                        <span
                          className={[
                            "inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-medium",
                            r.transportation == true
                              ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-emerald-700/40"
                              : "bg-neutral-700/30 text-neutral-300 ring-1 ring-neutral-700/50",
                          ].join(" ")}
                        >
                          {r.transportation ? "Yes" : "No"}
                        </span>
                        {r.transportation}
                      </Td>
                      <Td className="whitespace-nowrap">
                        {new Date(r.bookingDate).toLocaleDateString()}
                      </Td>
                      <Td className="whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </Td>
                    </tr>
                  ))
                )}
              </tbody> */}
            </table>
          </div>
        </div>

        {/* Pagination */}
        {/* <div className="mt-6 flex items-center justify-center gap-2">
          <PageBtn >
            Prev
          </PageBtn>

          <button
            onClick={() => setPage(n)}
            className={["h-9 min-w-9 rounded-xl px-3 text-sm"]}
          ></button>

          <PageBtn
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </PageBtn>
        </div> */}
      </main>
    </div>
  );
}

/* ---------- Small presentational helpers ---------- */

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-4 align-middle ${className}`}>{children}</td>;
}
function PageBtn({ children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "h-9 rounded-xl px-3 text-sm",
        disabled
          ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
          : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
