import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">SaaS Dashboard</h1>
      <p className="mb-8 text-lg text-gray-600">Team analytics and billing, all in one place.</p>
      <Link
        href="/dashboard"
        className="rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
