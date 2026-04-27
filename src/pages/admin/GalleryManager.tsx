import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Film, 
  Upload, 
  X,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { uploadMedia, deleteMedia } from '../../lib/storage';
import { AdminLayout } from '../../components/admin/AdminLayout';

export const GalleryManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'image' | 'video'>('image');
  const [category, setCategory] = useState('General');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching gallery:', error);
    else setItems(data || []);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      if (selectedFile.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null); // No preview for videos yet
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    try {
      const publicUrl = await uploadMedia(file, 'gallery');
      
      const { error } = await supabase
        .from('gallery')
        .insert([{
          title,
          url: publicUrl,
          type,
          category
        }]);

      if (error) throw error;

      setIsModalOpen(false);
      resetForm();
      fetchItems();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await deleteMedia(item.url);
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', item.id);

      if (error) throw error;
      fetchItems();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setType('image');
    setCategory('General');
    setFile(null);
    setPreview(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="font-display font-bold text-4xl text-white mb-2">Gallery Manager</h1>
            <p className="text-white/40 text-sm">Manage event photos and cinematic videos.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-brand-cyan text-brand-dark rounded-xl font-bold text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(0,163,196,0.3)]"
          >
            <Plus size={18} /> Add New Media
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={40} className="text-brand-cyan animate-spin" />
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Loading Media...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="glass p-20 rounded-[2rem] border border-white/5 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/20 mx-auto mb-6">
              <ImageIcon size={32} />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">No media found</h3>
            <p className="text-white/40 max-w-xs mx-auto text-sm">Start by adding your first photo or video to the gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="group relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-brand-cyan/30 transition-all"
              >
                <div className="aspect-square relative overflow-hidden">
                  {item.type === 'image' ? (
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-brand-dark/50 flex items-center justify-center text-brand-cyan">
                      <Film size={40} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <p className="text-white font-bold text-sm truncate">{item.title}</p>
                    <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mt-1">{item.category}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.type === 'image' ? <ImageIcon size={14} className="text-white/40" /> : <Film size={14} className="text-brand-cyan" />}
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{item.type}</span>
                  </div>
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

        {/* Upload Modal */}
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
                className="relative w-full max-w-xl glass p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display font-bold text-white">Add New Media</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    disabled={uploading}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:bg-white/5 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setType('image')}
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                        type === 'image' ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'
                      }`}
                    >
                      <ImageIcon size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setType('video')}
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                        type === 'video' ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'
                      }`}
                    >
                      <Film size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Video</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Media Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="e.g. Resort Sunset"
                      className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-brand-cyan/50 transition-all w-full backdrop-blur-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full backdrop-blur-md appearance-none"
                    >
                      <option value="General">General</option>
                      <option value="Events">Events</option>
                      <option value="Rooms">Rooms</option>
                      <option value="Landscape">Landscape</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Upload File</label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        accept={type === 'image' ? 'image/*' : 'video/*'}
                        className="hidden"
                        id="media-upload"
                      />
                      <label
                        htmlFor="media-upload"
                        className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-white/10 rounded-[2rem] hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all cursor-pointer group relative overflow-hidden"
                      >
                        {preview ? (
                          <img src={preview} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Preview" />
                        ) : null}
                        <Upload size={32} className="text-white/20 group-hover:text-brand-cyan transition-colors mb-4 relative z-10" />
                        <span className="text-white/60 text-sm font-medium relative z-10">
                          {file ? file.name : `Select ${type === 'image' ? 'Photo' : 'Video'} File`}
                        </span>
                        <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-2 relative z-10">
                          Max size: 50MB
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading || !file || !title}
                    className="w-full relative group overflow-hidden rounded-xl font-bold text-white shadow-[0_0_20px_rgba(0,163,196,0.3)] py-4 mt-4 disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-[#00d4ff] to-brand-cyan bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]" />
                    <div className="absolute inset-[1px] bg-brand-dark/20 rounded-xl transition-opacity group-hover:opacity-0" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {uploading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={18} />
                          Confirm & Upload
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
