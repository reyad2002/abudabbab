"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";

// Example data — swap with your API call
const USERS = [
  {
    id: "u1",
    first: "Mariam",
    last: "Hassan",
    email: "mariam@example.com",
    phone: "+20 100 555 1234",
    role: "admin",
    createdAt: "2025-06-30",
  },
  {
    id: "u2",
    first: "Omar",
    last: "Nabil",
    email: "omar@example.com",
    phone: "+20 111 331 8989",
    role: "user",
    createdAt: "2025-06-28",
  },
  {
    id: "u3",
    first: "Laila",
    last: "Farouk",
    email: "laila@example.com",
    phone: "+20 122 444 9090",
    role: "user",
    createdAt: "2025-06-21",
  },
  {
    id: "u4",
    first: "Youssef",
    last: "Adel",
    email: "youssef@example.com",
    phone: "+20 151 000 2222",
    role: "manager",
    createdAt: "2025-06-18",
  },
  {
    id: "u5",
    first: "Nour",
    last: "Samir",
    email: "nour@example.com",
    phone: "+20 109 777 4321",
    role: "user",
    createdAt: "2025-06-15",
  },
  {
    id: "u6",
    first: "Karim",
    last: "Mostafa",
    email: "karim@example.com",
    phone: "+20 102 808 7788",
    role: "user",
    createdAt: "2025-06-12",
  },
];

export default function UsersPage() {
  const [q, setQ] = useState("");
  const [searchField, setSearchField] = useState("name"); // name | phone | email
  const [roleFilter, setRoleFilter] = useState("all"); // all | admin | manager | user
  const [sort, setSort] = useState("recent"); // recent | oldest | nameAsc | nameDesc
  const [page, setPage] = useState(1);
  const pageSize = 5;
 
  const [allUsers, setallUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://abudabbba-backend.vercel.app/api/bookings/admin"
      );
      setallUsers(response.data.bookings); // Save the data to state
    };
    fetchUsers();
  }, []);
  const filtered = useMemo(() => {
    let rows = [...USERS];

    // search
    if (q.trim()) {
      const needle = q.toLowerCase();
      rows = rows.filter((r) => {
        if (searchField === "name") {
          return `${r.first} ${r.last}`.toLowerCase().includes(needle);
        }
        if (searchField === "phone")
          return r.phone.toLowerCase().includes(needle);
        if (searchField === "email")
          return r.email.toLowerCase().includes(needle);
        return true;
      });
    }

    // filter by role
    if (roleFilter !== "all") rows = rows.filter((r) => r.role === roleFilter);

    // sort
    rows.sort((a, b) => {
      switch (sort) {
        case "recent":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "nameAsc":
          return `${a.first} ${a.last}`.localeCompare(`${b.first} ${b.last}`);
        case "nameDesc":
          return `${b.first} ${b.last}`.localeCompare(`${a.first} ${a.last}`);
        default:
          return 0;
      }
    });

    return rows;
  }, [q, searchField, roleFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const resetPage = () => setPage(1);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200">


      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-lg font-semibold tracking-wide">ALL USERS</h1>

        {/* Controls */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  resetPage();
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
            <select
              value={searchField}
              onChange={(e) => {
                setSearchField(e.target.value);
                resetPage();
              }}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-xs text-neutral-300 focus:ring-2 focus:ring-neutral-700"
            >
              <option value="name">name</option>
              <option value="phone">phone</option>
              <option value="email">email</option>
            </select>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-neutral-400">
              filter
            </span>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                resetPage();
              }}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
            >
              <option value="all">Role: All</option>
              <option value="admin">Role: Admin</option>
              <option value="manager">Role: Manager</option>
              <option value="user">Role: User</option>
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
                resetPage();
              }}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
            >
              <option value="recent">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="nameAsc">Name A → Z</option>
              <option value="nameDesc">Name Z → A</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/40">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-900/50 text-neutral-400">
                <tr>
                  <Th>first name</Th>
                  <Th>last name</Th>
                  <Th>email</Th>
                  <Th>phone number</Th>
                  <Th>role</Th>
                  <Th>created</Th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.length === 0 ? (
                  <tr >
                    <td
                      colSpan={6}
                      className="p-6 text-center text-neutral-400"
                    >
                      No users found. <div className="loader"></div>
                    </td>
                  </tr>
                ) : (
                  allUsers?.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t border-neutral-800 hover:bg-neutral-900/40"
                    >
                      <Td>{u.user.firstName}</Td>
                      <Td>{u.user.lastName}</Td>
                      <Td className="truncate max-w-[280px]">{u.user.email}</Td>
                      <Td className="whitespace-nowrap">{u.user.phone}</Td>
                      <Td>
                        <span
                          className={[
                            "inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-medium ring-1",
                            u.role === "admin"
                              ? "bg-amber-600/20 text-amber-300 ring-amber-700/40"
                              : u.role === "manager"
                              ? "bg-sky-600/20 text-sky-300 ring-sky-700/40"
                              : "bg-neutral-700/30 text-neutral-300 ring-neutral-700/50",
                          ].join(" ")}
                        >
                          user
                        </span>
                      </Td>
                      <Td className="whitespace-nowrap">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <PageBtn disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </PageBtn>
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            const active = n === page;
            return (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={[
                  "h-9 min-w-9 rounded-xl px-3 text-sm",
                  active
                    ? "bg-neutral-200 text-neutral-900"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700",
                ].join(" ")}
              >
                {n}
              </button>
            );
          })}
          <PageBtn
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </PageBtn>
        </div>
      </main>
    </div>
  );
}

/* ---------- little helpers ---------- */
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
