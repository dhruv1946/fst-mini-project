import { DatabaseService } from '@/app/lib/db';
import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';

export default async function CategoryListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { category } = await params;
  const { q } = await searchParams;

  const listings = await DatabaseService.getListings(category, q);

  const categoryTitles: Record<string, string> = {
    ALL: 'All Engineering Equipment & Textbooks',
    HARDWARE_KIT: 'Microcontroller Boards & Hardware Kits',
    SENSOR: 'Sensors, Transducers & Actuator Breakouts',
    TEST_EQUIPMENT: 'Digital Multimeters & Lab Test Equipment',
    REFERENCE_BOOK: 'Academic Reference Books & Manuals',
  };

  const title = categoryTitles[category] || 'Equipment Catalog';

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        color: '#666666',
        marginBottom: '24px'
      }}>
        <Link href="/" style={{ color: '#666666' }}>Home</Link>
        <ChevronRight size={14} />
        <Link href="/listing/ALL" style={{ color: '#666666' }}>Catalog</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--mp-red)', fontWeight: 700 }}>{title}</span>
      </div>

      {/* Main Grid: Left Filter Sidebar + Right Catalog Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }}>
        {/* Left Filter Sidebar */}
        <aside style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          padding: '24px'
        }}>
          {/* Categories Filter */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '14px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '8px'
            }}>
              Product Categories
            </h3>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li>
                <Link
                  href="/listing/ALL"
                  style={{
                    color: category === 'ALL' ? 'var(--mp-red)' : '#444444',
                    fontWeight: category === 'ALL' ? 700 : 500,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>All Equipment</span>
                  <span style={{ color: '#888888' }}>({listings.length})</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/listing/HARDWARE_KIT"
                  style={{
                    color: category === 'HARDWARE_KIT' ? 'var(--mp-red)' : '#444444',
                    fontWeight: category === 'HARDWARE_KIT' ? 700 : 500,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>Microcontroller Kits</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/listing/SENSOR"
                  style={{
                    color: category === 'SENSOR' ? 'var(--mp-red)' : '#444444',
                    fontWeight: category === 'SENSOR' ? 700 : 500,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>Sensors &amp; Actuators</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/listing/TEST_EQUIPMENT"
                  style={{
                    color: category === 'TEST_EQUIPMENT' ? 'var(--mp-red)' : '#444444',
                    fontWeight: category === 'TEST_EQUIPMENT' ? 700 : 500,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>Test Equipment</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/listing/REFERENCE_BOOK"
                  style={{
                    color: category === 'REFERENCE_BOOK' ? 'var(--mp-red)' : '#444444',
                    fontWeight: category === 'REFERENCE_BOOK' ? 700 : 500,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>Academic Textbooks</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Condition Filter */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '14px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '8px'
            }}>
              Hardware Condition
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#555555' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span>Like New (Verified Lab Condition)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span>Brand New</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span>Good (Lab Tested)</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Catalog Area */}
        <div>
          {/* Top Sort / Status Bar */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            fontSize: '13px'
          }}>
            <div>
              Showing <strong>1–{listings.length}</strong> of <strong>{listings.length}</strong> results
              {q && <span> for &ldquo;<strong>{q}</strong>&rdquo;</span>}
            </div>

            <div style={{ color: '#666666' }}>
              Sort by: <strong style={{ color: '#111827' }}>Featured Items</strong>
            </div>
          </div>

          {/* 3-Column Catalog Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {listings.map((item) => {
              const retailPrice = (item.price * 15 + 20).toFixed(2);

              return (
                <div key={item.id} className="mp-product-card" style={{ textAlign: 'left', alignItems: 'stretch' }}>
                  {/* Photo */}
                  <div
                    className="mp-product-image"
                    style={{
                      backgroundImage: `url(${item.images[0]})`,
                      height: '170px'
                    }}
                  />

                  {/* Title */}
                  <Link
                    href={`/listing/${item.category}/${item.id}`}
                    className="mp-product-title"
                    style={{ height: '42px' }}
                  >
                    {item.title}
                  </Link>

                  <div style={{ fontSize: '11px', color: '#666666', marginBottom: '8px' }}>
                    Condition: <strong style={{ color: 'var(--mp-navy)' }}>{item.condition.replace('_', ' ')}</strong>
                  </div>

                  {/* Pricing */}
                  <div className="mp-product-pricing" style={{ justifyContent: 'flex-start', marginBottom: '10px' }}>
                    <span className="mp-price-old">${retailPrice}</span>
                    <span className="mp-price-current">${item.price.toFixed(2)}/day</span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#888888', marginBottom: '14px' }}>
                    Pickup: {item.location}
                  </div>

                  {/* Action Button */}
                  <div style={{ marginTop: 'auto' }}>
                    <Link
                      href={`/listing/${item.category}/${item.id}`}
                      className="btn-mp-red"
                      style={{ width: '100%', padding: '8px 14px', fontSize: '12px' }}
                    >
                      Reserve Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}