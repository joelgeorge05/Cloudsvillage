import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Save, 
  Film, 
  Type, 
  CheckCircle2,
  Loader2,
  Upload
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { uploadMedia } from '../../lib/storage';
import { AdminLayout } from '../../components/admin/AdminLayout';

export const HomeManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Settings State
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [bgVideoUrl, setBgVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching settings:', error);
    } else if (data) {
      setHeroTitle(data.hero_title || '');
      setHeroSubtitle(data.hero_subtitle || '');
      setBgVideoUrl(data.bg_video_url || '');
    }
    setLoading(false);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let videoUrl = bgVideoUrl;

      if (videoFile) {
        videoUrl = await uploadMedia(videoFile, 'settings');
      }

      const payload = {
        hero_title: heroTitle,
        hero_subtitle: heroSubtitle,
        bg_video_url: videoUrl
      };

      const { data: existing } = await supabase.from('settings').select('id').single();

      let error;
      if (existing) {
        const { error: updateError } = await supabase
          .from('settings')
          .update(payload)
          .eq('id', existing.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('settings')
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;
      setBgVideoUrl(videoUrl);
      setVideoFile(null);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Save failed. Please check your connection.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="font-display font-bold text-4xl text-white mb-2">Home Page Settings</h1>
          <p className="text-white/40 text-sm">Manage hero text and cinematic background media.</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={40} className="text-brand-cyan animate-spin" />
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Loading Settings...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8">
            <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
              <div className="flex items-center gap-3 mb-2 text-brand-cyan">
                <Type size={20} />
                <h2 className="text-lg font-display font-bold text-white">Hero Content</h2>
              </div>

              <div className="space-y-2">
                <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Hero Title</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="Clouds Village"
                  className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Hero Subtitle</label>
                <textarea
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  rows={3}
                  placeholder="Escape the ordinary. Experience luxury woven into nature..."
                  className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full resize-none"
                />
              </div>
            </div>

            <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
              <div className="flex items-center gap-3 mb-2 text-brand-cyan">
                <Film size={20} />
                <h2 className="text-lg font-display font-bold text-white">Background Media</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-white/60 text-xs leading-relaxed">
                    Upload a cinematic video for the background. MP4 format recommended.
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="hero-video-upload"
                  />
                  <label
                    htmlFor="hero-video-upload"
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-[2rem] hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all cursor-pointer group"
                  >
                    <Upload size={24} className="text-white/20 group-hover:text-brand-cyan mb-2" />
                    <span className="text-white/60 text-xs font-medium text-center">
                      {videoFile ? videoFile.name : 'Change Background Video'}
                    </span>
                  </label>
                </div>

                <div className="aspect-video bg-black/20 rounded-2xl overflow-hidden border border-white/5 relative">
                  {bgVideoUrl ? (
                    <video
                      src={bgVideoUrl}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10 italic text-xs">
                      No video uploaded
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-brand-dark/80 px-2 py-0.5 rounded text-[8px] font-bold text-white/50 uppercase tracking-widest">
                    Live Preview
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full relative group overflow-hidden rounded-xl font-bold text-white shadow-[0_0_20px_rgba(0,163,196,0.3)] py-4 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-[#00d4ff] to-brand-cyan bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]" />
              <div className="absolute inset-[1px] bg-brand-dark/20 rounded-xl transition-opacity group-hover:opacity-0" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Update Home Page
                  </>
                )}
              </span>
            </button>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};
