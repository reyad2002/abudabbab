"use client";
import { fetchTripsData } from "@/app/store/tripsSlices";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Util
function Pill({ children, variant = "default" }) {
  const base =
    "inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border";
  const variants = {
    default: "border-zinc-700 bg-zinc-800 text-zinc-200",
    success: "border-emerald-700 bg-emerald-900/30 text-emerald-300",
    danger: "border-rose-700 bg-rose-900/30 text-rose-300",
    muted: "border-zinc-700 bg-zinc-900/40 text-zinc-400",
  };
  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}
// Trip Card
function TripCard({ trip, onToggle, onUpdate, onDelete }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr_140px] gap-4 items-center">
        {/* image */}
        <div className="overflow-hidden rounded-xl border border-zinc-800 aspect-[16/10] sm:aspect-[3/2]">
          {trip.images ? (
            <img
              src={trip.images[0]}
              alt={trip.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-zinc-500">
              image
            </div>
          )}
        </div>

        {/* content */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-100">
              {trip.name}
            </h3>
            <Pill>
              ADULT: {trip.prices.adult.euro}$ {trip.prices.adult.egp}EGP
            </Pill>
            <Pill>
              CHILD: {trip.prices.child.euro}$ {trip.prices.child.egp}EGP
            </Pill>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base sm:text-md font-semibold text-zinc-100">
              Trip Time
            </h3>

            <Pill variant="muted">{trip.tripTime.from}</Pill>
            <Pill variant="muted">{trip.tripTime.to}</Pill>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
            {trip.description}
          </p>
          <ul className="flex flex-wrap gap-2 pt-1">
            {trip.features.map((f) => (
              <li key={f._id}>
                {/* <Pill variant="muted"></Pill> */}
                <Pill variant="muted" className="flex">
                  {" "}
                  <p className="font-semibold text-gray-300">{f.title} : </p>
                  <p> {f.subtitle}</p>
                </Pill>
              </li>
            ))}
          </ul>
        </div>

        {/* actions */}
        <div className="flex sm:flex-col justify-end sm:justify-center gap-2">
          <button
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              trip.isActive
                ? "border-emerald-700 bg-emerald-900/30 text-emerald-200"
                : "border-zinc-700 bg-zinc-900/40 text-zinc-300"
            }`}
            aria-pressed={trip.isActive}
          >
            {trip.isActive ? "● Is Active" : "○ Inactive"}
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-sky-700 bg-sky-900/30 text-sky-200 text-xs font-medium hover:bg-sky-900/40">
          <Link href={`/dashboard/controlTrips/${trip._id}`}>
            Update
          </Link>
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-rose-700 bg-rose-900/30 text-rose-200 text-xs font-medium hover:bg-rose-900/40">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default function DashboardTrips() {
  // Calling API To Get Trips
  const dispatch = useDispatch();
  const { trips, loading, error } = useSelector((state) => state.trips);
  useEffect(() => {
    dispatch(fetchTripsData("https://abudabbba-backend.vercel.app/api/trips"));
  }, []);
  console.log(trips);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Page body */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold">
            Control Your Trips
          </h1>
          <div className="flex items-center gap-2">
            <Link href={'/dashboard/controlTrips/addTrip'}>
              <button
                // onClick={}
                className=" cursor-pointer px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 text-sm font-medium"
              >
                ADD
              </button>
            </Link>
            <button
              // onClick={}
              className="cursor-pointer px-4 py-2 rounded-xl border border-rose-700 bg-rose-900/30 hover:bg-rose-900/40 text-sm font-medium"
            >
              DELETE ALL
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {trips.length === 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
              {!trips && (
                <div className="">
                  {" "}
                  No trips yet. Click{" "}
                  <span className="text-zinc-200 font-medium">ADD</span> to
                  create one.
                </div>
              )}
              {loading && <div className="loader"></div>}
            </div>
          )}

          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              // onToggle={toggleActive}
              // onUpdate={updateTrip}
              // onDelete={deleteTrip}
            />
          ))}
        </div>
      </main>

      {/* Page frame */}
      <div className="pointer-events-none fixed inset-4 rounded-3xl border border-zinc-800/80" />
    </div>
  );
}
