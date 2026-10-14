'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  ChevronDown, 
  Cpu, 
  Sparkles, 
  Sliders, 
  BookOpen, 
  MessagesSquare, 
  Layers, 
  PlusCircle, 
  ShieldCheck 
} from 'lucide-react';

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    {
      name: 'All Lab Equipment & Books',
      href: '/listing/ALL',
      desc: 'Browse entire campus catalog',
      icon: <Layers size={16} color="#0b1e33" />,
    },
    {
      name: 'Microcontrollers & Kits',
      href: '/listing/HARDWARE_KIT',
      desc: 'Arduino Uno R4, ESP32, NodeMCU, starter packs',
      icon: <Cpu size={16} color="#e31b23" />,
    },
    {
      name: 'Sensors & Actuator Breakouts',
      href: '/listing/SENSOR',
      desc: 'MPU6050, Ultrasonic, Relays, I2C/SPI modules',
      icon: <Sparkles size={16} color="#d97706" />,
    },
    {
      name: 'Digital Multimeters & Lab Tools',
      href: '/listing/TEST_EQUIPMENT',
      desc: 'True-RMS DMMs, oscilloscope probes, test clips',
      icon: <Sliders size={16} color="#2563eb" />,
    },
    {
      name: 'Academic Reference Textbooks',
      href: '/listing/REFERENCE_BOOK',
      desc: 'Sedra & Smith, Cormen Algorithms, lab manuals',
      icon: <BookOpen size={16} color="#7c3aed" />,
    },
  ];

  return (
    <div ref={dropdownRef} style={{ position: 'relative', zIndex: 110 }}>
      {/* Category Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mp-category-btn"
        aria-expanded={isOpen}
        style={{
          border: '1px solid #dce1e8',
          background: isOpen ? '#ffffff' : 'var(--mp-badge-gray)',
          boxShadow: isOpen ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
          cursor: 'pointer',
        }}
      >
        <Menu size={16} />
        <span>All Categories</span>
        <ChevronDown
          size={14}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {/* Slide-Down Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: '320px',
            background: '#ffffff',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)',
            padding: '10px 0',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 120,
            animation: 'fadeIn 0.15s ease',
          }}
        >
          <div style={{
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: '#94a3b8',
            padding: '6px 18px 8px',
            letterSpacing: '0.04em',
            borderBottom: '1px solid #f1f3f5',
          }}>
            Campus Departments
          </div>

          <div style={{ padding: '6px 0' }}>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '10px 18px',
                  transition: 'background-color 0.12s ease',
                  color: '#222222',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ marginTop: '2px', padding: '6px', background: '#f1f5f9', borderRadius: '4px' }}>
                  {cat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '1px' }}>
                    {cat.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', padding: '8px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
            <Link
              href="/forum"
              onClick={() => setIsOpen(false)}
              style={{ fontSize: '12px', fontWeight: 700, color: 'var(--mp-red)', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <MessagesSquare size={13} />
              <span>Q&amp;A Forum</span>
            </Link>

            <Link
              href="/my-listings#new-listing-form"
              onClick={() => setIsOpen(false)}
              style={{ fontSize: '12px', fontWeight: 700, color: '#0b1e33', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <PlusCircle size={13} />
              <span>List Gear</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
