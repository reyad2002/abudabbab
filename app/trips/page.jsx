"use client";
import React from "react";
import { motion } from "framer-motion";
// import {trips} from '../../trips.js'
import Link from "next/link.js";
import {useSelector} from 'react-redux'
/* ------- data (could be fetched from an API) ------- */


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
};

export default function TripsSection() {
  const trips = useSelector((state) => state.trips);
  console.log(trips);
  // console.log(params);
  return (
    <section id="trips" className="bg-main py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8 overflow-hidden">
        <motion.p
          className="text-teal-900/80 font-serif text-xl"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          Best Place For You
        </motion.p>

        <motion.h2
          className="mt-2 text-4xl font-bold text-teal-900"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-orange-500">Our</span> Trips
        </motion.h2>

        <motion.p
          className="mx-auto mt-3 max-w-2xl text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </motion.p>

        {/* cards */}
        <motion.div
          className="
            mt-10 grid grid-cols-1 gap-6
            sm:grid-cols-2 lg:grid-cols-3
            overflow-x-auto lg:overflow-visible
            snap-x snap-mandatory lg:snap-none pb-2
          "
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {trips.trips.map((t) => (
            <motion.article
              key={t.id}
              variants={item}
              className="
                group relative snap-center lg:snap-none
                rounded-xl border border-slate-200 bg-white shadow-sm
                transition
              "
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(2,6,23,0.08)" }}
              whileTap={{ scale: 0.99 }}
            >
              {/* image */}
              <div className="overflow-hidden rounded-t-xl">
                <motion.img
                  src={t.img}
                  alt={t.title}
                  className="h-90 w-full object-cover"
                  initial={{ scale: 1.04 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.06 }}
                />
              </div>

              {/* body */}
              <div className="p-5 text-left">
                <h3 className="text-md font-semibold text-slate-800">
                  {t.title}
                </h3>

                {/* rating */}
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <Stars value={t.rating} />
                  <span>({t.rating.toFixed(1)} Rating)</span>
                </div>

                {/* price */}
                <div className="mt-3 text-slate-900">
                  <span className="text-lg font-bold">
                    ${t.price[0].amount_euro}
                  </span>
                  <span className="ml-1 text-sm text-slate-500">/Person</span>
                </div>

                {/* footer row */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ClockIcon className="h-4 w-4" />
                    <span>From : {t.from} Am </span>
                    <span>To : {t.to} Pm</span>
                  </div>
                  <Link href={`/trips/${t.id}`}>
                  <motion.button
                    type="button"
                    
                    className="
                      inline-flex items-center gap-2 rounded-full
                      bg-orange-500
                      border border-slate-200 px-4 py-2 text-xs font-medium
                      text-white  transition hover:bg-orange-500/90 cursor-pointer
                    "
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                      Book Now
                      <ArrowIcon className="h-3.5 w-3.5" />
                  </motion.button>
                    </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------- tiny icons & stars ------- */

function Stars({ value }) {
  const full = Math.floor(value);
  const fraction = Math.max(0, Math.min(1, value - full));
  return (
    <div className="flex items-center">
      {[0, 1, 2, 3, 4].map((i) => {
        const isFull = i < full;
        const isPartial = i === full && fraction > 0 && full < 5;
        return (
          <span key={i} className="relative mr-0.5 inline-block">
            <StarOutline className="h-4 w-4 text-amber-500" />
            {(isFull || isPartial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: isFull ? "100%" : `${fraction * 100}%` }}
              >
                <StarSolid className="h-4 w-4 text-amber-500" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function StarOutline({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M12 3.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 21.4l1.1-6.5L2.6 10.3l6.5-.9L12 3.5z"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function StarSolid({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 21.4l1.1-6.5L2.6 10.3l6.5-.9L12 3.5z" />
    </svg>
  );
}
function ClockIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
      <path d="M12 8v4l3 2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ArrowIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M5 12h14M13 5l7 7-7 7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
