import { DatabaseService } from '@/app/lib/db';
import { createThreadAction } from '@/app/actions/forum-actions';
import Link from 'next/link';
import { 
  Search, 
  ThumbsUp, 
  MessageSquare, 
  CheckCircle, 
  HelpCircle,
  PlusCircle,
  Cpu
} from 'lucide-react';

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const threads = await DatabaseService.getForumThreads(category, q);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 60px' }}>
      {/* Amazon Q&A Header */}
      <div style={{ background: '#ffffff', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '24px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f1111', marginBottom: '6px' }}>
          Customer &amp; Lab Questions &amp; Answers
        </h1>
        <p style={{ fontSize: '13px', color: '#565959', marginBottom: '20px' }}>
          Have a question about GPIO pins, sensor drift, or course textbook differences? Search answers from verified students.
        </p>

        {/* Amazon style Q&A search bar */}
        <form method="GET" style={{ position: 'relative', maxWidth: '700px' }}>
          <Search size={18} color="#565959" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            name="q"
            defaultValue={q || ''}
            placeholder="Have a question? Search for answers..."
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              border: '1px solid #888c8c',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
            }}
          />
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        {/* Main Q&A List */}
        <div style={{ background: '#ffffff', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f1111' }}>
              Showing {threads.length} Questions
            </h2>

            <div style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
              <Link href="/forum" style={{ fontWeight: !category ? 700 : 400, color: !category ? '#c45500' : '#007185' }}>
                All
              </Link>
              <span>|</span>
              <Link href="/forum?category=HARDWARE_DEBUG" style={{ fontWeight: category === 'HARDWARE_DEBUG' ? 700 : 400, color: category === 'HARDWARE_DEBUG' ? '#c45500' : '#007185' }}>
                Hardware Debug
              </Link>
              <span>|</span>
              <Link href="/forum?category=SENSOR_HELP" style={{ fontWeight: category === 'SENSOR_HELP' ? 700 : 400, color: category === 'SENSOR_HELP' ? '#c45500' : '#007185' }}>
                Sensor Help
              </Link>
              <span>|</span>
              <Link href="/forum?category=BOOK_RECOMMENDATION" style={{ fontWeight: category === 'BOOK_RECOMMENDATION' ? 700 : 400, color: category === 'BOOK_RECOMMENDATION' ? '#c45500' : '#007185' }}>
                Textbooks
              </Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {threads.map((th) => (
              <div
                key={th.id}
                style={{
                  borderTop: '1px solid #e7e7e7',
                  padding: '18px 0',
                  display: 'flex',
                  gap: '16px'
                }}
              >
                {/* Vote box */}
                <div style={{
                  minWidth: '50px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  fontSize: '12px',
                  color: '#565959'
                }}>
                  <ThumbsUp size={16} color="#007185" />
                  <span style={{ fontWeight: 700, color: '#0f1111', marginTop: '2px' }}>{th.upvotes}</span>
                  <span>votes</span>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#0f1111', fontSize: '15px' }}>Question:</span>
                    <Link href={`/forum/${th.id}`} style={{ fontSize: '15px', fontWeight: 700, color: '#007185', lineHeight: 1.35 }}>
                      {th.title}
                    </Link>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                    <span style={{ fontWeight: 700, color: '#007600', fontSize: '14px' }}>Answer:</span>
                    <div style={{ fontSize: '13px', color: '#333333', lineHeight: 1.5 }}>
                      {th.replies.length > 0 ? th.replies[0].content : th.content}
                      <div style={{ fontSize: '12px', color: '#565959', marginTop: '4px' }}>
                        By <strong style={{ color: '#0f1111' }}>{th.authorName}</strong> on {new Date(th.createdAt).toLocaleDateString()} • {th.replies.length} total answers
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                    {th.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: '11px', background: '#f0f2f2', border: '1px solid #d5d9d9', padding: '2px 8px', borderRadius: '4px', color: '#565959' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Post a Question form */}
        <div style={{ background: '#ffffff', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f1111', marginBottom: '8px' }}>
            Don&apos;t see the answer you&apos;re looking for?
          </h2>
          <p style={{ fontSize: '13px', color: '#565959', marginBottom: '16px' }}>
            Ask verified engineering students and course lab assistants.
          </p>

          <form action={createThreadAction} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f1111', marginBottom: '4px' }}>
                Your Question:
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Type your question here..."
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #888c8c',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f1111', marginBottom: '4px' }}>
                Department / Topic:
              </label>
              <select
                name="category"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #888c8c',
                  borderRadius: '4px',
                  fontSize: '13px',
                  background: '#f0f2f2'
                }}
              >
                <option value="HARDWARE_DEBUG">Hardware Debug (Arduino, ESP32)</option>
                <option value="SENSOR_HELP">Sensors &amp; I2C/SPI Protocols</option>
                <option value="BOOK_RECOMMENDATION">Engineering Textbooks</option>
                <option value="GENERAL">General Lab Questions</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f1111', marginBottom: '4px' }}>
                Details &amp; Circuit Context:
              </label>
              <textarea
                name="content"
                required
                rows={4}
                placeholder="Include baud rates, wiring schematics, and test bench findings..."
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #888c8c',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
              />
            </div>

            <button type="submit" className="btn-amz-yellow" style={{ width: '100%', marginTop: '6px' }}>
              Post Your Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
