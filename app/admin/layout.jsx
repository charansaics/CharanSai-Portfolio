import AdminNavbar from "@/components/AdminNavbar";


export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-black text-white">
        <AdminNavbar />
        <main>{children}</main>
        </div>
    );
}
