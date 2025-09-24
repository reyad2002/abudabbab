"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa"; // Importing WhatsApp icon

export default function BookingsPage() {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.bookings);
  const [q, setQ] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [transferFilter, setTransferFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const [allBookings, setAllBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get(
        `https://abudabbba-backend.vercel.app/api/bookings/admin?page=${page}&limit=${limit}`
      );
      setAllBookings(response.data.bookings); // Save the data to state
      setTotalBookings(response.data.totalBookings); // Save the data to state
    };
    fetchBookings();
  }, [page]); // Adding `page` as a dependency

  const resetToFirst = () => setPage(1);

  const totalPages = Math.ceil(totalBookings / limit);
  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200">
      {/* Content */}
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
                <option value="name">name</option>
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
          {/* Pagination */}

          <div className="flex items-center gap-2 justify-end">
            <PageBtn disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </PageBtn>
            <span className="text-sm text-neutral-400">
              {page} / {totalPages}
            </span>
            <PageBtn
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </PageBtn>
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
                  {/* <Th>email</Th> */}
                  <Th>Trip name</Th>
                  {/* <Th>Adult num</Th>
                  <Th>Child num</Th> */}
                  <Th>transfer</Th>
                  <Th>Trip date</Th>
                  <Th>Booking date</Th>
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
                      No results. <div className="loader"></div>
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
                      {/* <Td className="truncate max-w-[220px] ">  <a
                          href={`mailto:${r.user.email}`}
                          className="text-blue-500 hover:text-blue-400"
                          title="Send email"
                        >
                          <FaEnvelope />
                        </a>{r.user.email}</Td> */}
                      <Td>{r?.tripInfo?.name}</Td>
                      {/* <Td>{r.adult}</Td>
                      <Td>{r.child}</Td> */}
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
                      </Td>
                      <Td className="whitespace-nowrap">
                        {new Date(r.bookingDate).toLocaleDateString()}
                      </Td>
                      <Td className="whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleDateString()}
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

        {/* Pagination */}
        {/* <div className="mt-6 flex items-center justify-center gap-2">
          <PageBtn
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </PageBtn>
          <span className="text-sm text-neutral-400">
            {page} / {totalPages}
          </span>
          <PageBtn
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </PageBtn>
        </div> */}
        {/* Modal */}
        {isModalOpen && selectedBooking && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
            <div className="bg-neutral-900 text-neutral-200 p-8 rounded-2xl w-4/5 sm:w-1/2 max-w-3xl shadow-lg transform transition-transform duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Booking Details
              </h2>

              {/* User Information */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">User Information</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {selectedBooking.user.firstName}{" "}
                    {selectedBooking.user.lastName}
                  </p>
                  <div>
                    <div className="flex gap-2  items-center">
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${selectedBooking.user.email}`}
                      className="text-blue-500 hover:text-blue-400"
                      title="Send email"
                    >
                      <FaEnvelope />
                    </a>

                    <p>{selectedBooking.user.email}</p>
                    </div>
                  </div>
                  <p>
                    <strong>Phone:</strong> {selectedBooking.user.phone}
                  </p>
                  <p>
                    <strong>Message:</strong> {selectedBooking.user.message}
                  </p>
                </div>
              </div>

              {/* Trip Information */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Trip Information</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Trip Name:</strong> {selectedBooking.tripInfo.name}
                  </p>
                  {/* <div className="relative">
                    <img
                      src={selectedBooking.tripInfo.images[0]}
                      alt="Trip Image"
                      className="w-full h-[300px] object-cover rounded-lg mb-4"
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded-lg">
                      Trip Image
                    </div>
                  </div> */}
                  <p>
                    <strong>Booking Date:</strong>{" "}
                    {new Date(selectedBooking.bookingDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Transportation:</strong>{" "}
                    {selectedBooking.transportation ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              {/* Close Button */}
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
