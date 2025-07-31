// app/projects/layout.jsx
export default function ProjectsLayout({ children }) {
    return (
        <div className="pt-20 bg-black text-white min-h-screen">
    
        <main>{children}</main>
        </div>
    );
    }
