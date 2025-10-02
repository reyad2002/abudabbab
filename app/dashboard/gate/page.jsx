"use client";

import React, { useCallback, useMemo, useState } from "react";
import QrAutoScanner from "@/_components/uis/QrAutoScanner";

export default function GatePage() {
  const [status, setStatus] = useState("وجّه الكاميرا نحو الكود");
  const [error, setError] = useState("");
  const [decoded, setDecoded] = useState(null);
  const [scanKey, setScanKey] = useState(0); // to re-mount scanner

  const hasResult = useMemo(() => !!decoded, [decoded]);

  const handleScanSuccess = useCallback((text) => {
    setDecoded({ text });
    setStatus("تمت القراءة بنجاح");
    setError("");
  }, []);

  const handleScanError = useCallback((err) => {
    const message = err?.message || String(err || "") || "";
    // most errors are transient; show only permission/https errors prominently
    if (/NotAllowedError|Permission/i.test(message)) {
      setError("تم رفض إذن الكاميرا. اسمح بالوصول وأعد تحميل الصفحة.");
      setStatus("");
    }
  }, []);

  function handleRescan() {
    setDecoded(null);
    setError("");
    setStatus("جارٍ إعادة تشغيل الماسح…");
    setScanKey((k) => k + 1);
    // status will be updated by scanner on mount
    setTimeout(() => setStatus("وجّه الكاميرا نحو الكود"), 300);
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-[#0b1320] to-[#111827] text-slate-100">
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <header className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-sky-500/90 flex items-center justify-center font-extrabold shadow-lg">
            QR
          </div>
          <div>
            <h1 className="text-2xl font-bold">بوابة المسح</h1>
            <p className="text-slate-400 text-sm">استخدم الكاميرا لمسح تذاكر الزوّار</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scanner card */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 shadow-xl">
            <div className="text-slate-300 font-semibold mb-3">الماسح</div>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <div key={scanKey} className="w-full min-h-[320px] bg-black/30">
                <QrAutoScanner
                  onScanSuccess={(txt) => handleScanSuccess(txt)}
                  onScanError={(e) => handleScanError(e)}
                  fps={12}
                  qrBox={{ width: 260, height: 260 }}
                  aspectRatio={1}
                  cameraFacingMode="environment"
                  continuous={false}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handleRescan}
                className="px-4 py-2 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 disabled:opacity-60"
                disabled={!hasResult && !error}
              >
                مسح جديد
              </button>
              <span className="text-slate-400 text-sm">{status}</span>
            </div>
            {error && <div className="mt-2 text-rose-400 font-semibold">{error}</div>}
          </div>

          {/* Result card */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 shadow-xl">
            <div className="text-slate-300 font-semibold mb-2">النتيجة</div>
            {decoded ? (
              <div className="space-y-3">
                <div className="text-xs text-slate-400">النص المقروء</div>
                <div className="p-3 rounded-lg bg-slate-800/70 border border-white/10 break-all">
                  {decoded.text}
                </div>
                <div className="text-xs text-slate-400">نصائح</div>
                <ul className="list-disc pr-5 text-slate-300 text-sm space-y-1">
                  <li>تحقق من أن الكود يعود لحجز صالح في نظامك.</li>
                  <li>استخدم الزر أعلاه لمسح كود آخر.</li>
                </ul>
              </div>
            ) : (
              <div className="text-slate-400">لا توجد نتيجة بعد.</div>
            )}
          </div>
        </div>

        <footer className="text-center text-slate-400 text-xs mt-6">
          يُفضل وجود إضاءة جيدة ومسافة 15–25 سم من الكود.
        </footer>
      </div>
    </div>
  );
}
