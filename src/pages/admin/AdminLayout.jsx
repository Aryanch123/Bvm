import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { verifyToken } from '../../services/api';

const navLinks = [
    { to: '/admin', icon: 'dashboard', label: 'Dashboard', end: true },
    { to: '/admin/categories', icon: 'category', label: 'Categories' },
    { to: '/admin/products', icon: 'inventory_2', label: 'Products' },
    { to: '/admin/site-images', icon: 'photo_library', label: 'Site Images' },
    { to: '/admin/certificates', icon: 'workspace_premium', label: 'Certificates' },
];

const AdminLayout = () => {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        verifyToken()
            .then(() => setChecking(false))
            .catch(() => navigate('/admin/login'));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('bvm_admin_token');
        navigate('/admin/login');
    };

    if (checking) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <span className="text-neutral-400">Verifying session...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo */}
                <div className="p-6 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                            <span className="material-icons-outlined text-primary text-lg">shield</span>
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">BVM Industries</p>
                            <p className="text-neutral-500 text-xs">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                                }`
                            }
                        >
                            <span className="material-icons-outlined text-xl">{link.icon}</span>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-neutral-800">
                    <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all mb-1">
                        <span className="material-icons-outlined text-xl">open_in_new</span>
                        View Website
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-red-400 hover:bg-red-900/10 transition-all"
                    >
                        <span className="material-icons-outlined text-xl">logout</span>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-neutral-400 hover:text-white"
                    >
                        <span className="material-icons-outlined">menu</span>
                    </button>
                    <h1 className="text-white font-semibold text-sm flex-1">Admin Dashboard</h1>
                    <span className="text-neutral-500 text-xs hidden sm:block">rajaryagautam@gmail.com</span>
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
