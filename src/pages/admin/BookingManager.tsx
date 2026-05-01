import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Trash2, 
  Search,
  Filter,
  CheckCircle2,
  Clock,
  X,
  Send,
  AlertCircle
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';

export const BookingManager = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const openConfirmationModal = (booking: any) => {
    setSelectedBooking(booking);
    
    // Safely format date
    let formattedDate = 'the requested dates';
    if (booking.date) {
      const d = new Date(booking.date);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString();
      }
    }

    setConfirmationMessage(`Dear ${booking.name},\n\nYour booking request for ${formattedDate} has been successfully confirmed!\n\nBooking Details:\n${booking.message}\n\nWe look forward to hosting you.\n\nBest regards,\nCloud Village`);
  };

  const closeConfirmationModal = () => {
    setSelectedBooking(null);
    setConfirmationMessage('');
  };

  const handleSendEmail = async () => {
    if (!selectedBooking) return;

    // Update local UI immediately so it reflects the change
    setBookings(bookings.map(b => b.id === selectedBooking.id ? { ...b, status: 'confirmed' } : b));

    // Try to update using a prefix hack so the user doesn't have to alter the Supabase schema
    await supabase
      .from('bookings')
      .update({ message: `[CONFIRMED]\n${selectedBooking.message || ''}` })
      .eq('id', selectedBooking.id);

    // Also attempt standard status update just in case they added the column
    supabase.from('bookings').update({ status: 'confirmed' }).eq('id', selectedBooking.id);

    const subject = encodeURIComponent("Booking Confirmation - Cloud Village");
    const body = encodeURIComponent(confirmationMessage);
    
    // Add visual feedback before triggering mailto
    alert("Confirmation marked! Opening your default email app to send the message...");
    
    // Use a hidden anchor tag to trigger mailto reliably without popup blockers
    const mailtoLink = `mailto:${selectedBooking.email}?subject=${subject}&body=${body}`;
    const link = document.createElement('a');
    link.href = mailtoLink;
    // Some browsers need target="_blank" on the anchor
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    closeConfirmationModal();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching bookings:', error);
        alert('Error fetching bookings: ' + error.message);
      }

      if (data) {
        const processedData = data.map(b => {
          // Handle standard status or the fallback message prefix
          const messageStr = b.message || '';
          if (b.status === 'confirmed' || (typeof messageStr === 'string' && messageStr.startsWith('[CONFIRMED]\n'))) {
            return {
              ...b,
              status: 'confirmed',
              message: typeof messageStr === 'string' ? messageStr.replace('[CONFIRMED]\n', '') : messageStr
            };
          }
          return b;
        });
        setBookings(processedData);
      }
    } catch (err) {
      console.error('Unexpected error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking record?')) {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (!error) {
        setBookings(bookings.filter(b => b.id !== id));
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      String(booking.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(booking.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="font-display font-bold text-4xl text-white mb-2">Bookings & Inquiries</h1>
            <p className="text-white/40 text-sm">Review and manage reservation requests from your website.</p>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-cyan transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-cyan/50 transition-all"
            />
          </div>
          <div className="flex gap-2">
             <button className="flex-grow glass border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/60 hover:text-white transition-all">
               <Filter size={18} /> Filters
             </button>
             <button 
              onClick={fetchBookings}
              className="w-14 glass border border-white/10 rounded-2xl flex items-center justify-center text-white/60 hover:text-brand-cyan transition-all"
             >
               <Clock size={18} />
             </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/40">Loading bookings...</p>
            </div>
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={booking.id}
                className="glass p-6 rounded-3xl border border-white/5 hover:border-brand-cyan/20 transition-all group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{booking.name}</h3>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest">
                          {booking.created_at ? new Date(booking.created_at).toLocaleString() : 'Date Unknown'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                      <Mail size={16} className="text-brand-cyan" />
                      <span className="text-sm">{booking.email}</span>
                    </div>
                    {booking.phone && (
                      <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                        <Phone size={16} className="text-brand-cyan" />
                        <span className="text-sm">{booking.phone}</span>
                      </div>
                    )}
                    {booking.date && (
                      <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                        <Calendar size={16} className="text-brand-cyan" />
                        <span className="text-sm">
                          Requested: {booking.date ? new Date(booking.date).toLocaleDateString() : 'TBD'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="flex items-start gap-3">
                        <MessageSquare size={16} className="text-brand-cyan mt-1 shrink-0" />
                        <p className="text-white/70 text-sm leading-relaxed italic">
                          "{booking.message}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1 flex lg:flex-col justify-end gap-2">
                    <button 
                      onClick={() => deleteBooking(booking.id)}
                      className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                      title="Delete Record"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button 
                      onClick={() => openConfirmationModal(booking)}
                      disabled={booking.status === 'confirmed'}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg ${booking.status === 'confirmed' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan cursor-not-allowed' : 'bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white'}`}
                      title={booking.status === 'confirmed' ? "Already Confirmed" : "Confirm Booking"}
                    >
                      <CheckCircle2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="glass p-20 rounded-[3rem] border border-white/5 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/10">
                <Calendar size={40} />
              </div>
              <h2 className="text-white text-xl font-bold mb-2">No bookings found</h2>
              <p className="text-white/40 max-w-xs mx-auto">When customers fill out the contact form, they will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bulletproof Modal Overlay */}
      {selectedBooking && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md z-[99999]"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={closeConfirmationModal}
        >
          <div 
            className="bg-[#0f172a] w-full max-w-2xl rounded-3xl border border-brand-cyan/30 overflow-hidden shadow-[0_0_50px_rgba(0,163,196,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Mail className="text-brand-cyan" size={24} />
                Confirm Booking for {selectedBooking.name}
              </h3>
              <button 
                onClick={closeConfirmationModal}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-red-500/20 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2 block">
                  Confirmation Email Message
                </label>
                <textarea
                  value={confirmationMessage}
                  onChange={(e) => setConfirmationMessage(e.target.value)}
                  className="w-full h-64 bg-black/50 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-cyan/50 focus:bg-black/80 transition-all resize-none shadow-inner"
                  placeholder="Type your confirmation message here..."
                />
              </div>
              <p className="text-brand-cyan/80 text-sm font-medium flex items-start gap-2 bg-brand-cyan/10 p-3 rounded-xl border border-brand-cyan/20">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                Clicking send will mark this booking as Confirmed and open your computer's default email app (like Outlook or Mail) with this message ready to send.
              </p>
            </div>

            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button
                onClick={closeConfirmationModal}
                className="px-6 py-3 rounded-xl font-bold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                className="px-6 py-3 bg-brand-cyan text-[#0f172a] rounded-xl font-bold hover:bg-[#00d4ff] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,163,196,0.3)] hover:shadow-[0_0_30px_rgba(0,163,196,0.5)] transform hover:-translate-y-0.5"
              >
                <Send size={18} />
                Send Confirmation Email
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
