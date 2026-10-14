import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import CategoryDropdown from './components/CategoryDropdown';
import UserAccountNav from './components/UserAccountNav';
import { getCurrentUser } from './lib/auth';
import { 
  Truck, 
  RotateCcw, 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  ChevronDown,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'MarketPress — Verified Campus Engineering Hardware & Textbook Exchange',
  description: 'Verified student-to-student marketplace for microcontroller kits, sensors, multimeters, and academic reference books.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        {/* Top Utility Bar */}
        <div className="mp-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={14} color="#666666" />
              <span>Free Campus Delivery at ECE Lab 204</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcw size={14} color="#666666" />
              <span>Deposit Return Policy</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Follow Us</span>
              <span style={{ display: 'flex', gap: '8px', color: '#888888', fontSize: '11px', fontWeight: 600 }}>
                <span>f</span>
                <span>t</span>
                <span>in</span>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <UserAccountNav user={currentUser} />
          </div>
        </div>

        {/* Main Navy Header */}
        <header className="mp-header-main">
          {/* MarketPress Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '28px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1
            }}>
              Market<span style={{ fontWeight: 800 }}>Press</span><span style={{ color: 'var(--mp-red)', fontSize: '32px' }}>.</span>
            </span>
          </Link>

          {/* Search Form */}
          <form action="/listing/ALL" method="GET" className="mp-search-form">
            <input
              type="text"
              name="q"
              placeholder="Find your product"
              className="mp-search-input"
            />

            <select name="category" defaultValue="ALL" className="mp-search-select">
              <option value="ALL">All Categories</option>
              <option value="HARDWARE_KIT">Microcontroller Kits</option>
              <option value="SENSOR">Sensors &amp; Modules</option>
              <option value="TEST_EQUIPMENT">Test Equipment</option>
              <option value="REFERENCE_BOOK">Academic Books</option>
            </select>

            <button type="submit" className="mp-search-btn" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          {/* User Actions: Wishlist + Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Wishlist */}
            <Link href="/my-listings" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <Heart size={26} strokeWidth={1.8} />
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                background: '#334155',
                color: '#ffffff',
                borderRadius: '50%',
                fontSize: '10px',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                0
              </span>
            </Link>

            {/* Cart / Reserved */}
            <Link href="/my-listings" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <ShoppingBag size={26} strokeWidth={1.8} />
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                background: 'var(--mp-red)',
                color: '#ffffff',
                borderRadius: '50%',
                fontSize: '10px',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                1
              </span>
            </Link>
          </div>
        </header>

        {/* Sub-Navigation Bar */}
        <div className="mp-subnav">
          {/* All Categories Interactive Slide-Down Menu */}
          <CategoryDropdown />

          {/* Navigation Links with Badges */}
          <nav className="mp-nav-links">
            <Link href="/" className="mp-nav-link">
              <span>Home</span>
              <ChevronDown size={12} />
            </Link>

            <Link href="/listing/HARDWARE_KIT" className="mp-nav-link">
              <span>Hardware</span>
            </Link>

            <Link href="/listing/SENSOR" className="mp-nav-link">
              <span>Sensors</span>
            </Link>

            <Link href="/listing/REFERENCE_BOOK" className="mp-nav-link">
              <span>Textbooks</span>
            </Link>

            <Link href="/forum" className="mp-nav-link">
              <span className="mp-badge-tag">NEW</span>
              <span>Forum</span>
              <ChevronDown size={12} />
            </Link>

            <Link href="/my-listings" className="mp-nav-link">
              <span>Dashboard</span>
            </Link>

            <Link href="/admin/moderation" className="mp-nav-link">
              <span className="mp-badge-tag hot">HOT</span>
              <span>Mod Queue</span>
            </Link>
          </nav>

          {/* Red Black Friday Promo CTA Box */}
          <Link href="/listing/ALL" className="mp-promo-btn">
            <span>CAMPUS LAB RUSH</span>
            <span className="mp-promo-sub">Rent up to 80% Off!</span>
          </Link>
        </div>

        {/* Page Content */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* MarketPress Footer */}
        <footer style={{
          background: '#0b1e33',
          color: '#ffffff',
          padding: '48px 32px 24px',
          marginTop: '60px',
          borderTop: '3px solid var(--mp-red)'
        }}>
          <div style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '36px',
            marginBottom: '36px'
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '12px'
              }}>
                Market<span style={{ fontWeight: 800 }}>Press</span><span style={{ color: 'var(--mp-red)' }}>.</span>
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                The dedicated student marketplace for engineering hardware kits, microcontroller boards, sensors, and academic textbooks with direct campus lab hand-offs.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
                Departments
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
                <li><Link href="/listing/HARDWARE_KIT" style={{ color: '#94a3b8' }}>Microcontroller Kits (Arduino, ESP32)</Link></li>
                <li><Link href="/listing/SENSOR" style={{ color: '#94a3b8' }}>Sensors &amp; Actuators</Link></li>
                <li><Link href="/listing/TEST_EQUIPMENT" style={{ color: '#94a3b8' }}>Digital Multimeters &amp; Probes</Link></li>
                <li><Link href="/listing/REFERENCE_BOOK" style={{ color: '#94a3b8' }}>Engineering Reference Textbooks</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
                Customer Service
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
                <li><Link href="/my-listings" style={{ color: '#94a3b8' }}>Order &amp; Reservation History</Link></li>
                <li><Link href="/forum" style={{ color: '#94a3b8' }}>Community Q&amp;A &amp; Support</Link></li>
                <li><Link href="/admin/moderation" style={{ color: '#94a3b8' }}>Moderation &amp; Safety Desk</Link></li>
                <li><Link href="/listing/ALL" style={{ color: '#94a3b8' }}>Browse All Campus Gear</Link></li>
              </ul>
            </div>
          </div>

          <div style={{
            maxWidth: '1360px',
            margin: '0 auto',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: '#64748b'
          }}>
            <div>© 2026 MarketPress. Campus Hardware &amp; Textbook Exchange. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <span>Privacy Notice</span>
              <span>Terms &amp; Conditions</span>
              <span>Campus Support</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
