// TourHero.jsx
import React from "react";
import { FaHeart } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
/* ---------- tiny inline icon (no deps) ---------- */
const Dot = () => (
  <span className="inline-block h-2 w-2 rounded-full bg-red-500 align-middle mr-2" />
);

/* ---------- image card ---------- */
const Img = ({ src, alt, className, children }) => (
  <div className={`relative overflow-hidden rounded-xl ${className}`}>
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover object-center"
    />
    {children}
  </div>
);

/* ---------- main component ---------- */
export default function TourHero({
  images = {
    left: "https://images.unsplash.com/photo-1501707305551-9b2adda5e527?q=80&w=900&auto=format&fit=crop",
    center:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    rightTop:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    rightBottom:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Brand crumb */}
      <div className="mb-3 text-sm text-gray-700">
        <Dot />
        <span className="align-middle">Originals by GetYourGuide</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
        Vegas: Grand Canyon, Hoover Dam, Skywalk Option, &amp; Two Meals
      </h1>

      {/* Meta row */}
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* left side */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-900">
            Top rated
          </span>

          <span className="font-semibold text-gray-900">4.7</span>

          <a
            href="#reviews"
            className="text-gray-600 hover:text-gray-900 underline md:no-underline md:hover:underline"
          >
            2,206 reviews
          </a>

          <span className="text-gray-300">•</span>

          <span className="text-gray-600">
            Activity provider:{" "}
            <span className="font-medium text-gray-900">
              Comedy on Deck Tours
            </span>
          </span>
        </div>

        {/* right side */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            <FaHeart className="h-5 w-5" />
            Add to wishlist
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            <IoMdShare className="h-5 w-5" />
            Share
          </button>
        </div>
      </div>

      {/* Image collage */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left tall portrait */}
        <Img
          src={images.left}
          alt="Tour bus interior"
          className="md:col-span-3 h-72 md:h-[420px]"
        />

        {/* Center large */}
        <Img
          src={images.center}
          alt="Grand Canyon Skywalk"
          className="md:col-span-6 h-72 md:h-[420px]"
        />

        {/* Right column (2 stacked) */}
        <div className="md:col-span-3 grid grid-rows-2 gap-4 h-72 md:h-[420px]">
          <Img
            src={images.rightTop}
            alt="Canyon rim view"
            className="row-span-1"
          />
          <Img
            src={images.rightBottom}
            alt="Covered picnic area"
            className="row-span-1"
          >
            {/* +12 overlay */}
            <div className="absolute bottom-3 right-3">
              <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 shadow">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white text-xs">
                  🖼
                </span>
                <span className="text-gray-900 text-sm font-semibold">+12</span>
              </div>
            </div>
          </Img>
        </div>
      </div>
    </section>
  );
}
