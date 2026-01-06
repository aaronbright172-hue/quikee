import { supabase } from '@/lib/supabase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const revalidate = 0; // Force dynamic rendering, re-fetch on every request

export default async function AdminOrdersPage() {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Admin: Orders</h1>
        <p className="text-red-500">Error fetching orders: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin: Orders</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-neutral-500">No orders found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Amount (Fiat)</TableHead>
                <TableHead>Amount (Crypto)</TableHead>
                <TableHead>Payment Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.user_first_name} {order.user_last_name}</div>
                    <div className="text-sm text-neutral-500">{order.user_email}</div>
                  </TableCell>
                  <TableCell>${order.original_fiat_amount?.toFixed(2)}</TableCell>
                  <TableCell>{order.converted_crypto_amount} {order.selected_crypto_code}</TableCell>
                  <TableCell className="font-mono text-xs">{order.payment_address}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.payment_status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
