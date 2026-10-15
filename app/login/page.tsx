import Link from 'next/link';
import { getCurrentUser } from '@/app/lib/auth';
import { 
  loginWithCredentialsAction, 
  loginWithOAuthAction, 
  setGuestModeAction 
} from '@/app/actions/auth-actions';
import { 
  AlertCircle, 
  CheckCircle2, 
  Lock, 
  ShieldAlert,
  ArrowRight,
  Eye,
  KeyRound,
  Mail
} from 'lucide-react';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    error?: string; 
    logged_out?: string; 
    redirect?: string; 
    provider?: string;
  }>;
}) {
  const { error, logged_out, redirect = '/', provider } = await searchParams;
  const currentUser = await getCurrentUser();

  return (
    <div style={{
      maxWidth: '460px',
      margin: '40px auto 80px',
      padding: '0 20px',
    }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '32px',
            fontWeight: 800,
            color: '#0b1e33',
            letterSpacing: '-0.02em',
          }}>
            Market<span style={{ color: 'var(--mp-red)' }}>Press.</span>
          </span>
        </Link>
        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', fontWeight: 600 }}>
          Campus Hardware &amp; Textbook Exchange
        </div>
      </div>

      {/* Dynamic Alerts */}
      {logged_out && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#065f46',
          fontSize: '13px',
        }}>
          <CheckCircle2 size={16} color="#059669" />
          <span>You have been signed out. Enter credentials to sign back in.</span>
        </div>
      )}

      {error === 'oauth_config_missing' && (
        <div style={{
          background: '#fef3c7',
          border: '1px solid #fde68a',
          borderRadius: '8px',
          padding: '16px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          color: '#92400e',
          fontSize: '13px',
          lineHeight: 1.5,
        }}>
          <AlertCircle size={20} color="#d97706" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px', color: '#78350f' }}>
              GitHub OAuth Client ID Required:
            </strong>
            To enable real GitHub sign in, add your registered <code>GITHUB_CLIENT_ID</code> and <code>GITHUB_CLIENT_SECRET</code> to your Vercel Environment Variables or local <code>.env</code>.
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#b45309' }}>
              💡 Follow the GitHub registration steps, or sign in instantly below using the Admin credentials.
            </div>
          </div>
        </div>
      )}

      {error === 'admin_required' && (
        <div style={{
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: '8px',
          padding: '14px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          color: '#9f1239',
          fontSize: '13px',
          lineHeight: 1.5,
        }}>
          <ShieldAlert size={18} color="#e11d48" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <strong>Administrator Access Required:</strong> The page you requested requires administrative clearance. Please log in with an authorized administrator account.
          </div>
        </div>
      )}

      {error === 'login_required' && (
        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '14px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          color: '#1e40af',
          fontSize: '13px',
          lineHeight: 1.5,
        }}>
          <AlertCircle size={18} color="#2563eb" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <strong>Sign In Required:</strong> Please sign in to access your personal equipment inventory and active reservation history.
          </div>
        </div>
      )}

      {/* Main Sign In Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        padding: '32px 28px',
      }}>
        <h1 style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#111827',
          fontFamily: 'var(--font-heading)',
          marginBottom: '6px',
        }}>
          Sign In
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          Choose your preferred sign-in method to continue.
        </p>

        {/* OAuth Social Login Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
          {/* GitHub OAuth */}
          <a
            href={`/api/auth/github${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
            className="btn-oauth-github"
            style={{
              width: '100%',
              padding: '11px 16px',
              borderRadius: '5px',
              border: '1px solid #24292f',
              background: '#24292f',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Continue with GitHub</span>
          </a>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '22px 0',
          color: '#9ca3af',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          <span>OR SIGN IN WITH EMAIL</span>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
        </div>

        {/* Standard Email & Password Form */}
        <form action={loginWithCredentialsAction} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="hidden" name="redirect" value={redirect} />

          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '6px',
            }}>
              Email Address or Username
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                name="username"
                required
                placeholder="student@university.edu"
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 36px',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
              <Mail
                size={16}
                color="#64748b"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '6px',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 36px',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
              <KeyRound
                size={16}
                color="#64748b"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-mp-red"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              marginTop: '4px',
            }}
          >
            <span>Sign In</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '22px 0 16px',
          color: '#9ca3af',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          <span>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
        </div>

        {/* Guest Mode Action */}
        <form action={setGuestModeAction.bind(null, redirect)}>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              background: '#f8fafc',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontFamily: 'var(--font-heading)',
              transition: 'background-color 0.15s ease',
            }}
          >
            <Eye size={14} color="#64748b" />
            <span>Continue as Guest</span>
          </button>
        </form>
      </div>
    </div>
  );
}
