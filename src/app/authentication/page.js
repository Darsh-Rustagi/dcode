'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
    getAuth, 
    onAuthStateChanged,
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithCustomToken
} from 'firebase/auth';

// --- Firebase Initialization (Module Level & Error Handling) ---
// This robust setup initializes Firebase once and captures any potential errors.
const initializeFirebase = () => {
    try {
        let firebaseConfig;
        const firebaseConfigString = typeof __firebase_config !== 'undefined' ? __firebase_config : null;
        
        if (firebaseConfigString && firebaseConfigString !== '{}') {
            firebaseConfig = JSON.parse(firebaseConfigString);
        } else {
            console.warn("Global Firebase config '__firebase_config' not found. Using a fallback. This is not recommended for production.");
            firebaseConfig = {
              apiKey: "AIzaSyB0FmyZGRsPkndgawyqQRElPCADHD4dOkE",
              authDomain: "mentora-72b3b.firebaseapp.com",
              projectId: "mentora-72b3b",
              storageBucket: "mentora-72b3b.appspot.com",
              messagingSenderId: "124673414861",
              appId: "1:124673414861:web:893491d241e53789073b84"
            };
        }

        if (!firebaseConfig?.apiKey) {
             throw new Error("Firebase configuration is missing or invalid.");
        }
        
        const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const googleProvider = new GoogleAuthProvider();
        const githubProvider = new GithubAuthProvider();
        
        return { auth, googleProvider, githubProvider, error: null };

    } catch (error) {
        console.error("Firebase Initialization Failed:", error);
        return { auth: null, googleProvider: null, githubProvider: null, error: error.message };
    }
};

const { auth, googleProvider, githubProvider, error: firebaseInitializationError } = initializeFirebase();

// --- Helper Icon Components ---
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.582-3.344-11.127-7.962l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.244,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
);
const GithubIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
);

// --- Custom Auth Hook ---
// This hook centralizes all authentication logic.
const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (firebaseInitializationError || !auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                try {
                    await signInWithCustomToken(auth, __initial_auth_token);
                } catch (err) {
                    console.error("Initial sign-in with custom token failed:", err);
                }
            }
            setLoading(false);
        });
        
        return () => unsubscribe();
    }, []);

    return { user, loading };
};

// --- UI Components ---
const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAuthAction = async () => {
        if (!auth) return;
        setError('');
        if (password.length < 6) {
            setError("Password should be at least 6 characters.");
            return;
        }
        setIsProcessing(true);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsProcessing(false);
        }
    };
    
    const handleSocialLogin = async (provider) => {
        if (!auth || !provider) return;
        setError('');
        setIsProcessing(true);
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-100 p-4 font-sans">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-xl rounded-2xl p-8">
                    <div className="flex justify-center mb-6">
                        <div className="text-2xl font-bold text-white bg-black rounded-full w-12 h-12 flex items-center justify-center">M</div>
                    </div>
                    <h1 className="text-3xl font-bold text-center text-zinc-900 mb-2">
                        {isLogin ? 'Welcome Back!' : 'Create Your Account'}
                    </h1>
                    <p className="text-center text-zinc-600 mb-8">
                        {isLogin ? 'Sign in to continue your journey.' : 'Get started with Mentora.'}
                    </p>

                    <div className="space-y-4">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-colors" disabled={isProcessing} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-colors" disabled={isProcessing} />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

                    <button onClick={handleAuthAction} className="w-full mt-6 bg-zinc-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>

                    <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-300"></div></div><div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-zinc-500">Or continue with</span></div></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button onClick={() => handleSocialLogin(googleProvider)} className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-zinc-300 rounded-lg hover:bg-zinc-100 transition-colors disabled:opacity-50" disabled={isProcessing}><GoogleIcon /> <span className="font-semibold text-zinc-800">Google</span></button>
                        <button onClick={() => handleSocialLogin(githubProvider)} className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-zinc-300 rounded-lg hover:bg-zinc-100 transition-colors disabled:opacity-50" disabled={isProcessing}><GithubIcon /> <span className="font-semibold text-zinc-800">GitHub</span></button>
                    </div>

                    <p className="mt-8 text-center text-sm text-zinc-600">{isLogin ? "Don't have an account?" : "Already have an account?"}<button onClick={() => setIsLogin(!isLogin)} className="ml-1 text-zinc-800 hover:text-zinc-600 font-semibold underline" disabled={isProcessing}>{isLogin ? 'Sign up' : 'Log in'}</button></p>
                </div>
            </div>
        </div>
    );
};

const WelcomeScreen = ({ user }) => {
    const handleSignOut = async () => {
        if (auth) await signOut(auth);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100 text-zinc-900 font-sans">
            <div className="bg-white p-10 rounded-xl shadow-xl text-center w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Welcome to Mentora!</h1>
                <p className="mb-6 break-all">Signed in as: {user.email || user.displayName}</p>
                <button onClick={handleSignOut} className="w-full bg-zinc-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-zinc-800 transition-colors">Sign Out</button>
            </div>
        </div>
    );
};

const LoadingScreen = () => (
    <div className="flex items-center justify-center min-h-screen bg-amber-100">
        <div className="text-xl font-semibold">Loading...</div>
    </div>
);

const ErrorScreen = ({ error }) => (
    <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-700">
        <div className="text-center p-8 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold mb-4">Application Error</h1>
            <p>Could not initialize Firebase; the app cannot start.</p>
            <p className="mt-2 text-sm font-mono bg-red-100 p-2 rounded">Error: {error}</p>
        </div>
    </div>
);

// --- Main Page Component ---
// This component now acts as a controller, deciding which screen to show.
export default function AuthPage() {
    const { user, loading } = useAuth();

    if (firebaseInitializationError) {
        return <ErrorScreen error={firebaseInitializationError} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    if (user) {
        return <WelcomeScreen user={user} />;
    }
    
    return <AuthForm />;
}
