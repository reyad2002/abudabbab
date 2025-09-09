import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>404 — Page not found</h1>
      <p>Sorry, we couldn’t find that.</p>
      <Link href="/">Go home</Link>
    </main>
  );
}