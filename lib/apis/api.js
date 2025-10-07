"use server"

import axios from "@/node_modules/axios/index";
import { cookies } from "@/node_modules/next/headers";

export async function getTrips(url) {
  const cookieStore = cookies();
  if (!cookieStore) console.log("cookie")
  const token = (await cookieStore).get("access_token")?.value;
  console.log(token)
  try {

    const res = await axios.get(url,
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

      });
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
    return "error ee"
  }
}