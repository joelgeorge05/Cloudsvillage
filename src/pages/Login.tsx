import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { LogIn, Lock, Mail, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials in the Supabase Dashboard.');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please confirm your email address before logging in.');
      } else {
        setError(error.message);
      }
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full filter blur-[100px] opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full filter blur-[100px] opacity-10 pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-4xl text-white mb-2">Admin Access</h1>
          <p className="text-white/40 text-sm tracking-widest uppercase">Clouds Village CMS</p>
        </div>

        <div className="glass p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 pointer-events-none" />
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-brand-cyan transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-brand-dark/30 border border-white/5 rounded-xl pl-12 pr-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all w-full backdrop-blur-md shadow-inner"
                  placeholder="admin@cloudsvillage.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-brand-cyan transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-brand-dark/30 border border-white/5 rounded-xl pl-12 pr-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all w-full backdrop-blur-md shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden rounded-xl font-bold text-white shadow-[0_0_20px_rgba(0,163,196,0.3)] hover:shadow-[0_0_40px_rgba(0,163,196,0.6)] transition-all transform hover:-translate-y-1 py-4 mt-4 disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-[#00d4ff] to-brand-cyan bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]" />
              <div className="absolute inset-[1px] bg-brand-dark/20 rounded-xl transition-opacity group-hover:opacity-0" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                {!loading && <LogIn size={18} />}
              </span>
            </button>
          </form>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="mt-8 text-white/30 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase flex items-center gap-2 mx-auto"
        >
          Back to Website <ArrowRight size={14} />
        </button>
      </motion.div>
    </div>
  );
};
