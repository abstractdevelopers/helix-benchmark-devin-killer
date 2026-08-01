import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="p-8">
        <p>Please sign in.</p>
      </main>
    );
  }

  const teamId = session.user.teamId;
  const subscription = teamId
    ? await prisma.subscription.findFirst({
        where: { teamId },
        orderBy: { currentPeriodEnd: "desc" },
      })
    : null;
  const snapshot = teamId
    ? await prisma.usageSnapshot.findFirst({
        where: { teamId },
        orderBy: { createdAt: "desc" },
      })
    : null;

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded bg-white p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Team</h2>
          <p className="text-sm text-gray-600">{session.user.email}</p>
          <p className="text-sm text-gray-600">Role: {session.user.role}</p>
          <p className="text-sm text-gray-600">Team ID: {teamId ?? "—"}</p>
        </div>
        <div className="rounded bg-white p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Subscription</h2>
          <p className="text-sm text-gray-600">Plan: {subscription?.plan ?? "free"}</p>
          <p className="text-sm text-gray-600">Status: {subscription?.status ?? "active"}</p>
        </div>
        <div className="rounded bg-white p-6 shadow md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Usage Snapshot</h2>
          <p className="text-sm text-gray-600">Period: {snapshot?.period ?? "—"}</p>
          <p className="text-sm text-gray-600">Units: {snapshot?.units ?? 0}</p>
          <p className="text-sm text-gray-600">Cost: {snapshot?.costCents ?? 0} cents</p>
        </div>
      </div>
    </main>
  );
}
