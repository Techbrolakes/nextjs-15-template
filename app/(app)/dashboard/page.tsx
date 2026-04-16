import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-2 text-muted">Welcome to your EasePay dashboard.</p>

      {/* Stats grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Balance" value="$0.00" />
        <StatCard label="Income (This Month)" value="$0.00" />
        <StatCard label="Expenses (This Month)" value="$0.00" />
        <StatCard label="Pending" value="$0.00" />
      </div>

      {/* Recent activity placeholder */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        <div className="mt-4 rounded-xl border border-border bg-background p-8 text-center text-sm text-muted">
          No recent transactions
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}
