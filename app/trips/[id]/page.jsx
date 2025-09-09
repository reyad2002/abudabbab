"use client";

import React, { use } from "react";
import { FaHeart } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { trips } from "../../../trips.js";
import { useForm } from "react-hook-form";

const Dot = () => (
  <span className="inline-block h-2 w-2 rounded-full bg-red-500 align-middle mr-2" />
);

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

const Page = ({ params }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: { adult: 1, child: 0, date: "" } });

  const onSubmit = (data) => console.log(data);

  const { id } = use(params);
  const matches = trips.filter((t) => String(t.id) === String(id));

  if (matches.length === 0) {
    return null; // TODO: اعرض 404 لو حابب
  }

  return (
    <div>
      {matches.map((t) => (
        <section
          key={t.id}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {/* Brand crumb */}
          <div className="mb-3 text-sm text-gray-700">
            <Dot />
            <span className="align-middle">Originals by Abudabbab</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
            {t.title ?? "Trip"}
          </h1>

          {/* Meta row */}
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-900">
                Top rated
              </span>
              <span className="font-semibold text-gray-900">
                {t.rating ?? "4.7"}
              </span>
              <a
                href="#reviews"
                className="text-gray-600 hover:text-gray-900 underline md:no-underline md:hover:underline"
              >
                {t.reviewCount
                  ? `${t.reviewCount.toLocaleString()} reviews`
                  : "2,206 reviews"}
              </a>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">
                Activity provider:{" "}
                <span className="font-medium text-gray-900">
                  {t.provider ?? "Comedy on Deck Tours"}
                </span>
              </span>
            </div>

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
            <Img
              src={t.img2}
              alt="Tour bus interior"
              className="md:col-span-3 h-72 md:h-[420px]"
            />
            <Img
              src={t.img3}
              alt="Grand Canyon Skywalk"
              className="md:col-span-6 h-72 md:h-[420px]"
            />
            <div className="md:col-span-3 grid grid-rows-2 gap-4 h-72 md:h-[420px]">
              <Img src={t.img4} alt="Canyon rim view" className="row-span-1" />
              <Img
                src={t.img5}
                alt="Covered picnic area"
                className="row-span-1"
              >
                <div className="absolute bottom-3 right-3">
                  <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 shadow">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white text-xs">
                      🖼
                    </span>
                    <span className="text-gray-900 text-sm font-semibold">
                      +12
                    </span>
                  </div>
                </div>
              </Img>
            </div>
          </div>

          {/* Content grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: description + features */}
            <div className="md:col-span-7 lg:col-span-8">
              <p className="max-w-3xl text-gray-800 leading-relaxed">
                {t.desc}
              </p>

              <h2 className="mt-8 text-2xl font-semibold text-gray-900">
                About this activity
              </h2>

              <div className="mt-4">
                {(t.features ?? []).map((f, i) => (
                  <div
                    key={f?.title ? `${f.title}-${i}` : i}
                    className="flex gap-4 py-4 border-b last:border-none"
                  >
                    <div className="shrink-0 text-blue-900/90">{f?.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {f?.title}
                      </div>
                      {f?.subtitle && (
                        <div className="text-gray-600 mt-1 text-sm leading-relaxed">
                          {f.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: price card (now inside the grid) */}
            <aside className="md:col-span-5 lg:col-span-4">
              <div className="sticky top-6 rounded-xl border border-gray-200  bg-blue-700 p-5 shadow-sm">
                <div className="mb-3 text-white">Enjoy Your Trip</div>

                <div aria-live="polite">
                  <div className="text-sm text-gray-200">From</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <div className="text-3xl font-extrabold tracking-tight text-gray-100">
                      {t.price[0].amount_euro}$
                    </div>
                    <div className="text-sm text-gray-200">per person</div>
                  </div>
                </div>

                <div className="mt-3">
                  <form
                    className="flex flex-col gap-3 "
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="flex justify-between bg-white p-3 rounded-3xl">
                      <div className="flex flex-col">
                        <label
                          htmlFor="adult"
                          className="text-[20px] font-bold text-gray-200"
                        >
                         {t.price[0].type}
                        </label>
                        <p className="text-gray-300">
                          Price : {t.price[0].amount_euro} $ - ({t.price[0].amount_egy} EGP)
                        </p>
                      </div>
                      <input
                        {...register("adult", { required: true, min: 0 })}
                        type="number"
                        id="adult"
                        className="border border-white w-[60px] h-[40px] p-2 rounded-3xl text-black"
                      />
                    </div>

                    <div className="flex justify-between bg-white p-3 rounded-3xl">
                      <div className="flex flex-col">
                        <label
                          htmlFor="child"
                          className="text-[20px] font-bold text-gray-200"
                        >
                          {t.price[1].type}
                        </label>
                        <p className="text-gray-300">
                          Price : {t.price[1].amount_euro} $ - ({t.price[1].amount_egy} EGP)
                        </p>
                      </div>
                      <input
                        {...register("child", { required: true, min: 0 })}
                        type="number"
                        id="child"
                        className="border border-white w-[60px] h-[40px] p-2 rounded-3xl"
                      />
                    </div>

                    <div className="flex justify-between bg-white p-3 rounded-3xl gap-3">
                      <div className="flex flex-col">
                        <label
                          htmlFor="date"
                          className="text-[20px] font-bold text-gray-200"
                        >
                          Date
                        </label>
                      </div>
                      <input
                        {...register("date", { required: true })}
                        type="date"
                        id="date"
                        className="border border-white w-full h-[40px] p-2 rounded-3xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-orange-500 text-white rounded-3xl p-3 font-semibold hover:bg-orange-500/90"
                    >
                      Check availability
                    </button>
                  </form>
                </div>

                <div className="mt-4 flex items-start gap-3 text-sm text-gray-700">
                  <p>
                    Free cancellation • Reserve now &amp; pay later.{" "}
                    <a
                      href="#"
                      className="underline decoration-2 underline-offset-2 hover:text-gray-900"
                    >
                      Read more
                    </a>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Page;
