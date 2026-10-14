import { DatabaseService } from '@/app/lib/db';
import Link from 'next/link';
import { 
  PlusCircle, 
  Clock, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Tag, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export default async function MyListingsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/login?error=login_required&redirect=/my-listings');
  }

  const allListings = await DatabaseService.getListings();
  const reservations = await DatabaseService.getReservations();
  const myListings = allListings.filter((l) => l.ownerId === currentUser.id);

  async function createNewListing(formData: FormData) {
    'use server';

    const user = await getCurrentUser();
    if (!user) {
      redirect('/login?error=login_required&redirect=/my-listings');
    }

    const title = String(formData.get('title') || 'Custom Lab Gear');
    const category = String(formData.get('category') || 'HARDWARE_KIT') as any;
    const condition = String(formData.get('condition') || 'LIKE_NEW') as any;
    const listingType = String(formData.get('listingType') || 'FOR_RENT') as any;
    const price = parseFloat(String(formData.get('price') || '3.00'));
    const depositAmount = parseFloat(String(formData.get('deposit') || '20.00'));
    const description = String(formData.get('description') || 'Clean student engineering equipment for lab coursework.');
    const location = String(formData.get('location') || 'Campus ECE Lab 204');

    await DatabaseService.createListing({
      title,
      category,
      condition,
      listingType,
      price,
      depositAmount,
      description,
      location,
      status: 'AVAILABLE',
      ownerId: user.id,
      ownerName: user.name,
      ownerStudentId: user.studentId || 'ENG-2024-XXXX',
      isOwnerVerified: user.isVerifiedStudent,
      specs: {
        'Origin': 'Purchased for engineering semester lab',
        'Inspection': 'Self-tested and 100% functional',
      },
      accessories: ['Original test cables & headers included'],
      images: ['https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800'],
    });

    revalidatePath('/my-listings');
    revalidatePath('/listing/ALL');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Active Inventory Section */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
              My Listed Hardware &amp; Textbooks ({myListings.length})
            </h2>
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              Equipment available for peer rental on the Campus Exchange.
            </div>
          </div>

          <a href="#new-listing-form" className="btn-market-action" style={{ fontSize: '13px', padding: '8px 16px' }}>
            <PlusCircle size={15} />
            <span>+ List New Gear</span>
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {myListings.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #f1f5f9',
                borderRadius: '8px',
                padding: '16px 20px',
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: '20px',
                alignItems: 'center',
                background: '#f8fafc'
              }}
            >
              <div style={{
                width: '100px',
                height: '75px',
                backgroundImage: `url(${item.images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '6px',
                border: '1px solid #e2e8f0'
              }} />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: item.status === 'AVAILABLE' ? '#ecfdf5' : '#fffbeb',
                    color: item.status === 'AVAILABLE' ? '#047857' : '#b45309',
                    border: `1px solid ${item.status === 'AVAILABLE' ? '#a7f3d0' : '#fde68a'}`
                  }}>
                    {item.status}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Condition: <strong>{item.condition.replace('_', ' ')}</strong>
                  </span>
                </div>

                <Link href={`/listing/${item.category}/${item.id}`} style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                  {item.title}
                </Link>

                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Rate: <strong style={{ color: '#0f172a' }}>${item.price.toFixed(2)}/day</strong> • Security Deposit: ${item.depositAmount.toFixed(2)} • Hand-off: {item.location}
                </div>
              </div>

              <div>
                <Link
                  href={`/listing/${item.category}/${item.id}`}
                  className="btn-market-secondary"
                  style={{ fontSize: '12px' }}
                >
                  <span>View Public Listing</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Loans & In-App Reservations */}
      <div id="active-loans" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
          Active Reservations &amp; Equipment Handoffs
        </h2>
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
          Verified borrower requests protected with refundable deposits and digital tokens.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {reservations.map((res) => (
            <div
              key={res.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '18px 20px',
                background: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: '#eff6ff',
                    color: '#1d4ed8',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {res.verificationToken}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Borrower: <strong style={{ color: '#0f172a' }}>{res.renterName} (Verified)</strong>
                  </span>
                </div>

                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  {res.listingTitle}
                </div>

                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Scheduled Return: <strong>{new Date(res.returnDeadline).toLocaleDateString()} at 17:00</strong> • Total: ${res.totalCost.toFixed(2)} (Deposit: ${res.depositHeld.toFixed(2)})
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link
                  href={`/receipt/${res.id}`}
                  className="btn-market-secondary"
                  style={{ fontSize: '12px' }}
                >
                  <FileText size={14} />
                  <span>View Digital Receipt</span>
                </Link>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: '#ecfdf5',
                  color: '#047857',
                  fontWeight: 700,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <CheckCircle2 size={14} />
                  <span>{res.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* List an Item Form */}
      <div id="new-listing-form" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
          List a Hardware Kit or Academic Textbook
        </h2>
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          Add your equipment to the campus directory for fellow students to borrow or buy.
        </div>

        <form action={createNewListing} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              Equipment or Book Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Raspberry Pi 4B (4GB) Lab Starter Kit"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              Department / Category
            </label>
            <select name="category" style={{ width: '100%' }}>
              <option value="HARDWARE_KIT">Microcontroller Boards &amp; Hardware Kits</option>
              <option value="SENSOR">Sensors &amp; Actuators</option>
              <option value="TEST_EQUIPMENT">Digital Multimeters &amp; Probes</option>
              <option value="REFERENCE_BOOK">Academic Reference Books</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              Condition Grading
            </label>
            <select name="condition" style={{ width: '100%' }}>
              <option value="LIKE_NEW">Like New (Mint pins, original headers)</option>
              <option value="NEW">Brand New / Sealed</option>
              <option value="GOOD">Good (Lightly used, verified functional)</option>
              <option value="FUNCTIONAL">Functional (Tested working)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              Daily Rate ($/day)
            </label>
            <input type="number" step="0.5" name="price" defaultValue="3.00" style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              Refundable Deposit ($)
            </label>
            <input type="number" name="deposit" defaultValue="20.00" style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              Campus Hand-off Location
            </label>
            <input type="text" name="location" defaultValue="ECE Lab 204, Locker #12" style={{ width: '100%' }} />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
              Description &amp; Included Accessories
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue="Tested for microcontroller lab experiments. Flawless 40-pin GPIO headers and includes original jumper wires."
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" className="btn-market-action" style={{ padding: '10px 24px' }}>
              Publish Verified Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
