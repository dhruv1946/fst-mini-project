import { DatabaseService } from '@/app/lib/db';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import { approveListingAction, rejectListingAction, resolveDisputeAction } from '@/app/actions/moderation-actions';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  Cpu,
  Lock
} from 'lucide-react';

export default async function ModerationQueuePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    redirect('/login?error=admin_required&redirect=/admin/moderation');
  }

  const listings = await DatabaseService.getListings();
  const disputes = await DatabaseService.getDisputes();

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 24px 60px' }}>
      {/* Header Guard Banner */}
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#e11d48', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
            <ShieldCheck size={16} />
            <span>PROTECTED MODERATOR &amp; ADMIN ACCESS ROUTE</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>
            Equipment Approvals &amp; Dispute Resolution Desk
          </h1>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            Campus administrative desk with verified academic domain clearance and equipment dispute management.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '12px 18px', textAlign: 'center', minWidth: '120px' }}>
            <div style={{ fontSize: '11px', color: '#9f1239', fontWeight: 700, textTransform: 'uppercase' }}>
              Open Disputes
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#e11d48' }}>
              {disputes.filter((d) => d.status !== 'RESOLVED').length}
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 18px', textAlign: 'center', minWidth: '120px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
              Total Listings
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
              {listings.length}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '28px' }}>
        {/* Section 1: Equipment Dispute & Report Desk */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
            Equipment Dispute Desk
          </h2>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
            Manage condition disagreements, missing cables, and student deposit hold inquiries.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {disputes.map((d) => (
              <div
                key={d.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  background: '#f8fafc'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: d.status === 'RESOLVED' ? '#ecfdf5' : '#fffbeb',
                    color: d.status === 'RESOLVED' ? '#047857' : '#b45309',
                    border: `1px solid ${d.status === 'RESOLVED' ? '#a7f3d0' : '#fde68a'}`
                  }}>
                    {d.status}
                  </span>

                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Reported by: <strong style={{ color: '#0f172a' }}>{d.reporterName}</strong>
                  </span>
                </div>

                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  {d.reason}
                </div>

                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '12px' }}>
                  {d.details}
                </p>

                {d.moderatorNotes && (
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#1e40af', marginBottom: '12px' }}>
                    <strong>Moderator Log:</strong> {d.moderatorNotes}
                  </div>
                )}

                {d.status !== 'RESOLVED' && (
                  <form action={resolveDisputeAction} style={{ display: 'flex', gap: '8px' }}>
                    <input type="hidden" name="disputeId" value={d.id} />
                    <input
                      type="text"
                      name="notes"
                      required
                      placeholder="Add resolution note (e.g. Missing cable returned)..."
                      style={{
                        flex: 1,
                        fontSize: '12px',
                        padding: '6px 10px'
                      }}
                    />
                    <button type="submit" className="btn-market-action" style={{ fontSize: '12px', padding: '6px 14px' }}>
                      Resolve
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Listing Safety & Quality Review */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
            Listing Safety &amp; Quality Review
          </h2>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
            Audit student equipment to ensure proper condition descriptions and safe campus hand-offs.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {listings.map((item) => (
              <div
                key={item.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  background: '#ffffff'
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Lender: {item.ownerName} ({item.ownerStudentId}) • ₹{item.price}/day • {item.location}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <form action={approveListingAction.bind(null, item.id)}>
                    <button
                      type="submit"
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        color: '#047857',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Approve
                    </button>
                  </form>

                  <form action={rejectListingAction.bind(null, item.id)}>
                    <button
                      type="submit"
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: '#fff1f2',
                        border: '1px solid #fecdd3',
                        color: '#e11d48',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Flag/Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
