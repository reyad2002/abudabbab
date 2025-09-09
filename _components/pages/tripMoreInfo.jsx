"use client";
// AboutActivity.jsx
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { TbCalendarCancel } from "react-icons/tb";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { FaWheelchair } from "react-icons/fa";
import { BsPersonRaisedHand } from "react-icons/bs";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

/* ------------ tiny inline icons (no deps) ------------ */

/* ------------ item row ------------ */
function FeatureItem({ icon, title, subtitle }) {
  return (
    <div className="flex gap-4 py-4 border-b last:border-none">
      <div className="shrink-0 text-blue-900/90">{icon}</div>
      <div>
        <div className="font-semibold text-gray-900">{title}</div>
        {subtitle && (
          <div className="text-gray-600 mt-1 text-sm leading-relaxed">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------ sticky price card ------------ */
function PriceCard({
  price = 4962,
  currency = "£",
  per = "per person",
  note = "Reserve now & pay later to book your spot and pay nothing today.",
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <aside className="md:col-span-5 lg:col-span-4">
      <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-3">Enjoy Your Trip </div>

        <div aria-live="polite">
          <div className="text-sm text-gray-700">From</div>
          <div className="mt-1 flex items-baseline gap-2">
            <div className="text-3xl font-extrabold tracking-tight text-gray-900">
              20$
            </div>
            <div className="text-sm text-gray-600">{per}</div>
          </div>
        </div>

        {/* <button
          onClick={() => handleOpenBookingForm()}
          type="button"
          className="mt-5 w-full rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Check availability
        </button> */}

        <div
          className="rounded-4xl mt-3 
        "
        >
          <form action="" className="flex flex-col gap-3  " onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between bg-blue-700 p-3 rounded-3xl">
              <div className="flex flex-col">
                <label
                  htmlFor="adult"
                  className="text-[20px] font-bold text-gray-200"
                >
                  Adults
                </label>
                <p className="text-gray-300"> Price : 65 $ - (3800 EGP)</p>
              </div>
              <input
              {...register("adult", { required: true, maxLength: 20 })}
                type="number"
                // value={"1"}
                id="adult"
                className="border-1 border-white w-[50px] h-[40px] p-2 rounded-3xl text-black"
              />
            </div>
            <div className="flex justify-between bg-blue-700 p-3 rounded-3xl">
              <div className="flex flex-col">
                <label
                  htmlFor="child"
                  className="text-[20px] font-bold text-gray-200"
                >
                  Child
                </label>
                <p className="text-gray-300"> Price : 33 $ - (1900 EGP)</p>
              </div>
              <input
                {...register("child", { required: true, maxLength: 20 })}
                type="number"
                // value={"0"}
                id="child"
                className="border-1 border-white w-[50px] h-[40px] p-2 rounded-3xl"
              />
            </div>
            {/* date */}
            <div className="flex justify-between bg-blue-700 p-3 rounded-3xl gap-3">
              <div className="flex flex-col">
                <label
                  htmlFor="child"
                  className="text-[20px] font-bold text-gray-200"
                >
                  Date
                </label>
                {/* <p className="text-black"> Price : 33 $ - (1900 EGP)</p> */}
              </div>
              <input
                {...register("date", { required: true })}
                type="date"
                id="date"
                className="border-1 border-white w-[100%] h-[40px] p-2 rounded-3xl"
              />
            </div>
            <Button type="submit" className="bg-blue-700 rounded-3xl p-3">
              Check availability
            </Button>
          </form>
        </div>
        <div className="mt-4 flex items-start gap-3 text-sm text-gray-700">
          <span className="mt-0.5"></span>
          <p>
            {note}{" "}
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
  );
}

/* ------------ main section ------------ */
export default function AboutActivity() {
  const features = [
    {
      icon: <TbCalendarCancel className="text-[25px]" />,
      title: "Free cancellation",
      subtitle: "Cancel up to 24 hours in advance for a full refund.",
    },
    {
      icon: <BsCalendar2MinusFill className="text-[25px]" />,
      title: "Reserve now & pay later",
      subtitle:
        "Keep your travel plans flexible — book your spot and pay nothing today.",
    },

    {
      icon: <BsPersonRaisedHand className="text-[25px]" />,
      title: "Live tour guide",
      subtitle: "English",
    },

    {
      icon: <FaWheelchair className="text-[25px]" />,
      title: "Wheelchair accessible",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* intro text (kept brief vs reference) */}
      <p className="max-w-3xl text-gray-800 leading-relaxed">
        Visit the West Rim of the Grand Canyon and Hoover Dam on a comfy VIP day
        tour from Las Vegas. Enjoy a tasty restaurant breakfast and a scenic BBQ
        lunch with plenty of stops for panoramic photos.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: features */}
        <div className="md:col-span-7 lg:col-span-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            About this activity
          </h2>
          <div className="mt-4">
            {features.map((f, i) => (
              <FeatureItem
                key={i}
                icon={f.icon}
                title={f.title}
                subtitle={f.subtitle}
              />
            ))}
          </div>
        </div>

        {/* Right: price card */}
        <PriceCard />
      </div>
    </section>
  );
}
