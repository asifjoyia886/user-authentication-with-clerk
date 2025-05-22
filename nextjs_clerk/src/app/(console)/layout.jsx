import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li>
              <Link href="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/posts" className="block py-2 px-4 hover:bg-gray-700 rounded">
                posts
              </Link>
            </li>
            

            <Link href="/contact" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Contact
            </Link>

          </ul>
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-8 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
