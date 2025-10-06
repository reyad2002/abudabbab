"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // delete browser cookie for this origin (localhost:3000)
  cookies().delete({
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