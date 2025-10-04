'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

// --- Helper Icons ---
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48"> ... </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor"> ... </svg>
);

export default function AuthPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Check for session on page load
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        window.location.href = 'http://localhost:3001';
      }
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        window.location.href = 'http://localhost:3001';
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSocialLogin = async (provider) => {
    setError('');
    setLoading(true);
    try {
      // Popup login for OAuth
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: 'http://localhost:3001', // final redirect after login
          // For popup mode in web, Supabase handles it automatically
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = 'http://localhost:3000';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-100">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100 text-zinc-900 font-sans">
        <div className="bg-white p-10 rounded-xl shadow-xl text-center w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
          <p className="mb-6 break-all">Signed in as: {user.email}</p>
          <button 
            onClick={handleSignOut} 
            className="w-full bg-zinc-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100 p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="text-2xl font-bold text-white bg-black rounded-full w-12 h-12 flex items-center justify-center">M</div>
          </div>
          <h1 className="text-3xl font-bold text-center text-zinc-900 mb-2">
            Sign in with
          </h1>
          <p className="text-center text-zinc-600 mb-8">
            Use one of the following accounts to continue.
          </p>

          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => handleSocialLogin('google')} 
              className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-zinc-300 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <GoogleIcon />
              <span className="font-semibold text-zinc-800">Google</span>
            </button>
            <button 
              onClick={() => handleSocialLogin('github')} 
              className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-zinc-300 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <GithubIcon />
              <span className="font-semibold text-zinc-800">GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
