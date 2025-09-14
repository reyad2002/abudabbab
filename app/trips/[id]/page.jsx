"use client";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addBooking } from "../../store/bookingSlice";
import { useRouter } from "next/navigation";

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
  const trips = useSelector((state) => state.trips);
  const booking = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  const router = useRouter();

  // react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: { adult: 1, child: 0, date: "" } });

  // dynamic route
  const { id } = use(params);
  const trip = trips.trips.filter((t) => String(t.id) === String(id));

  if (trip.length === 0) {
    return null;
  }
  // handel submit form
  const onSubmit = (data) => {
    dispatch(addBooking({ data : data ,  trip }));
    router.push("/trips/checkOut")
    // console.log(booking);
  };
  useEffect(() => {
    console.log('bookings updated:', booking);
    // localStorage.setItem("book" , JSON.stringify(booking)  )
  }, [booking]);

  return (
    <div>
      {trip.map((t) => (
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
              {/* <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                <IoMdShare className="h-5 w-5" />
                Share
              </button> */}
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
              ></Img>
            </div>
          </div>

          {/* Content grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: description + features */}
            <div className="md:col-span-7 lg:col-span-8">
              <h2 className="text-2xl font-semibold">Description</h2>
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
                    {/* <div className="shrink-0 text-blue-900/90">{f?.icon}</div> */}
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
              <div className="sticky top-6">
                {/* Gradient golden frame */}
                <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-blue-300/70 via-yellow-500/30 to-blue-300/70 shadow-[0_12px_40px_-10px_rgba(234,179,8,0.45)]">
                  {/* Panel */}
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#19377c] to-[#165bd3] text-zinc-100 px-6 py-6">
                    {/* soft glows */}
                    <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

                    <div className="mb-4 text-blue-200 font-semibold tracking-wide uppercase">
                      Enjoy Your Trip
                    </div>

                    <div aria-live="polite">
                      <div className="text-xs text-zinc-300/80">From</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <div className="text-4xl font-black tracking-tight text-white drop-shadow-sm">
                          {t.price[0].amount_euro}$
                        </div>
                        <div className="text-sm text-zinc-300/80">
                          per person
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        {/* Adult */}
                        <div className="flex items-center justify-between rounded-3xl bg-white/5 backdrop-blur ring-1 ring-blue-300/30 hover:ring-blue-300/60 focus-within:ring-blue-400/80 transition px-4 py-3">
                          <div className="flex flex-col">
                            <label
                              htmlFor="adult"
                              className="text-[18px] font-semibold text-blue-300"
                            >
                              {t.price[0].type}
                            </label>
                            <p className="text-zinc-300">
                              Price : {t.price[0].amount_euro} $ - (
                              {t.price[0].amount_egy} EGP)
                            </p>
                          </div>
                          <input
                            {...register("adult", { required: true, min: 0 })}
                            type="number"
                            id="adult"
                            className="w-[68px] h-[44px] rounded-2xl bg-black/30 text-white text-center border border-blue-200/20 focus:outline-none focus:ring-2 focus:ring-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>

                        {/* Child */}
                        <div className="flex items-center justify-between rounded-3xl bg-white/5 backdrop-blur ring-1 ring-blue-300/30 hover:ring-blue-300/60 focus-within:ring-blue-400/80 transition px-4 py-3">
                          <div className="flex flex-col">
                            <label
                              htmlFor="child"
                              className="text-[18px] font-semibold text-blue-300"
                            >
                              {t.price[1].type}
                            </label>
                            <p className="text-zinc-300">
                              Price : {t.price[1].amount_euro} $ - (
                              {t.price[1].amount_egy} EGP)
                            </p>
                          </div>
                          <input
                            {...register("child", { required: true, min: 0 })}
                            type="number"
                            id="child"
                            className="w-[68px] h-[44px] rounded-2xl bg-black/30 text-white text-center border border-blue-200/20 focus:outline-none focus:ring-2 focus:ring-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>

                        {/* Date */}
                        <div className="flex items-center justify-between gap-3 rounded-3xl bg-white/5 backdrop-blur ring-1 ring-blue-300/30 hover:ring-blue-300/60 focus-within:ring-blue-400/80 transition px-4 py-3">
                          <div className="flex flex-col">
                            <label
                              htmlFor="date"
                              className="text-[18px] font-semibold text-blue-300"
                            >
                              Date
                            </label>
                          </div>
                          <input
                            {...register("date", { required: true })}
                            type="date"
                            id="date"
                            className="w-full h-[44px] px-3 rounded-2xl bg-black/30 text-white border border-blue-200/20 focus:outline-none focus:ring-2 focus:ring-blue-400 [color-scheme:dark]"
                          />
                        </div>

                        {/* transfer */}
                        <div className="flex items-center gap-3 px-2 py-1 rounded-3xl">
                          <input
                            {...register("transfer", { required: false })}
                            type="checkbox"
                            id="transfer"
                            className="w-5 h-5 accent-blue-400 rounded-sm border border-blue-300/40 bg-black/40"
                          />
                          <div className="flex flex-col">
                            <label
                              htmlFor="transfer"
                              className="text-[15px] font-bold text-white"
                            >
                              Required transfer
                            </label>
                          </div>
                        </div>
                        <button
                          // onClick={() => {}}
                          type="submit"
                          className=" cursor-pointer h-12 rounded-3xl bg-gradient-to-r from-blue-400 via-blue-600 to-blue-300 text-black font-semibold tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-[1px] transition"
                        >
                          Book Now
                          {/* <Link href={`/trips/checkOut`}>Book Now</Link> */}
                        </button>
                      </form>
                    </div>

                    <div className="mt-5 flex items-start gap-3 text-xs text-zinc-300/80">
                      <p>
                        Free cancellation • Reserve now &amp; pay later.{" "}
                        <a
                          href="#"
                          className="underline decoration-2 underline-offset-4 text-blue-300 hover:text-blue-200"
                        >
                          Read more
                        </a>
                      </p>
                    </div>
                  </div>
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
