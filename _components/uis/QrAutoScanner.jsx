"use client";

import { useEffect, useRef, useState } from "react";

// This component auto-starts the camera and scans QR codes on mount.
// It cleans up the camera stream on unmount and after a successful scan (unless continuous is true).
// Props:
// - onScanSuccess(text): called when a QR is scanned successfully
// - onScanError(err): optional; called on scan errors
// - fps: optional; frames per second for scanning
// - qrBox: optional; size or {width,height} for the scanning box
// - aspectRatio: optional; preferred camera preview aspect ratio
// - continuous: optional; keep scanning after first success (default false)
// - cameraFacingMode: optional; "environment" (default) or "user"
export default function QrAutoScanner({
	onScanSuccess,
	onScanError,
	fps = 10,
	qrBox = 250,
	aspectRatio = 1.777,
	continuous = false,
	cameraFacingMode = "environment",
}) {
	const containerRef = useRef(null);
	const scannerRef = useRef(null);
	const startedRef = useRef(false);
	const [error, setError] = useState(null);
	const [permissionRequested, setPermissionRequested] = useState(false);

	useEffect(() => {
		let isMounted = true;

		async function init() {
			if (!isMounted || startedRef.current || !containerRef.current) return;

			try {
				// Dynamically import to avoid SSR issues
				const { Html5Qrcode } = await import("html5-qrcode");

				const elementId = `qr-reader-${Math.random().toString(36).slice(2)}`;
				const el = document.createElement("div");
				el.id = elementId;
				el.style.width = "100%";
				containerRef.current.innerHTML = "";
				containerRef.current.appendChild(el);

				const scanner = new Html5Qrcode(elementId, { verbose: false });
				scannerRef.current = scanner;

				startedRef.current = true;
				setPermissionRequested(true);

				await scanner.start(
					{ facingMode: cameraFacingMode },
					{ fps, qrbox: qrBox, aspectRatio },
					(decodedText, decodedResult) => {
						if (!continuous) {
							// stop scanning after first success
							scanner
								.stop()
								.then(() => scanner.clear())
								.catch(() => {});
							startedRef.current = false;
						}
						onScanSuccess?.(decodedText, decodedResult);
					}
				);
				setError(null);
			} catch (err) {
				setError(err?.message || String(err));
				onScanError?.(err);
			}
		}

		init();

		return () => {
			isMounted = false;
			const scanner = scannerRef.current;
			if (scanner && startedRef.current) {
				scanner
					.stop()
					.then(() => scanner.clear())
					.catch(() => {});
			}
		};
	}, [fps, qrBox, aspectRatio, continuous, cameraFacingMode, onScanError, onScanSuccess]);

	return (
		<div className="w-full">
			<div ref={containerRef} />
			{!permissionRequested && (
				<p style={{ marginTop: 8 }}>Camera will be requested automatically…</p>
			)}
			{error && (
				<div style={{ color: "#b91c1c", marginTop: 8 }}>
					{error.includes("NotAllowedError")
						? "Camera permission denied. Please allow camera access and reload."
						: error}
				</div>
			)}
		</div>
	);
}


