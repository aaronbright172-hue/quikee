import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <nav className="flex items-center space-x-4">
            <Link href="/admin/orders" className="text-gray-600 hover:text-gray-900">
              Orders
            </Link>
            <Link href="/admin/crypto-settings" className="text-gray-600 hover:text-gray-900">
              Crypto Settings
            </Link>
            <form action="/auth/sign-out" method="post">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
