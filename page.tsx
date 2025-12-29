'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'CREDENTIALS' | '2FA'>('CREDENTIALS');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (step === 'CREDENTIALS') {
        // Validate credentials first (Mocking the check or real endpoint)
        // In a real flow, you might hit an endpoint that checks if 2FA is needed
        // For now, we assume valid credentials trigger 2FA
        await apiFetch('/auth/send-2fa', { 
          method: 'POST', 
          body: JSON.stringify({ email, password }) 
        });
        setStep('2FA');
      } else if (step === '2FA') {
        const res = await apiFetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password, code })
        });
        document.cookie = `auth_token=${res.access_token}; path=/`;
        router.push('/admin/console');
      }
    } catch (err) {
      setError((err as Error).message || 'Authentication Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
      <div className="w-full max-w-md p-8 border border-gray-800 bg-gray-900/50">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">System Access</h1>
          <p className="text-xs text-gray-500">RESTRICTED AREA</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {step === 'CREDENTIALS' && (
            <>
              <div>
                <label className="block text-xs font-bold mb-2 uppercase">Identity (Email)</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-black border border-gray-700 p-3 text-white focus:border-white outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 uppercase">Passcode</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-black border border-gray-700 p-3 text-white focus:border-white outline-none transition-colors"
                  required
                />
              </div>
            </>
          )}

          {step === '2FA' && (
            <div className="animate-fade-in">
              <div className="bg-yellow-900/20 border border-yellow-600/50 p-3 mb-4 text-yellow-500 text-xs">
                ⚠ TWO-FACTOR AUTHENTICATION REQUIRED
              </div>
              <label className="block text-xs font-bold mb-2 uppercase">Verification Code</label>
              <input 
                type="text" 
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-white outline-none transition-colors text-center tracking-[0.5em] font-bold text-xl"
                placeholder="000000"
                maxLength={6}
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2 text-center">Code sent to registered device.</p>
            </div>
          )}

          {error && <div className="text-red-500 text-xs font-bold text-center">{error}</div>}

          <button 
            type="submit" 
            className="w-full bg-white text-black font-bold py-3 uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            {step === 'CREDENTIALS' ? 'Authenticate' : 'Verify Access'}
          </button>
        </form>
      </div>
    </div>
  );
}