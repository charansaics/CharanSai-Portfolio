
import AdminNavbar from '@/components/AdminNavbar';

export const metadata = {
    title: 'Admin Dashboard',
    };

    export default function AdminDashboardLayout({ children }) {
    return (

        <div>
            <AdminNavbar />
            <main className="dark:bg-black   p-10 sm:p-6">{children}</main>
        </div>
    );
}
