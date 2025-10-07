"use server"

import { cookies } from "@/node_modules/next/headers";

export async function getToken() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;
  return token
}