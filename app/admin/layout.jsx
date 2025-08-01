import AdminNavbar from "@/components/AdminNavbar";


export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen pt-6 bg-black text-white">
        <AdminNavbar />
        <main>{children}</main>
        </div>
    );
}
