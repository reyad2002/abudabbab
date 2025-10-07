"use server"

import { cookies } from "@/node_modules/next/headers";

export async function getTrips(url) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("admin_token")?.value;
  try {

    const res = await axios.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    return res
  } catch (error) {}
}