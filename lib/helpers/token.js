"use server"

import { cookies } from "@/node_modules/next/headers";

export async function getToken() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("admin_token")?.value;
  return token
}