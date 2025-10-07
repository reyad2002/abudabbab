"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // delete browser cookie for this origin (localhost:3000)
  await cookies().delete({
    name: "access_token",
    path: "/",           // MUST match how you set it
    secure: true,        // if you set it with Secure
    sameSite: "none",    // if you set it with SameSite=None
  });

  // optional: tell backend to revoke the session (no need to forward cookies)
  try {
    await fetch("https://abudabbba-backend.vercel.app/api/admin/auth/logout", {
      method: "POST",
      // you can send Authorization header if you want, but not required for revoke
      cache: "no-store",
    });
  } catch (e) {
    console.log("revoke failed (ignored):", e);
  }

  // send the user away
  redirect("/dashboard");
}

export async function login({ email, password }) {
  try {
    const res = await fetch("https://abudabbba-backend.vercel.app/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      // try to read an error payload, but fall back gracefully
      let message = "Login failed";
      try {
        const body = await res.json();
        message = body?.error?.message ?? body?.message ?? message;
      } catch {}
      throw new Error(message);
    }

    const { access_token } = await res.json();
    if (!access_token) throw new Error("No access token returned");

    // 👇 set cookie on the server (HttpOnly etc.)
    cookies().set({
      name: "access_token",
      value: access_token,
      httpOnly: true,      // protects from client-side JS access
      secure: true,        // required if SameSite=None; true in prod/HTTPS
      sameSite: "none",    // use 'lax' if you're not doing cross-site request
    });

    // go to dashboard (or return something if you prefer)
    // redirect("/dashboard");
  } catch (err) {
    // don't JSON.parse an Error object – just use err.message
    throw new Error(err?.message || "Login failed");
  }
}