import type { OrderSummary } from "./types";

interface OrderSummaryCardProps {
  order: OrderSummary;
}

export default function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <p className="text-sm font-semibold text-gray-900">
          #{order.orderNumber}
        </p>
      </div>
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
        {order.status}
      </span>
    </div>
  );
}
