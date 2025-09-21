"use client";
import { useState } from "react";
import { BarChart3, Ticket, DollarSign, Euro } from "lucide-react";

// JSX version of Advanced Infos page
// Requires TailwindCSS & lucide-react icons

const initialTrips = [
  {
    id: "t1",
    name: "Island Escape",
    price: "$899 / €820",
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
    price: "$1,299 / €1180",
    totalBooking: 80,
    totalTickets: 160,
    revenueEGP: 300000,
    revenueEUR: 15000,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1400&auto=format&fit=crop",
  },
];

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-6">
      <Icon className="h-6 w-6 text-zinc-300" />
      <div className="text-lg font-semibold text-zinc-100">{value}</div>
      <div className="text-xs text-zinc-400">{label}</div>
    </div>
  );
}

function TripInfoCard({ trip }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-4 items-center">
        {/* image */}
        <div className="overflow-hidden rounded-xl border border-zinc-800 aspect-[16/10] sm:aspect-[3/2]">
          {trip.image ? (
            <img src={trip.image} alt={trip.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full grid place-items-center text-zinc-500">image</div>
          )}
        </div>

        {/* content */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-semibold text-zinc-100">{trip.name}</h3>
          <p className="text-zinc-400 text-sm">Price: {trip.price}</p>
          <p className="text-zinc-400 text-sm">Total Booking: {trip.totalBooking}</p>
          <p className="text-zinc-400 text-sm">Total Tickets: {trip.totalTickets}</p>
          <p className="text-zinc-400 text-sm">Revenue (EGP): {trip.revenueEGP.toLocaleString()}</p>
          <p className="text-zinc-400 text-sm">Revenue (EUR): {trip.revenueEUR.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdvancedInfos() {
  const [trips] = useState(initialTrips);

  // totals for top stats
  const totalBooking = trips.reduce((acc, t) => acc + t.totalBooking, 0);
  const totalTickets = trips.reduce((acc, t) => acc + t.totalTickets, 0);
  const revenueEGP = trips.reduce((acc, t) => acc + t.revenueEGP, 0);
  const revenueEUR = trips.reduce((acc, t) => acc + t.revenueEUR, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
  

      {/* Page body */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon={BarChart3} label="Total Booking" value={totalBooking} />
          <StatCard icon={Ticket} label="Total Tickets" value={totalTickets} />
          <StatCard icon={DollarSign} label="Revenue EGP" value={revenueEGP.toLocaleString()} />
          <StatCard icon={Euro} label="Revenue EUR" value={revenueEUR.toLocaleString()} />
        </div>

        {/* Trip details */}
        <div className="space-y-4">
          {trips.map((trip) => (
            <TripInfoCard key={trip.id} trip={trip} />
          ))}
        </div>
      </main>

      {/* Page frame */}
      <div className="pointer-events-none fixed inset-4 rounded-3xl border border-zinc-800/80" />
    </div>
  );
}

// =============================
// Advanced Infos Page (JSX)
// Create a new file like app/(dashboard)/advanced-infos/page.jsx and paste this component
// =============================
export function AdvancedInfosPage() {
  const [trips] = useState([
    {
      id: "t1",
      name: "Island Escape",
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1400&auto=format&fit=crop",
      priceEgp: 28000,
      priceEuro: 820,
      totalBookings: 54,
      totalTickets: 108,
    },
    {
      id: "t2",
      name: "Mountain Trek",
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1400&auto=format&fit=crop",
      priceEgp: 42000,
      priceEuro: 1230,
      totalBookings: 31,
      totalTickets: 62,
    },
  ]);

  const totals = trips.reduce(
    (acc, t) => {
      acc.bookings += t.totalBookings;
      acc.tickets += t.totalTickets;
      acc.revEgp += t.totalBookings * t.priceEgp;
      acc.revEuro += t.totalBookings * t.priceEuro;
      return acc;
    },
    { bookings: 0, tickets: 0, revEgp: 0, revEuro: 0 }
  );

  const fmt = (n) => new Intl.NumberFormat().format(n);

  const Stat = ({ label, value, sub }) => (
    <div className="flex-1 min-w-[180px] rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full grid place-items-center border border-zinc-700 bg-zinc-900">📊</div>
        <div>
          <div className="text-lg font-semibold text-zinc-100">{value}</div>
          <div className="text-xs text-zinc-400">{label}</div>
        </div>
      </div>
      {sub && <div className="mt-2 text-xs text-zinc-500">{sub}</div>}
    </div>
  );

  const Row = ({ t }) => (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-4 items-center">
        <div className="overflow-hidden rounded-xl border border-zinc-800 aspect-[16/10] sm:aspect-[3/2]">
          {t.image ? (
            <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full grid place-items-center text-zinc-500">image</div>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-zinc-100">{t.name}</h3>
            <div className="flex flex-wrap gap-2">
              <Pill variant="muted">price (EGP): {fmt(t.priceEgp)}</Pill>
              <Pill variant="muted">price (EURO): {fmt(t.priceEuro)}</Pill>
            </div>
            <div className="text-sm text-zinc-400">total booking: {fmt(t.totalBookings)}</div>
            <div className="text-sm text-zinc-400">total tickets: {fmt(t.totalTickets)}</div>
          </div>
          <div className="space-y-2 sm:justify-self-end sm:text-right">
            <div className="text-sm text-zinc-400">rev =&gt; EGP</div>
            <div className="text-xl font-semibold">{fmt(t.totalBookings * t.priceEgp)}</div>
            <div className="text-sm text-zinc-400 mt-2">rev =&gt; EURO</div>
            <div className="text-xl font-semibold">{fmt(t.totalBookings * t.priceEuro)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full grid place-items-center border border-zinc-700 bg-zinc-900">⚙️</div>
            <div className="text-xs leading-tight text-zinc-300">
              <div className="font-semibold">Admin</div>
              <div className="text-zinc-500">Name</div>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            {[
              { label: "Control Trips", active: false },
              { label: "Advanced Infos", active: true },
              { label: "Bookings", active: false },
              { label: "Users", active: false },
            ].map((tab) => (
              <button
                key={tab.label}
                className={`px-3 py-1.5 rounded-lg border text-sm transition-colors whitespace-nowrap ${
                  tab.active
                    ? "border-orange-700 bg-orange-900/40 text-orange-200"
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-5">
        <h1 className="text-lg sm:text-xl font-semibold">Advanced Infos</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Stat label="total booking" value={fmt(totals.bookings)} />
          <Stat label="total tickets" value={fmt(totals.tickets)} />
          <Stat label="booking revenue / EGP" value={fmt(totals.revEgp)} />
          <Stat label="booking revenue / EURO" value={fmt(totals.revEuro)} />
        </div>

        {/* Rows */}
        <div className="space-y-4">
          {trips.map((t) => (
            <Row key={t.id} t={t} />
          ))}
        </div>
      </main>

      {/* Page frame */}
      <div className="pointer-events-none fixed inset-4 rounded-3xl border border-zinc-800/80" />
    </div>
  );
}

