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
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutSubtitle, setAboutSubtitle] = useState('');
  const [aboutContent, setAboutContent] = useState('');
  const [bgVideoUrl, setBgVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // New Content Fields
  const [aboutStat1Value, setAboutStat1Value] = useState('');
  const [aboutStat1Label, setAboutStat1Label] = useState('');
  const [aboutStat2Value, setAboutStat2Value] = useState('');
  const [aboutStat2Label, setAboutStat2Label] = useState('');

  const [contactTitle, setContactTitle] = useState('');
  const [contactSubtitle, setContactSubtitle] = useState('');
  const [contactHighlight, setContactHighlight] = useState('');

  // Footer & Social Links
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactLocationUrl, setContactLocationUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const [amenity1Label, setAmenity1Label] = useState('');
  const [amenity1Desc, setAmenity1Desc] = useState('');
  const [amenity2Label, setAmenity2Label] = useState('');
  const [amenity2Desc, setAmenity2Desc] = useState('');
  const [amenity3Label, setAmenity3Label] = useState('');
  const [amenity3Desc, setAmenity3Desc] = useState('');

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
      setAboutTitle(data.about_title || '');
      setAboutSubtitle(data.about_subtitle || '');
      setAboutContent(data.about_content || '');
      setBgVideoUrl(data.bg_video_url || '');

      setAboutStat1Value(data.about_stat1_value || '15+');
      setAboutStat1Label(data.about_stat1_label || 'Acres of Nature');
      setAboutStat2Value(data.about_stat2_value || '100%');
      setAboutStat2Label(data.about_stat2_label || 'Organic Farm');

      setContactTitle(data.contact_title || 'Book Your Stay');
      setContactSubtitle(data.contact_subtitle || 'Ready for your luxury escape? Select your dates, guests, and preferred room type to check availability instantly. We guarantee the best rates when booking direct.');
      setContactHighlight(data.contact_highlight || 'Breakfast included with all direct bookings');

      setContactPhone(data.contact_phone || '+91 9645464747, +91 9446506075');
      setContactEmail(data.contact_email || 'cloudsvillage@gmail.com');
      setContactAddress(data.contact_address || 'Clouds Village Farm Resort, Manjakkunel Farm, Thodupuzha, Idukki, Kerala');
      setContactLocationUrl(data.contact_location_url || 'https://google.com/maps/place/Clouds+Village+Farm+Resort/@9.9797876,76.8016067,17z');
      setFacebookUrl(data.facebook_url || 'https://www.facebook.com/CloudsVillageResort/');
      setInstagramUrl(data.instagram_url || 'https://www.instagram.com/cloudsvillagefarmresort');
      setYoutubeUrl(data.youtube_url || 'https://www.youtube.com/channel/UCc94gpmGBGYSEpCx8sCWmbA');

      setAmenity1Label(data.amenity1_label || 'Natural Pool');
      setAmenity1Desc(data.amenity1_desc || 'Crystal Clear');
      setAmenity2Label(data.amenity2_label || 'Safari');
      setAmenity2Desc(data.amenity2_desc || 'Wild Encounters');
      setAmenity3Label(data.amenity3_label || 'Heritage');
      setAmenity3Desc(data.amenity3_desc || 'Local Culture');
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
        about_title: aboutTitle,
        about_subtitle: aboutSubtitle,
        about_content: aboutContent,
        bg_video_url: videoUrl,
        about_stat1_value: aboutStat1Value,
        about_stat1_label: aboutStat1Label,
        about_stat2_value: aboutStat2Value,
        about_stat2_label: aboutStat2Label,
        contact_title: contactTitle,
        contact_subtitle: contactSubtitle,
        contact_highlight: contactHighlight,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        contact_address: contactAddress,
        contact_location_url: contactLocationUrl,
        facebook_url: facebookUrl,
        instagram_url: instagramUrl,
        youtube_url: youtubeUrl,
        amenity1_label: amenity1Label,
        amenity1_desc: amenity1Desc,
        amenity2_label: amenity2Label,
        amenity2_desc: amenity2Desc,
        amenity3_label: amenity3Label,
        amenity3_desc: amenity3Desc
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
    } catch (err: any) {
      console.error('Save failed:', err);
      alert(`Save failed: ${err.message || 'Unknown error occurred'}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="font-display font-bold text-4xl text-white mb-2">Website Content</h1>
          <p className="text-white/40 text-sm">Manage the text, story, and cinematic media of your landing page.</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={40} className="text-brand-cyan animate-spin" />
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Loading Content...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8 pb-20">
            {/* Hero Section */}
            <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
              <div className="flex items-center gap-3 mb-2 text-brand-cyan">
                <Type size={20} />
                <h2 className="text-lg font-display font-bold text-white">Hero Section</h2>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Amenity 1 (Label/Desc)</label>
                  <input
                    type="text"
                    value={amenity1Label}
                    onChange={(e) => setAmenity1Label(e.target.value)}
                    placeholder="Natural Pool"
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-2 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-xs"
                  />
                  <input
                    type="text"
                    value={amenity1Desc}
                    onChange={(e) => setAmenity1Desc(e.target.value)}
                    placeholder="Crystal Clear"
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-2 text-white/60 focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-[10px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Amenity 2 (Label/Desc)</label>
                  <input
                    type="text"
                    value={amenity2Label}
                    onChange={(e) => setAmenity2Label(e.target.value)}
                    placeholder="Safari"
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-2 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-xs"
                  />
                  <input
                    type="text"
                    value={amenity2Desc}
                    onChange={(e) => setAmenity2Desc(e.target.value)}
                    placeholder="Wild Encounters"
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-2 text-white/60 focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-[10px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Amenity 3 (Label/Desc)</label>
                  <input
                    type="text"
                    value={amenity3Label}
                    onChange={(e) => setAmenity3Label(e.target.value)}
                    placeholder="Heritage"
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-2 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-xs"
                  />
                  <input
                    type="text"
                    value={amenity3Desc}
                    onChange={(e) => setAmenity3Desc(e.target.value)}
                    placeholder="Local Culture"
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-2 text-white/60 focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-[10px]"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
              <div className="flex items-center gap-3 mb-2 text-brand-cyan">
                <CheckCircle2 size={20} />
                <h2 className="text-lg font-display font-bold text-white">Our Story (About Section)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">About Title</label>
                  <input
                    type="text"
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                    placeholder="Authentic Farm Stay"
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">About Subtitle (Italic)</label>
                  <input
                    type="text"
                    value={aboutSubtitle}
                    onChange={(e) => setAboutSubtitle(e.target.value)}
                    placeholder="in Kerala's Heart"
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Main Description</label>
                <textarea
                  value={aboutContent}
                  onChange={(e) => setAboutContent(e.target.value)}
                  rows={4}
                  placeholder="Clouds Village Farm Resort is an authentic farm stay..."
                  className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full resize-none"
                />
              </div>

              {/* About Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Stat 1 (Value)</label>
                    <input
                      type="text"
                      value={aboutStat1Value}
                      onChange={(e) => setAboutStat1Value(e.target.value)}
                      placeholder="15+"
                      className="bg-brand-dark/30 border border-white/5 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Stat 1 (Label)</label>
                    <input
                      type="text"
                      value={aboutStat1Label}
                      onChange={(e) => setAboutStat1Label(e.target.value)}
                      placeholder="Acres of Nature"
                      className="bg-brand-dark/30 border border-white/5 rounded-xl px-4 py-2 text-white/60 focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Stat 2 (Value)</label>
                    <input
                      type="text"
                      value={aboutStat2Value}
                      onChange={(e) => setAboutStat2Value(e.target.value)}
                      placeholder="100%"
                      className="bg-brand-dark/30 border border-white/5 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Stat 2 (Label)</label>
                    <input
                      type="text"
                      value={aboutStat2Label}
                      onChange={(e) => setAboutStat2Label(e.target.value)}
                      placeholder="Organic Farm"
                      className="bg-brand-dark/30 border border-white/5 rounded-xl px-4 py-2 text-white/60 focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Booking/Contact Section */}
            <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
              <div className="flex items-center gap-3 mb-2 text-brand-cyan">
                <CheckCircle2 size={20} />
                <h2 className="text-lg font-display font-bold text-white">Booking Section</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Section Title</label>
                  <input
                    type="text"
                    value={contactTitle}
                    onChange={(e) => setContactTitle(e.target.value)}
                    placeholder="Book Your Stay"
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Promo Highlight</label>
                  <input
                    type="text"
                    value={contactHighlight}
                    onChange={(e) => setContactHighlight(e.target.value)}
                    placeholder="Breakfast included..."
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Section Description</label>
                <textarea
                  value={contactSubtitle}
                  onChange={(e) => setContactSubtitle(e.target.value)}
                  rows={3}
                  placeholder="Ready for your luxury escape?..."
                  className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full resize-none"
                />
              </div>
            </div>

            {/* Footer & Contact Info */}
            <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
              <div className="flex items-center gap-3 mb-2 text-brand-cyan">
                <Type size={20} />
                <h2 className="text-lg font-display font-bold text-white">Footer & Social Links</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Contact Phone(s)</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 9645464747..."
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Contact Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="cloudsvillage@gmail.com"
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Full Address</label>
                <input
                  type="text"
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  placeholder="Clouds Village Farm Resort, Manjakkunel Farm..."
                  className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Google Maps Link</label>
                <input
                  type="text"
                  value={contactLocationUrl}
                  onChange={(e) => setContactLocationUrl(e.target.value)}
                  placeholder="https://google.com/maps/..."
                  className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Facebook URL</label>
                  <input
                    type="text"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Instagram URL</label>
                  <input
                    type="text"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Youtube URL</label>
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="bg-brand-dark/30 border border-white/5 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-cyan/50 transition-all w-full text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Background Media */}
            <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
              <div className="flex items-center gap-3 mb-2 text-brand-cyan">
                <Film size={20} />
                <h2 className="text-lg font-display font-bold text-white">Hero Background Video</h2>
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
                    Update All Content
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
