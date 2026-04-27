import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Image as ImageIcon, 
  MapPin, 
  Waves, 
  CalendarCheck,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';

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
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="font-display font-bold text-4xl text-white mb-2">Dashboard Overview</h1>
          <p className="text-white/40 text-sm">Welcome back! Here's what's happening with Cloud Village today.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Bookings" value="24" icon={CalendarCheck} trend="+12%" />
          <StatCard title="Gallery Items" value="48" icon={ImageIcon} />
          <StatCard title="Destinations" value="12" icon={MapPin} />
          <StatCard title="Facilities" value="16" icon={Waves} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="glass p-8 rounded-[2rem] border border-white/10">
            <h2 className="text-xl font-display font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all text-white font-bold text-sm group">
                Upload to Gallery <ArrowUpRight size={18} className="text-white/20 group-hover:text-brand-cyan transition-colors" />
              </button>
              <button className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all text-white font-bold text-sm group">
                Add Destination <ArrowUpRight size={18} className="text-white/20 group-hover:text-brand-cyan transition-colors" />
              </button>
              <button className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all text-white font-bold text-sm group">
                Edit Hero Text <ArrowUpRight size={18} className="text-white/20 group-hover:text-brand-cyan transition-colors" />
              </button>
              <button className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all text-white font-bold text-sm group">
                Change BG Video <ArrowUpRight size={18} className="text-white/20 group-hover:text-brand-cyan transition-colors" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass p-8 rounded-[2rem] border border-white/10">
            <h2 className="text-xl font-display font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[
                { user: 'Admin', action: 'uploaded 4 new photos', time: '2 hours ago' },
                { user: 'Admin', action: 'updated Kottappara description', time: '5 hours ago' },
                { user: 'System', action: 'New booking request received', time: '1 day ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
                    <Users size={14} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      <span className="text-brand-cyan font-bold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
