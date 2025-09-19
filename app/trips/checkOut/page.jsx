"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addBooking } from "../../store/bookingSlice";
import {
  FiClock,
  FiLock,
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiCalendar,
  FiGlobe,
  FiUsers,
  FiStar,
  FiTag,
  FiCheckCircle,
  FiAward,
} from "react-icons/fi";

export default function CheckoutSection() {
  const bookingState = useSelector((state) => state.bookings);
  const b = bookingState.bookings;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      firstName: b?.contactInfo?.firstName || "",
      lastName: b?.contactInfo?.lastName || "",
      email: b?.contactInfo?.email || "",
      phone: b?.contactInfo?.phone || "",
      message: b?.contactInfo?.message || "",
    },
  });

  React.useEffect(() => {
    if (b?.contactInfo) {
      reset({
        firstName: b?.contactInfo?.firstName || "",
        lastName: b?.contactInfo?.lastName || "",
        email: b?.contactInfo?.email || "",
        phone: b?.contactInfo?.phone || "",
        message: b?.contactInfo?.message || "",
      });
    }
  }, [b?.contactInfo, reset]);

  const onSubmit = (data) => {
    // Persist contact info into booking state so it survives reloads
    const updated = { ...b, contactInfo: data };
    dispatch(addBooking(updated));
    alert("Thanks! We'll be in touch.");
  };

  const adultPriceEuro = Number(
    b?.trip?.[0]?.price?.find((p) => p.type === "Adult")?.amount_euro ?? 0
  );

  const childPriceEuro = Number(
    b?.trip?.[0]?.price?.find((p) => p.type === "Child")?.amount_euro ?? 0
  );

  const adults = Number(b?.data?.adult ?? 0);
  const children = Number(b?.data?.child ?? 0);

  const transferFee = b?.data?.transfer ? 25 : 0;
  const total =
    adultPriceEuro * adults + childPriceEuro * children + transferFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top banners */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <p className="text-[40px] p-1 rounded-3xl text-black text-center font-bold ">
          Check Out ..
        </p>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Form */}
        <section className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Contact & message
            </h2>
            <p className="text-sm text-gray-600">
              Tell us how to reach you and leave a note for the organizer.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-white border border-gray-200 rounded-2xl p-6"
          >
            {/* First & Last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="First name"
                name="firstName"
                placeholder=""
                icon={<FiUser aria-hidden />}
                error={errors.firstName?.message}
                registerOpts={register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "Too short" },
                })}
              />
              <Field
                label="Last name"
                name="lastName"
                placeholder=""
                icon={<FiUser aria-hidden />}
                error={errors.lastName?.message}
                registerOpts={register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "Too short" },
                })}
              />
            </div>

            {/* Email */}
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="name@example.com"
              icon={<FiMail aria-hidden />}
              error={errors.email?.message}
              registerOpts={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email",
                },
              })}
            />

            {/* Phone */}
            <Field
              label="Phone number"
              name="phone"
              type="tel"
              placeholder="+1 555 123 4567"
              icon={<FiPhone aria-hidden />}
              error={errors.phone?.message}
              registerOpts={register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[+()\-.\s0-9]{7,20}$/,
                  message: "Enter a valid phone number",
                },
              })}
            />

            {/* Message */}
            <FieldTextArea
              label="Leave a message (optional)"
              name="message"
              placeholder="Anything we should know?"
              icon={<FiMessageSquare aria-hidden />}
              registerOpts={register("message")}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            >
              Next
            </button>
          </form>
        </section>

        {/* RIGHT: Order summary */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-4 space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              {/* //////////trip info////////// */}
              <div className="mb-4">
                <h2 className="text-2xl font-semibold tracking-tight text-blue-700">
                  Booking Summary
                </h2>
              </div>

              <div className="flex gap-3">
                <div className="h-15 w-28 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={b?.trip?.[0]?.img || "/img/p4.jpg"}
                    alt={b?.trip?.[0]?.title || "Trip image"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {b?.trip?.[0]?.title || "Selected trip"}
                  </h3>
                </div>
              </div>
              {/* //////////booking info////////// */}
              <dl className="mt-4 space-y-3 text-sm">
                <Row icon={<FiCalendar />} label="When">
                  {b?.data?.date || "Not selected"}
                </Row>
                <Row icon={<FiCalendar />} label="Transfer">
                  {b?.data?.transfer ? "required" : "not required"}
                </Row>
                <Row icon={<FiUsers />} label="Participants">
                  {adults} Adult{adults === 1 ? "" : "s"} | {children} child
                  {children === 1 ? "" : "ren"}
                </Row>
              </dl>

              {/* /////////total/////////// */}
              <div className="mt-4 border-t pt-4 flex items-end justify-between">
                <div>
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-xs text-gray-600">
                    All taxes and fees included
                  </p>
                </div>
                <p className="text-2xl font-bold tracking-tight">{total}$</p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

/* -------------------- Small helpers -------------------- */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  error,
  registerOpts,
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">{icon}</span>
        </span>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={`w-full rounded-lg border bg-white p-3 pl-10 outline-none transition
            ${
              error
                ? "border-rose-500 focus:ring-2 focus:ring-rose-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            }
          `}
          {...registerOpts}
        />
      </div>
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}

function FieldTextArea({
  label,
  name,
  placeholder,
  icon,
  error,
  registerOpts,
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      <div className="relative">
        <span className="absolute top-3 left-3 pointer-events-none text-gray-400">
          {icon}
        </span>
        <textarea
          id={name}
          placeholder={placeholder}
          rows={5}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          {...registerOpts}
        />
      </div>
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}

function Row({ icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-gray-500 mt-0.5">{icon}</span>
      <div>
        <dt className="text-gray-700 font-medium">{label}</dt>
        <dd className="text-gray-600">{children}</dd>
      </div>
    </div>
  );
}
