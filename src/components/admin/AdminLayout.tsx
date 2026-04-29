import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  MapPin, 
  Settings, 
  LogOut, 
  Home,
  CalendarCheck,
  Waves,
  Film,
  Menu,
  X as XIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Gallery', icon: ImageIcon, path: '/admin/gallery' },
    { label: 'Destinations', icon: MapPin, path: '/admin/destinations' },
    { label: 'Facilities', icon: Waves, path: '/admin/facilities' },
    { label: 'Home Page', icon: Home, path: '/admin/home' },
    { label: 'Bookings', icon: CalendarCheck, path: '/admin/bookings' },
  ];

  return (
    <div className="min-h-[100svh] bg-brand-dark flex flex-col md:flex-row font-sans overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-brand-dark z-[60]">
        <Link to="/" className="font-display font-bold text-xl text-white tracking-tighter">
          Clouds <span className="text-brand-cyan italic font-light">Village</span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          {isMobileMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-[40]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300
        fixed md:static inset-y-0 left-0 z-[50] h-full
        w-64 border-r border-white/10 flex flex-col shrink-0 bg-brand-dark
      `}>
        <div className="hidden md:block p-8 border-b border-white/10">
          <Link to="/" className="font-display font-bold text-2xl text-white tracking-tighter hover:text-brand-cyan transition-colors">
            Clouds <span className="text-brand-cyan italic font-light">Village</span>
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase">Admin Online</span>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-16 md:mt-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-brand-cyan text-brand-dark shadow-[0_0_20px_rgba(0,163,196,0.2)]'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10 space-y-4">
          <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Logged in as</p>
            <p className="text-white text-xs font-medium truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-400 hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow h-full md:h-screen overflow-y-auto bg-brand-surface/30">
        <div className="p-4 md:p-8 lg:p-12 pb-24 md:pb-12">
          {children}
        </div>
      </main>
    </div>
  );
};
