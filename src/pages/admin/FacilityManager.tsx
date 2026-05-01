import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Waves, 
  Upload, 
  X,
  CheckCircle2,
  Loader2,
  Edit3,
  RefreshCw
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { uploadMedia, deleteMedia } from '../../lib/storage';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { INITIAL_FACILITIES } from '../../data/initialData';

export const FacilityManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Accommodations');
  const [badge, setBadge] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching facilities:', error);
      } else {
        setItems(data || []);
      }
    } catch (err) {
      console.error('Unexpected error fetching facilities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || (!file && !editingItem)) return;

    setUploading(true);
    try {
      let imageUrl = editingItem?.image_url;

      if (file) {
        if (editingItem?.image_url) {
          await deleteMedia(editingItem.image_url);
        }
        imageUrl = await uploadMedia(file, 'facilities');
      }
      
      const payload = {
        title,
        description,
        category,
        badge,
        image_url: imageUrl
      };

      let error;
      if (editingItem) {
        const { error: updateError } = await supabase
          .from('facilities')
          .update(payload)
          .eq('id', editingItem.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('facilities')
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      setIsModalOpen(false);
      resetForm();
      fetchItems();
    } catch (err: any) {
      console.error('Operation failed:', err);
      alert(`Operation failed: ${err.message || 'Unknown error occurred'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm('Are you sure you want to delete this facility?')) return;

    try {
      await deleteMedia(item.image_url);
      const { error } = await supabase
        .from('facilities')
        .delete()
        .eq('id', item.id);

      if (error) throw error;
      fetchItems();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setBadge(item.badge || '');
    setPreview(item.image_url);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setTitle('');
    setDescription('');
    setCategory('Accommodations');
    setBadge('');
    setFile(null);
    setPreview(null);
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const facData = INITIAL_FACILITIES.map(fac => ({
        title: fac.title,
        description: fac.description,
        image_url: fac.image_url,
        category: fac.category,
        badge: fac.badge
      }));
      const { error } = await supabase.from('facilities').insert(facData);
      if (error) throw error;
      fetchItems();
    } catch (err) {
      console.error('Sync failed:', err);
      alert('Failed to sync. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="font-display font-bold text-4xl text-white mb-2">Facilities & Experiences</h1>
            <p className="text-white/40 text-sm">Manage resort amenities and activities.</p>
          </div>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-xl font-bold text-sm hover:bg-white/10 transition-all border border-white/10"
              >
                <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
                {syncing ? 'Syncing...' : 'Sync from Website'}
              </button>
            )}
            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="flex items-center gap-2 px-6 py-3 bg-brand-cyan text-brand-dark rounded-xl font-bold text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(0,163,196,0.3)]"
            >
              <Plus size={18} /> Add Facility
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={40} className="text-brand-cyan animate-spin" />
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Loading Facilities...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="glass p-20 rounded-[2rem] border border-white/5 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/20 mx-auto mb-6">
              <Waves size={32} />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">No facilities found</h3>
            <p className="text-white/40 max-w-xs mx-auto text-sm mb-8">Start by adding your first resort facility or import data from the website.</p>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-cyan text-brand-dark rounded-2xl font-bold hover:bg-white transition-all shadow-[0_0_30px_rgba(0,163,196,0.2)] disabled:opacity-50"
            >
              <RefreshCw size={20} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Importing...' : 'Import from Website'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-brand-cyan/30 transition-all flex flex-col"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  {item.badge && (
                    <div className="absolute top-4 right-4 bg-brand-cyan/80 backdrop-blur-xl px-3 py-1 rounded-full text-[9px] font-bold text-brand-dark tracking-wider shadow-lg">
                      {item.badge}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold text-white/70 uppercase tracking-[0.2em]">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-white font-display font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-3">{item.description}</p>
                </div>
                <div className="p-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md"
                onClick={() => !uploading && setIsModalOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="relative w-full max-w-2xl glass p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display font-bold text-white">{editingItem ? 'Edit' : 'Add'} Facility</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    disabled={uploading}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:bg-white/5 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Facility Name</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="e.g. Suite Room"
                        className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full appearance-none"
                      >
                        <option value="Accommodations">Accommodations</option>
                        <option value="Facilities">Facilities</option>
                        <option value="Dining">Dining</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Activities">Activities</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={3}
                      placeholder="Describe the facility..."
                      className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Badge (optional, e.g. PREMIUM)</label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="PREMIUM choice"
                      className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Facility Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        id="fac-upload"
                      />
                      <label
                        htmlFor="fac-upload"
                        className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-[2rem] hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all cursor-pointer group relative overflow-hidden h-40"
                      >
                        {preview ? (
                          <img src={preview} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Preview" />
                        ) : null}
                        <Upload size={24} className="text-white/20 group-hover:text-brand-cyan transition-colors mb-2 relative z-10" />
                        <span className="text-white/60 text-xs font-medium relative z-10">
                          {file ? file.name : (editingItem ? 'Change Photo' : 'Select Photo')}
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading || (!file && !editingItem) || !title}
                    className="w-full relative group overflow-hidden rounded-xl font-bold text-white shadow-[0_0_20px_rgba(0,163,196,0.3)] py-4 mt-4 disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-[#00d4ff] to-brand-cyan bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]" />
                    <div className="absolute inset-[1px] bg-brand-dark/20 rounded-xl transition-opacity group-hover:opacity-0" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {uploading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={18} />
                          {editingItem ? 'Save Changes' : 'Create Facility'}
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
