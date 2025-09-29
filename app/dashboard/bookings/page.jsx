"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function BookingsPage() {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.bookings);

  const [q, setQ] = useState("");
  const [searchField, setSearchField] = useState("firstName");
  const [transferFilter, setTransferFilter] = useState("all");
  const [sort, setSort] = useState("desc"); // NEW: خلي الافتراضي desc
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [allBookings, setAllBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // NEW — حالات فلتر التاريخ
  const [dateMode, setDateMode] = useState("none"); // none | day | month | year | range | lastDays
  const [day, setDay] = useState(""); // YYYY-MM-DD
  const [month, setMonth] = useState(""); // YYYY-MM
  const [year, setYear] = useState(""); // YYYY
  const [from, setFrom] = useState(""); // YYYY-MM-DD
  const [to, setTo] = useState(""); // YYYY-MM-DD
  const [lastDays, setLastDays] = useState(""); // number

  // NEW — دالة تبني بارامترات التاريخ حسب المود
  const buildDateParams = () => {
    const p = {};
    switch (dateMode) {
      case "day":
        if (day) p.day = day;
        break;
      case "month":
        if (month) p.month = month;
        break;
      case "year":
        if (year) p.year = year;
        break;
      case "range":
        if (from) p.from = from;
        if (to) p.to = to;
        break;
      case "lastDays":
        if (lastDays) p.lastDays = lastDays;
        break;
      default:
        // none
        break;
    }
    return p;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // بناء الـ query string بناءً على كل الفلاتر (بما فيها التاريخ)
        const params = {
          page,
          limit,
          sort,
          q,
          searchField,
          transferFilter,
          ...buildDateParams(), // NEW
        };

        const response = await axios.get(
          `https://abudabbba-backend.vercel.app/api/bookings/admin`,
          { params }
        );

        if (response.data.bookings?.length === 0 && page > 1) {
          // اختياري: لو الصفحة الحالية فاضية ارجع لأول صفحة
          setPage(1);
        }

        setAllBookings(response.data.bookings || []);
        setTotalBookings(response.data.totalBookings || 0);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
    // NEW: زودنا توابع التاريخ في الـ deps
  }, [
    page,
    q,
    searchField,
    transferFilter,
    sort,
    limit,
    dateMode,
    day,
    month,
    year,
    from,
    to,
    lastDays,
  ]);

  const resetToFirst = () => setPage(1);

  const totalPages = Math.max(1, Math.ceil(totalBookings / limit)); // اختياري: ما تنزلش عن 1
  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // NEW — دالة مساعدة لمسح فلاتر التاريخ
  const clearDateFilters = () => {
    setDateMode("none");
    setDay("");
    setMonth("");
    setYear("");
    setFrom("");
    setTo("");
    setLastDays("");
    resetToFirst();
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-lg font-semibold tracking-wide">
          TOTAL BOOKINGS : {totalBookings}
        </h1>

        {/* Controls */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6 mt-7">
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
                <option value="firstName">name</option>
                <option value="phone">phone</option>
                <option value="email">email</option>
              </select>
            </div>
          </div>

          {/* Transfer Filter */}
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
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          {/* Pagination */}
          <div className="flex items-center gap-2 justify-end">
            <PageBtn disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Prev
            </PageBtn>
            <span className="text-sm text-neutral-400">
              {page} / {totalPages}
            </span>
            <PageBtn
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </PageBtn>
          </div>
          {/* NEW — Date Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-neutral-400">
              date
            </span>

            <select
              value={dateMode}
              onChange={(e) => {
                const v = e.target.value;
                setDateMode(v);
                setDay("");
                setMonth("");
                setYear("");
                setFrom("");
                setTo("");
                setLastDays("");
                resetToFirst();
              }}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
            >
              <option value="none">All time</option>
              <option value="day">Day</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="range">Range</option>
              <option value="lastDays">Last N days</option>
            </select>

            {dateMode === "day" && (
              <input
                type="date"
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                  resetToFirst();
                }}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
              />
            )}

            {dateMode === "month" && (
              <input
                type="month"
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  resetToFirst();
                }}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
              />
            )}

            {dateMode === "year" && (
              <input
                type="number"
                min="1970"
                max="2100"
                placeholder="YYYY"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  resetToFirst();
                }}
                className="w-24 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
              />
            )}

            {dateMode === "range" && (
              <>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    resetToFirst();
                  }}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
                  title="From (inclusive)"
                />
                <input
                  type="date"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    resetToFirst();
                  }}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
                  title="To (inclusive)"
                />
              </>
            )}

            {dateMode === "lastDays" && (
              <input
                type="number"
                min="1"
                placeholder="e.g. 7"
                value={lastDays}
                onChange={(e) => {
                  setLastDays(e.target.value);
                  resetToFirst();
                }}
                className="w-24 rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 focus:ring-2 focus:ring-neutral-700"
              />
            )}

            <button
              onClick={clearDateFilters}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800/60"
            >
              Clear
            </button>
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
                  <Th>Trip name</Th>
                  <Th>transfer</Th>
                  <Th>booking date</Th>
                  <Th>Created At</Th>
                  <Th>more info</Th>
                </tr>
              </thead>
              <tbody>
                {allBookings?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-6 text-center text-neutral-400"
                    >
                      No results.
                    </td>
                  </tr>
                ) : (
                  allBookings?.map((r) => (
                    <tr
                      key={r._id}
                      className="border-t border-neutral-800 hover:bg-neutral-900/40"
                    >
                      <Td>{r.user.firstName}</Td>
                      <Td className="whitespace-nowrap flex items-center gap-2">
                        <a
                          href={`https://wa.me/${
                            "+20" + r.user.phone.replace(/\D/g, "")
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-400"
                          title="Chat on WhatsApp"
                        >
                          <FaWhatsapp />
                        </a>
                        {r.user.phone}
                      </Td>
                      <Td>{r?.tripInfo?.name}</Td>
                      <Td>
                        <span
                          className={[
                            "inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-medium",
                            r.transportation === true
                              ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-emerald-700/40"
                              : "bg-neutral-700/30 text-neutral-300 ring-1 ring-neutral-700/50",
                          ].join(" ")}
                        >
                          {r.transportation ? "Yes" : "No"}
                        </span>
                      </Td>
                      <Td className="whitespace-nowrap">
                        {new Date(r.bookingDate).toLocaleDateString("en-GB", {
                          timeZone: "Africa/Cairo",
                        })}
                      </Td>
                      <Td className="whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleString("en-GB", {
                          timeZone: "Africa/Cairo",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Td>
                      <Td className="px-4 py-4">
                        <button
                          onClick={() => openModal(r)}
                          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          See More
                        </button>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedBooking && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
            <div className="bg-neutral-900 text-neutral-200 p-8 rounded-2xl w-4/5 sm:w-1/2 max-w-3xl shadow-lg transform transition-transform duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Booking Details
              </h2>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">User Information</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {selectedBooking.user.firstName}{" "}
                    {selectedBooking.user.lastName}
                  </p>
                  <div className="flex gap-2 items-center">
                    <strong>Email:</strong>
                    <a
                      href={`mailto:${selectedBooking.user.email}`}
                      className="text-blue-500 hover:text-blue-400"
                      title="Send email"
                    >
                      <FaEnvelope />
                    </a>
                    <p>{selectedBooking.user.email}</p>
                  </div>
                  <p>
                    <strong>Phone:</strong> {selectedBooking.user.phone}
                  </p>
                  <p>
                    <strong>Message:</strong> {selectedBooking.user.message}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Trip Information</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Trip Name:</strong> {selectedBooking.tripInfo?.name}
                  </p>
                  <p>
                    <strong>Booking Date:</strong>{" "}
                    {new Date(selectedBooking.bookingDate).toLocaleDateString(
                      "en-GB",
                      { timeZone: "Africa/Cairo" }
                    )}
                  </p>
                  <p>
                    <strong>Transportation:</strong>{" "}
                    {selectedBooking.transportation ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
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
        "h-9 rounded-lg px-3 text-sm font-medium",
        disabled
          ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
          : "bg-[#1c4521b3] text-gray-200 border-[#32c800] border-1 hover:bg-[#1c4521cc]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
