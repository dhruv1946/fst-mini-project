import Link from 'next/link';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import { 
  Package, 
  Layers, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  PlusCircle,
  HelpCircle,
  FileText
} from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/login?error=login_required&redirect=/my-listings');
  }

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 24px 60px' }}>
      {/* Dashboard Top Header */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px 32px',
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#047857', padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
            <ShieldCheck size={14} />
            <span>Verified Student ID: {currentUser.studentId} • {currentUser.name}</span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Student Lab Equipment &amp; Loans Hub
          </h1>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            {currentUser.university} • {currentUser.department}
          </div>
        </div>

        {/* Dashboard Quick Stats */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 18px', textAlign: 'center', minWidth: '120px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Gear
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
              4 Items
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 18px', textAlign: 'center', minWidth: '120px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
              Trust Score
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#059669' }}>
              4.9 / 5.0
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 18px', textAlign: 'center', minWidth: '120px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Loans
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#2563eb' }}>
              1 Ongoing
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Persistent Sidebar Nav + Nested Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '28px', alignItems: 'start' }}>
        {/* Persistent Navigation */}
        <aside style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', padding: '0 8px 6px' }}>
            Dashboard Nav
          </div>

          <Link
            href="/my-listings"
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              background: '#eff6ff',
              color: '#1d4ed8',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Package size={16} />
            <span>My Equipment &amp; Inventory</span>
          </Link>

          <Link
            href="/my-listings#active-loans"
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Clock size={16} />
            <span>Active Loans &amp; Receipts</span>
          </Link>

          <Link
            href="/forum"
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <HelpCircle size={16} />
            <span>Student Q&amp;A Forum</span>
          </Link>

          <Link
            href="/admin/moderation"
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#e11d48',
              background: '#fff1f2',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '12px'
            }}
          >
            <ShieldCheck size={16} />
            <span>Moderator Dispute Desk</span>
          </Link>
        </aside>

        {/* Dynamic Nested Content */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
