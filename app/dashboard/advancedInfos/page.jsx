// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import {
//   BarChart3,
//   Ticket,
//   DollarSign,
//   Euro,
//   Search,
//   Calendar,
//   ArrowUpDown,
//   RefreshCcw,
//   Plus,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAdvancedTripInfo,
//   getTotalBookingsAndRevenue,
// } from "../../../lib/apis/bookingsApi";
// import moment from "moment";

// const ADVANCED_URL =
//   "https://abudabbba-backend.vercel.app/api/bookings/advancedTripsInfos/admin";
// const TOTALS_URL =
//   "https://abudabbba-backend.vercel.app/api/bookings/getTotalBookingsAndRevenue/admin";

// const fmt = (n) => new Intl.NumberFormat().format(n);

// function Pill({ children, variant = "default", className = "" }) {
//   const base =
//     "inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border";
//   const variants = {
//     default: "border-zinc-700 bg-zinc-800 text-zinc-200",
//     success: "border-emerald-700 bg-emerald-900/30 text-emerald-300",
//     muted: "border-zinc-700 bg-zinc-900/40 text-zinc-400",
//   };
//   return (
//     <span className={`${base} ${variants[variant]} ${className}`}>
//       {children}
//     </span>
//   );
// }

// function StatCard({ icon: Icon, label, value, sub , className}) {
//   return (
//     <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5 shadow-sm">
//       <div className="flex items-center gap-3">
//         <div className="h-10 w-10 rounded-xl grid place-items-center border border-zinc-700 bg-zinc-900">
//           <Icon className="h-5 w-5 text-zinc-200" />
//         </div>
//         <div>
//           <div className="text-xl font-semibold text-zinc-100 leading-tight">
//             {value ?? "—"}
//           </div>
//           <div className="text-xs text-zinc-400">{label}</div>
//         </div>
//       </div>
//       {sub && <div className="mt-3 text-xs text-zinc-500">{sub}</div>}
//     </div>
//   );
// }

// function Toolbar({
//   query,
//   setQuery,
//   sortBy,
//   setSortBy,
//   onRefresh,
//   handelSearchTrip,
// }) {
//   return (
//     <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3 sm:p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//       <div className="flex items-center gap-2">
//         <div className="relative">
//           <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyUp={() => handelSearchTrip} // تعديل هنا
//             placeholder="Search trips…"
//             className="pl-9 pr-3 py-2 w-64 rounded-lg border border-zinc-800 bg-zinc-950/60 text-sm outline-none focus:ring-2 focus:ring-zinc-700/50"
//           />
//         </div>
//         <button
//           onClick={onRefresh}
//           className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 text-sm"
//         >
//           <RefreshCcw className="h-4 w-4" />
//           Refresh
//         </button>
//       </div>

//       <div className="flex items-center gap-2">
//         {/* <div className="hidden sm:flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/60 p-1">
//           <button
//             onClick={() => setCurrency("EGP")}
//             className={`px-3 py-1.5 rounded-md text-xs ${
//               currency === "EGP"
//                 ? "bg-zinc-900 border border-zinc-700 text-zinc-200"
//                 : "text-zinc-400"
//             }`}
//           >
//             EGP
//           </button>
//           <button
//             onClick={() => setCurrency("EUR")}
//             className={`px-3 py-1.5 rounded-md text-xs ${
//               currency === "EUR"
//                 ? "bg-zinc-900 border border-zinc-700 text-zinc-200"
//                 : "text-zinc-400"
//             }`}
//           >
//             EUR
//           </button>
//         </div> */}

//         <div className="relative">
//           <ArrowUpDown className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="appearance-none pl-9 pr-8 py-2 rounded-lg border border-zinc-800 bg-zinc-950/60 text-sm outline-none focus:ring-2 focus:ring-zinc-700/50"
//           >
//             <option value="revenue">Sort: Revenue</option>
//             <option value="bookings">Sort: Bookings</option>
//             <option value="name">Sort: Name</option>
//           </select>
//         </div>

//         <Link
//           href="/dashboard/controlTrips/addTrip"
//           className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-700 bg-emerald-900/30 hover:bg-emerald-900/40 text-sm"
//         >
//           <Plus className="h-4 w-4" />
//           Add Trip
//         </Link>
//       </div>
//     </div>
//   );
// }

// function TripRow({ t, currency = "EGP" }) {
//   const revenue = currency === "EGP" ? t.totalEgp : t.totalEuro;
//   return (
//     <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-4 sm:p-5 shadow-sm">
//       <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr_auto] gap-4 items-center">
//         <div className="overflow-hidden rounded-xl border border-zinc-800 aspect-[16/10] sm:aspect-[3/2]">
//           {t.coverImage ? (
//             <img
//               src={t.coverImage}
//               alt={t.tripName}
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <div className="h-full w-full grid place-items-center text-zinc-500">
//               image
//             </div>
//           )}
//         </div>

//         <div className="space-y-2">
//           <div className="flex flex-wrap items-center gap-2">
//             <h3 className="text-lg font-semibold text-zinc-100">
//               {t.tripName}
//             </h3>
//             <Pill>Bookings: {fmt(t.totalBookings)}</Pill>
//             <Pill>Tickets: {fmt(t.totalTickets)}</Pill>
//           </div>
//           <div className="text-sm text-zinc-300">
//             <Calendar className="inline-block h-4 w-4 mr-1 align-[-2px]" />
//             Created At :{" "}
//             <span className="text-teal-400">
//               {moment(t.createdAt).format("DD/MM/YYYY HH:mm:ss")}
//             </span>
//           </div>
//           <div className="text-sm text-zinc-300">
//             <Calendar className="inline-block h-4 w-4 mr-1 align-[-2px]" />
//             Last Update At :{" "}
//             <span className="text-teal-400">
//               {moment(t.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
//             </span>
//           </div>
//         </div>

//         <div className="sm:text-right flex flex-col gap-3">
//           <div className="px-5 py-1 bg-[#181818] rounded-2xl border-2 border-[#232323] flex flex-col justify-center items-center">
//             <div className="text-xs text-zinc-400">revenue EGP:</div>
//             <div className="text-lg font-semibold text-emerald-400">
//               {t.totalEgp} .LE
//             </div>
//           </div>
//           <div className="px-5 py-1 bg-[#181818] rounded-2xl border-2 border-[#232323] flex flex-col justify-center items-center">
//             <div className="text-xs text-zinc-400">revenue Euro:</div>
//             <div className="text-lg font-semibold text-amber-400">
//               {t.totalEuro} $
//             </div>
//           </div>

//           <div className=" flex gap-2 sm:justify-end">
//             <Link
//               href={`/dashboard/controlTrips/${t.tripId}`}
//               className="px-3 py-1.5 rounded-lg border border-sky-700 bg-sky-900/30 text-sky-200 text-xs font-medium hover:bg-sky-900/40"
//             >
//               Manage
//             </Link>
//             <Link
//               href="/dashboard/controlTrips"
//               className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900/40 text-zinc-300 text-xs font-medium hover:bg-zinc-900"
//             >
//               View
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AdvancedInfosPage() {
//   const dispatch = useDispatch();

//   const {
//     advancedInfo,
//     advancedLoading,
//     advancedError,
//     totals,
//     totalsLoading,
//   } = useSelector((s) => s.bookings);

//   const [query, setQuery] = useState("");

//   const [sortBy, setSortBy] = useState("revenue");

//   // search filter for trips
//   const handelSearchTrip = useMemo(() => {
//     // تصفية الرحلات بناءً على الاسم (الاستعلام)
//     const sourceTrips = Array.isArray(advancedInfo) ? advancedInfo : [];
//     let filteredTrips = sourceTrips.filter((t) =>
//       t.tripName.toLowerCase().includes(query.toLowerCase())
//     );

//     // ترتيب الرحلات بناءً على القيمة المختارة في sortBy
//     if (sortBy === "revenue") {
//       // ترتيب حسب الإيرادات (EGP أو EUR)
//       filteredTrips.sort((a, b) => b.totalEgp - a.totalEgp); // الترتيب حسب الإيرادات بالجنيه المصري
//     } else if (sortBy === "bookings") {
//       // ترتيب حسب عدد الرحلات
//       filteredTrips.sort((a, b) => b.totalBookings - a.totalBookings); // الترتيب حسب عدد الرحلات
//     } else if (sortBy === "name") {
//       // ترتيب حسب الاسم الأبجدي
//       filteredTrips.sort((a, b) => a.tripName.localeCompare(b.tripName));
//     }

//     return filteredTrips;
//   }, [query, sortBy, advancedInfo]);

//   useEffect(() => {
//     dispatch(getAdvancedTripInfo(ADVANCED_URL));
//     dispatch(getTotalBookingsAndRevenue(TOTALS_URL));
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-zinc-950 text-zinc-100">
//       <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="text-lg sm:text-xl font-semibold">Advanced Infos</h1>
//           <Link
//             href="/dashboard/controlTrips"
//             className="px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 text-sm"
//           >
//             Back to Trips
//           </Link>
//         </div>

//         {/* KPIs */}
//         {totalsLoading && <div className="loader"></div>}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//           <StatCard
//             icon={BarChart3}
//             label="Total Booking"
//             value={fmt(totals?.totalBookings ?? 0)}
//           />
//           <StatCard
//             icon={Ticket}
//             label="Total Tickets"
//             value={fmt(totals?.totalTickets ?? 0)}
//           />
//           <StatCard
//             icon={DollarSign}
//             label="Revenue EGP"
//             value={fmt(totals?.totalEgp ?? 0)}
//             sub="All-time gross revenue (EGP)"
//           />
//           <StatCard
//             icon={Euro}
//             label="Revenue EUR"
//             value={fmt(totals?.totalEuro ?? 0)}
//             sub="All-time gross revenue (EUR)"
//           />
//         </div>

//         {/* Toolbar */}
//         <Toolbar
//           query={query}
//           setQuery={setQuery}
//           sortBy={sortBy}
//           setSortBy={setSortBy}
//           handelSearchTrip={handelSearchTrip}
//           onRefresh={() => {
//             dispatch(getAdvancedTripInfo(ADVANCED_URL));
//             dispatch(getTotalBookingsAndRevenue(TOTALS_URL));
//           }}
//         />

//         {/* List */}
//         {advancedLoading ? (
//           <div className="loader"></div>
//         ) : handelSearchTrip?.length ? (
//           handelSearchTrip.map((t) => (
//             <TripRow key={t.tripId ?? t._id ?? t.tripName} t={t} />
//           ))
//         ) : (
//           <div className="text-center text-red-500 font-semibold">
//             Trip Not Found
//           </div>
//         )}
//       </main>

//       <div className="pointer-events-none fixed inset-4 rounded-3xl border border-zinc-800/80" />
//     </div>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>no iam reyad</div>
  )
}

export default page
