'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { UserData } from '@/app/lib/seed-data';
import { logoutAction } from '@/app/actions/auth-actions';
import { 
  ChevronDown, 
  Package, 
  ShieldCheck, 
  Sliders, 
  LogIn,
  LogOut,
  ArrowRight
} from 'lucide-react';

export default function UserAccountNav({ user }: { user: UserData | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAdmin = user?.role === 'ADMIN';

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When not signed in
  if (!user) {
    return (
      <Link
        href="/login"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          background: 'var(--mp-red)',
          color: '#ffffff',
          padding: '5px 14px',
          borderRadius: '3px',
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          textDecoration: 'none',
        }}
      >
        <LogIn size={13} />
        <span>Sign In</span>
      </Link>
    );
  }

  // When signed in
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '4px',
            color: '#111827',
            fontSize: '13px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <span style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#047857',
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            ✓
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Hello, <strong>{user.name}</strong></span>
          </span>

          <ChevronDown
            size={13}
            style={{
              color: '#6b7280',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease',
            }}
          />
        </button>

        {/* Account Dropdown Menu */}
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            width: '260px',
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
            zIndex: 200,
            padding: '12px 0',
            fontSize: '13px',
            animation: 'fadeIn 0.15s ease',
          }}>
            {/* User info header */}
            <div style={{ padding: '0 16px 10px', borderBottom: '1px solid #f1f3f5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#0b1e33',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                }}>
                  {user.name.charAt(0)}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontWeight: 800, color: '#111827', fontSize: '14px' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>
                    {user.email}
                  </div>
                </div>
              </div>

              <div style={{
                marginTop: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                background: '#ecfdf5',
                color: '#047857',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: 700,
              }}>
                <ShieldCheck size={12} />
                <span>Verified • {user.role}</span>
              </div>
            </div>

            {/* Nav links */}
            <div style={{ padding: '8px 0' }}>
              <Link
                href="/my-listings"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 16px',
                  color: '#1f2937',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Package size={15} color="#2563eb" />
                <span>My Equipment &amp; Loans</span>
              </Link>

              {isAdmin && (
                <Link
                  href="/admin/moderation"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 16px',
                    color: '#1f2937',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Sliders size={15} color="#e11d48" />
                  <span>Admin Moderation Desk</span>
                </Link>
              )}
            </div>

            {/* Logout button in dropdown */}
            <div style={{ borderTop: '1px solid #f1f3f5', paddingTop: '6px', paddingBottom: '2px', paddingLeft: '8px', paddingRight: '8px' }}>
              <form action={logoutAction}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#dc2626',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <LogOut size={14} color="#dc2626" />
                  <span>Log Out</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Direct Log Out Button in Header */}
      <form action={logoutAction} style={{ margin: 0 }}>
        <button
          type="submit"
          style={{
            background: 'transparent',
            border: '1px solid #d1d5db',
            borderRadius: '3px',
            color: '#dc2626',
            padding: '3px 8px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
          title="Sign out of your account"
        >
          <LogOut size={12} color="#dc2626" />
          <span>Log Out</span>
        </button>
      </form>
    </div>
  );
}
