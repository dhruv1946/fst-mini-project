import { DatabaseService } from '@/app/lib/db';
import { claimItemAction } from '@/app/actions/listing-actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Clock, 
  FileCheck, 
  Zap, 
  ChevronRight,
  ArrowLeft,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';

export default async function ListingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { category, id } = await params;
  const { error } = await searchParams;

  const item = await DatabaseService.getListingById(id);
  if (!item) {
    notFound();
  }

  const isAvailable = item.status === 'AVAILABLE';

  const conditionClass = item.condition === 'NEW'
    ? 'chip-new'
    : item.condition === 'LIKE_NEW'
    ? 'chip-like-new'
    : item.condition === 'GOOD'
    ? 'chip-good'
    : 'chip-functional';

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 20px 60px' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link href="/" style={{ color: '#2563eb' }}>Marketplace</Link>
        <ChevronRight size={14} />
        <Link href={`/listing/${category}`} style={{ color: '#2563eb' }}>{category.replace('_', ' ')}</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#0f172a', fontWeight: 600 }}>{item.title}</span>
      </div>

      {/* Error alert if atomic concurrency failed */}
      {error && (
        <div style={{
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: '8px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#be123c',
          fontSize: '13px'
        }}>
          <AlertTriangle size={20} color="#e11d48" />
          <div>
            <strong>Concurrency Lock Notice:</strong> {decodeURIComponent(error)}
          </div>
        </div>
      )}

      {/* Real Marketplace Product Layout: Left Visuals & Specs, Right Transaction Box */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1fr) 360px',
        gap: '36px',
        alignItems: 'start'
      }}>
        {/* Left Column: Images, Condition, Specs, Included Accessories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Main Photo Card */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{
              height: '380px',
              backgroundImage: `url(${item.images[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              backgroundColor: '#f1f5f9'
            }}>
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                <span className={`chip-condition ${conditionClass}`} style={{ fontSize: '12px', padding: '4px 10px' }}>
                  {item.condition.replace('_', ' ')}
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  background: isAvailable ? '#ecfdf5' : '#fffbeb',
                  color: isAvailable ? '#047857' : '#b45309',
                  border: `1px solid ${isAvailable ? '#a7f3d0' : '#fde68a'}`
                }}>
                  {item.status}
                </span>
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '12px' }}>
                {item.title}
              </h1>

              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                {item.description}
              </p>

              {/* Verified Owner Card */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#047857',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.ownerName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {item.ownerName}
                      <span className="badge-verified-student">✓ Verified Student</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Student ID: {item.ownerStudentId} • Campus Trust Rating: 4.9/5.0
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#059669', fontWeight: 600 }}>
                  <MapPin size={15} />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="#2563eb" />
              <span>Verified Technical Specifications</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {Object.entries(item.specs).map(([k, v]) => (
                <div key={k} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                    {k}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included Accessories Checklist */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck size={18} color="#059669" />
              <span>Verified Included Accessories</span>
            </h3>

            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {item.accessories.map((acc) => (
                <li key={acc} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>{acc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Sticky Reservation / Checkout Box */}
        <div style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
              <div className="price-tag">
                <span className="price-currency">$</span>
                <span className="price-amount" style={{ fontSize: '28px' }}>{item.price.toFixed(2)}</span>
                <span className="price-unit">/day</span>
              </div>
              <div style={{ fontSize: '12px', color: '#d97706', fontWeight: 700 }}>
                Deposit: ${item.depositAmount.toFixed(2)}
              </div>
            </div>

            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '6px',
              padding: '10px 12px',
              fontSize: '12px',
              color: '#166534',
              lineHeight: 1.45,
              marginBottom: '20px'
            }}>
              💡 <strong>Deposit Return Guarantee:</strong> Security deposit is held securely and returned upon verified return at ECE Lab 204.
            </div>

            {isAvailable ? (
              <form action={claimItemAction} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="hidden" name="listingId" value={item.id} />
                <input type="hidden" name="renterId" value="usr-admin" />

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Select Rental Duration:
                  </label>
                  <select
                    name="days"
                    defaultValue="7"
                    style={{
                      width: '100%',
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a',
                      outline: 'none'
                    }}
                  >
                    <option value="3">3 Days (Lab Milestone) — ${(item.price * 3).toFixed(2)}</option>
                    <option value="7">7 Days (Full Week) — ${(item.price * 7).toFixed(2)}</option>
                    <option value="14">14 Days (Extended Sprint) — ${(item.price * 14).toFixed(2)}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-market-action"
                  style={{ width: '100%', padding: '12px' }}
                >
                  <Zap size={16} />
                  <span>Reserve Equipment Now</span>
                </button>
              </form>
            ) : (
              <div style={{
                padding: '16px',
                textAlign: 'center',
                background: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: '8px',
                color: '#b45309'
              }}>
                <Clock size={20} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Currently on Loan</div>
                <div style={{ fontSize: '12px', color: '#78350f', marginTop: '2px' }}>
                  This equipment has been reserved by another student.
                </div>
              </div>
            )}

            {/* Atomic Transaction Protection Note */}
            <div style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '12px',
              color: '#64748b',
              lineHeight: 1.45
            }}>
              <Lock size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Atomic Concurrency Lock:</strong> Guarantees item cannot be double-claimed at the exact same millisecond.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
