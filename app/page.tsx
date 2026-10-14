import Link from 'next/link';
import { DatabaseService } from './lib/db';
import { 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  BookOpen, 
  Sliders, 
  MessagesSquare, 
  Lock, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';

export default async function HomePage() {
  const listings = await DatabaseService.getListings();
  const threads = await DatabaseService.getForumThreads();

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 60px' }}>
      {/* SECTION 1: Exact Hero Banner from Screenshot 1 */}
      <section style={{
        marginTop: '20px',
        marginBottom: '40px',
        background: '#f8f9fa',
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(227, 27, 35, 0.03) 0%, transparent 40%), linear-gradient(135deg, #f8f9fa 0%, #edf0f5 100%)',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        padding: '50px 60px',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 460px) 1fr',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Left Side: Large Hero Cutout Hardware Image */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffffff 40%, #e2e8f0 100%)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '8px solid #ffffff'
          }}>
            <img
              src="https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800"
              alt="Arduino Hardware Kit Hero"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        {/* Right Side: Bold Typography & Red CTA Button */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '44px',
            fontWeight: 900,
            color: '#111827',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            GET ALL <span style={{ color: 'var(--mp-red)', fontStyle: 'italic' }}>ORIGINAL</span><br />
            <span style={{ color: 'var(--mp-red)', fontStyle: 'italic' }}>LAB</span> HARDWARE
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#4b5563',
            lineHeight: 1.6,
            maxWidth: '540px',
            marginBottom: '28px'
          }}>
            We have all your lab hardware needs! Are you looking for the best performance microcontroller kits, calibrated sensors, multimeters, and academic reference books?
          </p>

          <Link href="/listing/HARDWARE_KIT" className="btn-mp-red" style={{ fontSize: '13px', padding: '14px 34px' }}>
            <span>VIEW COLLECTION</span>
          </Link>
        </div>
      </section>

      {/* SECTION 2: Exact Promo Grid from Screenshot 2 */}
      <section style={{ marginBottom: '50px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 1.1fr) minmax(320px, 1fr)',
          gap: '24px'
        }}>
          {/* Left Large Featured Card */}
          <div style={{
            background: '#f8f9fa',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            padding: '36px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '380px'
          }}>
            <div>
              <div style={{ color: 'var(--mp-red)', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Featured Microcontroller Dev Board
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>
                Arduino Uno R4 WiFi + Starter Component Pack
              </h3>
            </div>

            {/* Red Circular Offer Badge */}
            <div style={{ position: 'absolute', left: '36px', bottom: '110px' }} className="mp-discount-circle">
              15%
              <span>Offer</span>
            </div>

            {/* Cutout Image */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
              <img
                src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600"
                alt="Arduino R4 Board"
                style={{ maxHeight: '180px', objectFit: 'contain' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                Rate: <strong style={{ color: 'var(--mp-red)', fontSize: '18px' }}>$3.50/day</strong> (Deposit: $25)
              </div>
              <Link href="/listing/HARDWARE_KIT/list-ard-01" className="btn-mp-outline">
                Inspect Item &rarr;
              </Link>
            </div>
          </div>

          {/* Right 2x2 Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* 1 */}
            <div style={{ background: '#f8f9fa', borderRadius: '6px', border: '1px solid #e5e7eb', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--mp-red)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                IoT &amp; Wireless
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                NodeMCU ESP8266 IoT
              </h4>
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400"
                alt="ESP8266"
                style={{ height: '110px', objectFit: 'cover', borderRadius: '4px', margin: 'auto' }}
              />
              <Link href="/listing/HARDWARE_KIT/list-esp-02" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--mp-red)', marginTop: '8px' }}>
                $2.00/day &rarr;
              </Link>
            </div>

            {/* 2 */}
            <div style={{ background: '#f8f9fa', borderRadius: '6px', border: '1px solid #e5e7eb', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--mp-red)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                Test Equipment
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                True-RMS Multimeter
              </h4>
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400"
                alt="Multimeter"
                style={{ height: '110px', objectFit: 'cover', borderRadius: '4px', margin: 'auto' }}
              />
              <Link href="/listing/TEST_EQUIPMENT/list-dmm-03" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--mp-red)', marginTop: '8px' }}>
                $4.00/day &rarr;
              </Link>
            </div>

            {/* 3 */}
            <div style={{ background: '#f8f9fa', borderRadius: '6px', border: '1px solid #e5e7eb', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--mp-red)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                Sensors &amp; IMU
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                MPU-6050 6-DOF Gyro
              </h4>
              <img
                src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400"
                alt="Sensor"
                style={{ height: '110px', objectFit: 'cover', borderRadius: '4px', margin: 'auto' }}
              />
              <Link href="/listing/SENSOR/list-sens-05" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--mp-red)', marginTop: '8px' }}>
                $6.00 Sale &rarr;
              </Link>
            </div>

            {/* 4 */}
            <div style={{ background: '#f8f9fa', borderRadius: '6px', border: '1px solid #e5e7eb', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--mp-red)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                Reference Books
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                Sedra &amp; Smith Circuits
              </h4>
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"
                alt="Textbook"
                style={{ height: '110px', objectFit: 'cover', borderRadius: '4px', margin: 'auto' }}
              />
              <Link href="/listing/REFERENCE_BOOK/list-book-04" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--mp-red)', marginTop: '8px' }}>
                $1.50/day &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Exact "Recently Added" Product Row from Screenshot 2 */}
      <section style={{ marginBottom: '50px' }}>
        {/* Section Header with Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '22px',
            fontWeight: 800,
            color: '#111827'
          }}>
            Recently Added
          </h2>

          {/* Filter Tabs matching screenshot */}
          <div className="mp-tabs-filter">
            <Link href="/listing/ALL" className="mp-tab-item active">
              On Sell
            </Link>
            <Link href="/listing/HARDWARE_KIT" className="mp-tab-item">
              Hot Sell
            </Link>
            <Link href="/listing/SENSOR" className="mp-tab-item">
              Trend
            </Link>
            <Link href="/listing/REFERENCE_BOOK" className="mp-tab-item">
              Best Sell
            </Link>
          </div>
        </div>

        {/* 6 Product Cards Grid matching Screenshot 2 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px'
        }}>
          {listings.slice(0, 6).map((item) => {
            const retailPrice = (item.price * 15 + 20).toFixed(2);

            return (
              <div key={item.id} className="mp-product-card">
                <div
                  className="mp-product-image"
                  style={{ backgroundImage: `url(${item.images[0]})` }}
                />

                <Link
                  href={`/listing/${item.category}/${item.id}`}
                  className="mp-product-title"
                >
                  {item.title}
                </Link>

                <div className="mp-product-pricing">
                  <span className="mp-price-old">${retailPrice}</span>
                  <span className="mp-price-current">${item.price.toFixed(2)}/day</span>
                </div>

                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                  {item.location}
                </div>

                <div style={{ marginTop: '12px', width: '100%' }}>
                  <Link
                    href={`/listing/${item.category}/${item.id}`}
                    className="btn-mp-red"
                    style={{ width: '100%', padding: '6px 12px', fontSize: '11px' }}
                  >
                    Reserve Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Indicator Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '24px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--mp-red)', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#d1d5db', display: 'inline-block' }} />
        </div>
      </section>

      {/* SECTION 4: Student Tech Forum Banner */}
      <section style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '30px',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ color: 'var(--mp-red)', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Campus Peer Support
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: '#111827' }}>
              Engineering Q&amp;A &amp; Hardware Debugging Forum
            </h3>
          </div>

          <Link href="/forum" className="btn-mp-dark">
            <span>Open Forum ({threads.length} Discussions)</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {threads.slice(0, 3).map((th) => (
            <Link
              key={th.id}
              href={`/forum/${th.id}`}
              style={{
                border: '1px solid #f1f3f5',
                borderRadius: '4px',
                padding: '12px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#f8f9fa'
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                  {th.title}
                </div>
                <div style={{ fontSize: '12px', color: '#666666' }}>
                  By {th.authorName} • {th.replies.length} replies • {th.upvotes} upvotes
                </div>
              </div>

              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: th.isSolved ? '#047857' : '#2563eb',
                background: th.isSolved ? '#ecfdf5' : '#eff6ff',
                padding: '3px 8px',
                borderRadius: '3px'
              }}>
                {th.isSolved ? 'SOLVED' : 'ACTIVE'}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
