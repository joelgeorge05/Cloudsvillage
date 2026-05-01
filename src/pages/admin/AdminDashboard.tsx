import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Image as ImageIcon, 
  MapPin, 
  Waves, 
  CalendarCheck,
  TrendingUp,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router';
import { INITIAL_GALLERY, INITIAL_ATTRACTIONS, INITIAL_FACILITIES } from '../../data/initialData';

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="glass p-6 rounded-3xl border border-white/5 hover:border-brand-cyan/30 transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-dark transition-all">
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-green-400 text-xs font-bold">
          <TrendingUp size={14} /> {trend}
        </span>
      )}
    </div>
    <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
    <p className="text-3xl font-display font-bold text-white">{value}</p>
  </div>
);

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    gallery: 0,
    destinations: 0,
    facilities: 0
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [syncing, setSyncing] = useState(false);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const [
        bookingsRes,
        galleryRes,
        destinationsRes,
        facilitiesRes,
        latestBookingsRes
      ] = await Promise.all([
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        supabase.from('gallery').select('*', { count: 'exact', head: true }),
        supabase.from('destinations').select('*', { count: 'exact', head: true }),
        supabase.from('facilities').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5)
      ]);

      setStats({
        bookings: bookingsRes.count || 0,
        gallery: galleryRes.count || 0,
        destinations: destinationsRes.count || 0,
        facilities: facilitiesRes.count || 0
      });
      setRecentBookings(latestBookingsRes.data || []);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSync = async () => {
    if (!confirm('This will copy all existing website images and data to your admin panel. Continue?')) return;
    
    setSyncing(true);
    try {
      // 1. Sync Gallery
      const { count: galCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true });
      if (galCount === 0) {
        const galData = INITIAL_GALLERY.map(img => ({ title: img.title, url: img.url }));
        await supabase.from('gallery').insert(galData);
      }

      // 2. Sync Destinations
      const { count: destCount } = await supabase.from('destinations').select('*', { count: 'exact', head: true });
      if (destCount === 0) {
        const destData = INITIAL_ATTRACTIONS.map(attr => ({
          title: attr.title,
          description: attr.description,
          image_url: attr.image_url,
          distance: attr.distance,
          map_link: attr.map_link
        }));
        await supabase.from('destinations').insert(destData);
      }

      // 3. Sync Facilities
      const { count: facCount } = await supabase.from('facilities').select('*', { count: 'exact', head: true });
      if (facCount === 0) {
        const facData = INITIAL_FACILITIES.map(fac => ({
          title: fac.title,
          description: fac.description,
          image_url: fac.image_url,
          category: fac.category,
          badge: fac.badge
        }));
        await supabase.from('facilities').insert(facData);
      }

      await fetchStats();
      alert('Database synchronized successfully!');
    } catch (err) {
      console.error('Sync failed:', err);
      alert('Failed to sync database. Please ensure your Supabase tables are created.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="font-display font-bold text-4xl text-white mb-2">Dashboard Overview</h1>
            <p className="text-white/40 text-sm">Welcome back! Here's what's happening with Cloud Village today.</p>
          </div>
          <button 
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-6 py-3 bg-brand-cyan text-brand-dark font-bold rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,163,196,0.3)] disabled:opacity-50"
          >
            <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing...' : 'Sync from Website'}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Bookings" value={stats.bookings} icon={CalendarCheck} />
          <StatCard title="Gallery Items" value={stats.gallery} icon={ImageIcon} />
          <StatCard title="Destinations" value={stats.destinations} icon={MapPin} />
          <StatCard title="Facilities" value={stats.facilities} icon={Waves} />
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Main Bookings View */}
          <div className="glass p-8 rounded-[2rem] border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Recent Inquiries</h2>
                <p className="text-white/40 text-xs mt-1">Latest guest requests received via the website.</p>
              </div>
              <button 
                onClick={() => navigate('/admin/bookings')}
                className="px-6 py-2 rounded-xl bg-brand-cyan/10 text-brand-cyan text-xs font-bold hover:bg-brand-cyan hover:text-brand-dark transition-all"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Date</th>
                    <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Guest</th>
                    <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Contact Info</th>
                    <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Message Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentBookings.length > 0 ? (
                    recentBookings.map((booking, i) => (
                      <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 text-xs text-white/60">
                          {booking.created_at ? new Date(booking.created_at).toLocaleDateString() : 'Date Unknown'}
                        </td>
                        <td className="py-4">
                          <div className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">{booking.name}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-xs text-white/80">{booking.email}</div>
                          <div className="text-[10px] text-white/40">{booking.phone}</div>
                        </td>
                        <td className="py-4">
                          <p className="text-xs text-white/50 line-clamp-1 italic max-w-xs">
                            "{booking.message}"
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-white/20 text-sm">
                        No bookings received yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Grid: Quick Actions & More */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-[2rem] border border-white/10">
              <h2 className="text-xl font-display font-bold text-white mb-6">Content Management</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/admin/gallery')}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all text-white font-bold text-sm group"
                >
                  Gallery <ArrowUpRight size={18} className="text-white/20 group-hover:text-brand-cyan transition-colors" />
                </button>
                <button 
                  onClick={() => navigate('/admin/destinations')}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all text-white font-bold text-sm group"
                >
                  Destinations <ArrowUpRight size={18} className="text-white/20 group-hover:text-brand-cyan transition-colors" />
                </button>
                <button 
                  onClick={() => navigate('/admin/home')}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all text-white font-bold text-sm group"
                >
                  Edit Texts <ArrowUpRight size={18} className="text-white/20 group-hover:text-brand-cyan transition-colors" />
                </button>
                <button 
                  onClick={() => navigate('/admin/facilities')}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all text-white font-bold text-sm group"
                >
                  Facilities <ArrowUpRight size={18} className="text-white/20 group-hover:text-brand-cyan transition-colors" />
                </button>
              </div>
            </div>

            <div className="glass p-8 rounded-[2rem] border border-white/10 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-4">
                <CalendarCheck size={32} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Want to see more details?</h3>
              <p className="text-white/40 text-sm max-w-xs mb-6">The full bookings page allows you to filter, search, and delete records.</p>
              <button 
                onClick={() => navigate('/admin/bookings')}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-brand-cyan hover:text-brand-dark transition-all"
              >
                Go to Full Bookings Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
