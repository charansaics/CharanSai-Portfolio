
import AdminNavbar from '@/components/AdminNavbar';

export const metadata = {
    title: 'Admin Dashboard',
    };

    export default function AdminDashboardLayout({ children }) {
    return (

        <div className="dark:bg-black pt-20">
            <AdminNavbar />
            <main className="dark:bg-black pt-20 sm:p-6">{children}</main>
        </div>
    );
}
