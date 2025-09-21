"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Ticket,
  DollarSign,
  Euro,
  Search,
  Calendar,
  ArrowUpDown,
  RefreshCcw,
  Plus,
} from "lucide-react";

/* ---------------------------------- Data ---------------------------------- */
const initialTrips = [
  {
    id: "t1",
    name: "Island Escape",
    price: { egp: 28000, eur: 820 }, // سعر التذكرة الواحدة (مثال)
    totalBooking: 120,
    totalTickets: 240,
    revenueEGP: 450000,
    revenueEUR: 22000,
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "t2",
    name: "Mountain Trek",
    price: { egp: 42000, eur: 1180 },
    totalBooking: 80,
    totalTickets: 160,
    revenueEGP: 300000,
    revenueEUR: 15000,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1400&auto=format&fit=crop",
  },
];

/* --------------------------------- Helpers -------------------------------- */
const fmt = (n) => new Intl.NumberFormat().format(n);

function Pill({ children, variant = "default", className = "" }) {
  const base =
    "inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border";
  const variants = {
    default: "border-zinc-700 bg-zinc-800 text-zinc-200",
    success: "border-emerald-700 bg-emerald-900/30 text-emerald-300",
    muted: "border-zinc-700 bg-zinc-900/40 text-zinc-400",
  };
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}

/* --------------------------------- Widgets -------------------------------- */
function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl grid place-items-center border border-zinc-700 bg-zinc-900">
          <Icon className="h-5 w-5 text-zinc-200" />
        </div>
        <div>
          <div className="text-xl font-semibold text-zinc-100 leading-tight">
            {value}
          </div>
          <div className="text-xs text-zinc-400">{label}</div>
        </div>
      </div>
      {sub && <div className="mt-3 text-xs text-zinc-500">{sub}</div>}
    </div>
  );
}

function Toolbar({
  query,
  setQuery,
  currency,
  setCurrency,
  sortBy,
  setSortBy,
  onRefresh,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3 sm:p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* left */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trips…"
            className="pl-9 pr-3 py-2 w-64 rounded-lg border border-zinc-800 bg-zinc-950/60 text-sm outline-none focus:ring-2 focus:ring-zinc-700/50"
          />
        </div>

        <button
          onClick={onRefresh}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 text-sm"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* right */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/60 p-1">
          <button
            onClick={() => setCurrency("EGP")}
            className={`px-3 py-1.5 rounded-md text-xs ${
              currency === "EGP"
                ? "bg-zinc-900 border border-zinc-700 text-zinc-200"
                : "text-zinc-400"
            }`}
          >
            EGP
          </button>
          <button
            onClick={() => setCurrency("EUR")}
            className={`px-3 py-1.5 rounded-md text-xs ${
              currency === "EUR"
                ? "bg-zinc-900 border border-zinc-700 text-zinc-200"
                : "text-zinc-400"
            }`}
          >
            EUR
          </button>
        </div>

        <div className="relative">
          <ArrowUpDown className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-9 pr-8 py-2 rounded-lg border border-zinc-800 bg-zinc-950/60 text-sm outline-none focus:ring-2 focus:ring-zinc-700/50"
          >
            <option value="revenue">Sort: Revenue</option>
            <option value="bookings">Sort: Bookings</option>
            <option value="tickets">Sort: Tickets</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        <Link
          href="/dashboard/controlTrips/addTrip"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-700 bg-emerald-900/30 hover:bg-emerald-900/40 text-sm"
        >
          <Plus className="h-4 w-4" />
          Add Trip
        </Link>
      </div>
    </div>
  );
}

function TripRow({ t, currency = "EGP" }) {
  const revenue =
    currency === "EGP" ? t.revenueEGP : t.revenueEUR;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr_auto] gap-4 items-center">
        {/* image */}
        <div className="overflow-hidden rounded-xl border border-zinc-800 aspect-[16/10] sm:aspect-[3/2]">
          {t.image ? (
            <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full grid place-items-center text-zinc-500">
              image
            </div>
          )}
        </div>

        {/* content */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-zinc-100">{t.name}</h3>
            <Pill variant="muted">
              price: {fmt(t.price.egp)} EGP / {fmt(t.price.eur)} €
            </Pill>
          </div>

          <div className="flex flex-wrap gap-2">
            <Pill>bookings: {fmt(t.totalBooking)}</Pill>
            <Pill>tickets: {fmt(t.totalTickets)}</Pill>
          </div>

          <div className="text-sm text-zinc-400">
            <Calendar className="inline-block h-4 w-4 mr-1 align-[-2px]" />
            last 30 days (sample)
          </div>
        </div>

        {/* right */}
        <div className="sm:text-right">
          <div className="text-xs text-zinc-400">revenue ({currency})</div>
          <div className="text-xl font-semibold">{fmt(revenue)}</div>
          <div className="mt-3 flex gap-2 sm:justify-end">
            <Link
              href={`/dashboard/controlTrips/${t.id}`}
              className="px-3 py-1.5 rounded-lg border border-sky-700 bg-sky-900/30 text-sky-200 text-xs font-medium hover:bg-sky-900/40"
            >
              Manage
            </Link>
            <Link
              href="/dashboard/controlTrips"
              className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900/40 text-zinc-300 text-xs font-medium hover:bg-zinc-900"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Page ----------------------------------- */
export default function AdvancedInfos() {
  const [trips] = useState(initialTrips);
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState("EGP"); // 'EGP' | 'EUR'
  const [sortBy, setSortBy] = useState("revenue");

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = trips.filter((t) => t.name.toLowerCase().includes(q));

    list.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "bookings") return b.totalBooking - a.totalBooking;
      if (sortBy === "tickets") return b.totalTickets - a.totalTickets;
      // revenue
      const ra = currency === "EGP" ? a.revenueEGP : a.revenueEUR;
      const rb = currency === "EGP" ? b.revenueEGP : b.revenueEUR;
      return rb - ra;
    });
    return list;
  }, [trips, query, sortBy, currency]);

  const totals = useMemo(() => {
    return filteredSorted.reduce(
      (acc, t) => {
        acc.booking += t.totalBooking;
        acc.tickets += t.totalTickets;
        acc.egp += t.revenueEGP;
        acc.eur += t.revenueEUR;
        return acc;
      },
      { booking: 0, tickets: 0, egp: 0, eur: 0 }
    );
  }, [filteredSorted]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* top header actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold">Advanced Infos</h1>
          <Link
            href="/dashboard/controlTrips"
            className="px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 text-sm"
          >
            Back to Trips
          </Link>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={BarChart3} label="Total Booking" value={fmt(totals.booking)} />
          <StatCard icon={Ticket} label="Total Tickets" value={fmt(totals.tickets)} />
          <StatCard
            icon={DollarSign}
            label="Revenue EGP"
            value={fmt(totals.egp)}
            sub="All-time gross revenue (EGP)"
          />
          <StatCard
            icon={Euro}
            label="Revenue EUR"
            value={fmt(totals.eur)}
            sub="All-time gross revenue (EUR)"
          />
        </div>

        {/* toolbar */}
        <Toolbar
          query={query}
          setQuery={setQuery}
          currency={currency}
          setCurrency={setCurrency}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onRefresh={() => window.location.reload()}
        />

        {/* list */}
        <div className="space-y-4">
          {filteredSorted.map((t) => (
            <TripRow key={t.id} t={t} currency={currency} />
          ))}
          {filteredSorted.length === 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
              No results. Try a different search or sort.
            </div>
          )}
        </div>
      </main>

      {/* frame */}
      <div className="pointer-events-none fixed inset-4 rounded-3xl border border-zinc-800/80" />
    </div>
  );
}
