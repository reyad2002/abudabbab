"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * BookingScanner.jsx
 *
 * A lightweight React (Next.js-ready) QR scanner that:
 *  - Opens the camera
 *  - Reads a QR containing { bid: ObjectId, ref? } OR any text containing a 24-char ObjectId
 *  - Fetches /api/bookings/:id and shows (trip, client name, phone, date, total, payment status)
 *
 * Usage (Next.js 13+):
 *   - Install dependency:  npm i html5-qrcode
 *   - Place this file anywhere under your app/ or components/ and import it in a client page:
 *       export default function Page(){ return <BookingScanner /> }
 *   - If your API lives elsewhere, pass apiBase: <BookingScanner apiBase="https://api.example.com" />
 */

export default function BookingScanner({ apiBase }) {
  const readerId = useRef(`qr-reader-${Math.random().toString(36).slice(2)}`);
  const scannerRef = useRef(null);

  const [status, setStatus] = useState("يتم تشغيل الكاميرا…");
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [resetKey, setResetKey] = useState(0); // trigger re-render of scanner

  const [details, setDetails] = useState({
    trip: "—",
    client: "—",
    phone: "—",
    ref: "—",
    date: "—",
    totalEgp: "—",
    payment: false,
  });

  const baseUrl = useMemo(() => {
    if (apiBase) return apiBase.replace(/\/$/, "");
    if (typeof window !== "undefined") return window.location.origin;
    return "";
  }, [apiBase]);

  function parseScan(text) {
    // Try JSON { bid: "...", ref? }
    try {
      const obj = JSON.parse(text);
      if (obj && obj.bid) return { bid: String(obj.bid), ref: obj.ref || null };
    } catch (_) {}
    // Try extract 24-hex ObjectId from any string
    const m = String(text).match(/[a-f\d]{24}/i);
    if (m) return { bid: m[0], ref: null };
    return null;
  }

  async function fetchBooking(bid, refFromQR) {
    const res = await fetch(`${baseUrl}/api/bookings/${bid}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Request failed");
    const b = await res.json();
    const ref = (b._id || "").slice(-8).toUpperCase();
    return {
      trip: b?.tripInfo?.name || "—",
      client:
        [b?.user?.firstName, b?.user?.lastName].filter(Boolean).join(" ") ||
        "—",
      phone: b?.user?.phone || "—",
      ref: refFromQR || ref,
      date: b?.bookingDate
        ? new Date(b.bookingDate).toLocaleString("ar-EG")
        : "—",
      totalEgp:
        b?.totalPrice?.egp != null ? Number(b.totalPrice.egp).toFixed(2) : "—",
      payment: !!b?.payment,
    };
  }

  useEffect(() => {
    let cancelled = false;

    async function start() {
      setError("");
      setStatus("يتم تشغيل الكاميرا…");
      try {
        const { Html5QrcodeScanner } = await import("html5-qrcode");
        const scanner = new Html5QrcodeScanner(
          readerId.current,
          {
            fps: 12,
            qrbox: { width: 280, height: 280 },
            rememberLastUsedCamera: true,
            showTorchButtonIfSupported: true,
            showZoomSliderIfSupported: true,
            aspectRatio: 1,
          },
          false // verbose
        );
        scannerRef.current = scanner;
        scanner.render(onScanSuccess, onScanFailure);
        if (!cancelled) setScanning(true);
      } catch (e) {
        setError("تعذر تشغيل الكاميرا. تأكد من الأذونات/المتصفح.");
      }
    }

    start();

    return () => {
      cancelled = true;
      const s = scannerRef.current;
      if (s) {
        s.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  async function onScanSuccess(decodedText) {
    // stop scanning during fetch
    const s = scannerRef.current;
    if (s) {
      try {
        await s.clear();
      } catch (_) {}
      scannerRef.current = null;
    }
    setScanning(false);
    setStatus("تمت القراءة. جارِ جلب التفاصيل…");

    const parsed = parseScan(decodedText);
    if (!parsed) {
      setError("كود غير صالح.");
      setStatus("");
      return;
    }

    try {
      const d = await fetchBooking(parsed.bid, parsed.ref);
      setDetails(d);
      setStatus("تم عرض التفاصيل.");
      setError("");
    } catch (e) {
      setError("تعذر جلب تفاصيل الحجز.");
      setStatus("");
    }
  }

  function onScanFailure(_) {
    // ignore frequent failures; the library retries
  }

  function handleReset() {
    setStatus("");
    setError("");
    setResetKey((k) => k + 1);
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#0b1320] to-[#111827] text-slate-200"
    >
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <header className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center font-bold">
            QR
          </div>
          <div>
            <h1 className="text-xl font-semibold">ماسح الحجوزات</h1>
            <p className="text-slate-400 text-sm">
              وجّه الكاميرا نحو كود التذكرة لإظهار التفاصيل
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scanner Card */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 shadow-xl">
            <div id={readerId.current} className="w-full min-h-[360px]" />

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 disabled:opacity-60"
                disabled={scanning}
              >
                مسح جديد
              </button>
              <span className="text-slate-400 text-sm">{status}</span>
            </div>
            {error && (
              <div className="mt-2 text-rose-400 font-semibold">{error}</div>
            )}
          </div>

          {/* Details Card */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 shadow-xl">
            <div className="text-slate-400 text-sm">تفاصيل الحجز</div>
            <div className="text-2xl font-bold tracking-wide mt-1">
              {details.trip}
            </div>

            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold border ${
                  details.payment
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/40"
                }`}
              >
                {details.payment ? "مدفوع ✅" : "غير مدفوع ❌"}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <Row label="رقم المرجع" value={details.ref} />
              <Row label="العميل" value={details.client} />
              <Row label="الهاتف" value={details.phone} />
              <Row label="التاريخ" value={details.date} />
              <Row label="إجمالي (EGP)" value={details.totalEgp} />
            </div>
          </div>
        </div>

        <footer className="text-center text-slate-400 text-xs mt-4">
          يُفضّل إضاءة جيدة ومسافة 15–25 سم من الكود.
        </footer>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 text-slate-400 text-sm">{label}</div>
      <div className="font-semibold">{value ?? "—"}</div>
    </div>
  );
}
