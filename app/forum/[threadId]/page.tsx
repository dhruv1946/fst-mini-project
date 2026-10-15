import { DatabaseService } from '@/app/lib/db';
import { addReplyAction, upvoteThreadAction, markSolutionAction } from '@/app/actions/forum-actions';
import { ForumReplySubmitButton } from '@/app/components/ForumSubmitButton';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ThumbsUp, 
  CheckCircle, 
  ChevronRight, 
  Check, 
  ShieldCheck,
  HelpCircle 
} from 'lucide-react';

export default async function ForumThreadDetailPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  const thread = await DatabaseService.getForumThreadById(threadId);

  if (!thread) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto 80px', padding: '0 20px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '36px', textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#fef3c7',
            color: '#b45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <HelpCircle size={28} />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0f1111', marginBottom: '8px' }}>
            Discussion Not Found or Session Expired
          </h1>
          <p style={{ fontSize: '14px', color: '#565959', maxWidth: '500px', margin: '0 auto 24px', lineHeight: 1.5 }}>
            This question may have been created in another session or serverless container. You can browse all community questions or post a new one.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link
              href="/forum"
              className="btn-amz-yellow"
              style={{ padding: '8px 20px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Community Q&amp;A</span>
            </Link>
            <Link
              href="/forum#ask"
              className="btn-amz-secondary"
              style={{ padding: '8px 20px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
            >
              <span>Ask a Question</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 20px 60px' }}>
      {/* Amazon Breadcrumb */}
      <div style={{ fontSize: '12px', color: '#565959', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link href="/">Home</Link>
        <ChevronRight size={12} />
        <Link href="/forum">Customer Questions &amp; Answers</Link>
        <ChevronRight size={12} />
        <span style={{ color: '#0f1111' }}>Question Details</span>
      </div>

      {/* Main Question Box */}
      <div style={{ background: '#ffffff', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          {/* Votes */}
          <form action={upvoteThreadAction.bind(null, thread.id)} style={{ textAlign: 'center', minWidth: '60px' }}>
            <button
              type="submit"
              className="btn-amz-secondary"
              style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <ThumbsUp size={16} color="#007185" />
              <strong style={{ fontSize: '13px', color: '#0f1111', marginTop: '4px' }}>{thread.upvotes}</strong>
              <span style={{ fontSize: '11px', color: '#565959' }}>Votes</span>
            </button>
          </form>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 800, color: '#0f1111', fontSize: '18px' }}>Q:</span>
              <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#0f1111', lineHeight: 1.35 }}>
                {thread.title}
              </h1>
            </div>

            <p style={{ fontSize: '14px', color: '#333333', lineHeight: 1.6, marginBottom: '14px', whiteSpace: 'pre-line' }}>
              {thread.content}
            </p>

            <div style={{ fontSize: '12px', color: '#565959', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Asked by <strong style={{ color: '#0f1111' }}>{thread.authorName}</strong> (Verified Student) on {new Date(thread.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span style={{ color: '#007185' }}>Category: {thread.category.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div style={{ background: '#ffffff', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f1111', marginBottom: '16px' }}>
          {thread.replies.length} Answers from Verified Students
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {thread.replies.map((reply) => (
            <div
              key={reply.id}
              style={{
                borderTop: '1px solid #e7e7e7',
                paddingTop: '18px',
                display: 'flex',
                gap: '16px'
              }}
            >
              <div style={{ fontWeight: 800, color: '#007600', fontSize: '16px' }}>
                A:
              </div>

              <div style={{ flex: 1 }}>
                {reply.isSolution && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#e6f4ea',
                    color: '#137333',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    marginBottom: '8px'
                  }}>
                    <CheckCircle size={14} />
                    <span>VERIFIED SOLUTION (Instructor / Author Accepted)</span>
                  </div>
                )}

                <p style={{ fontSize: '14px', color: '#111111', lineHeight: 1.6, marginBottom: '10px' }}>
                  {reply.content}
                </p>

                <div style={{ fontSize: '12px', color: '#565959', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    By <strong style={{ color: '#0f1111' }}>{reply.authorName}</strong> on {new Date(reply.createdAt).toLocaleDateString()}
                  </div>

                  {!reply.isSolution && (
                    <form action={markSolutionAction.bind(null, thread.id, reply.id)}>
                      <button
                        type="submit"
                        className="btn-amz-secondary"
                        style={{ fontSize: '11px', padding: '4px 10px' }}
                      >
                        Mark as Accepted Solution
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Form */}
      <div style={{ background: '#ffffff', border: '1px solid #d5d9d9', borderRadius: '4px', padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f1111', marginBottom: '8px' }}>
          Have an answer to this question?
        </h3>
        <p style={{ fontSize: '13px', color: '#565959', marginBottom: '16px' }}>
          Help fellow engineering students with schematics, circuit design, or textbook comparisons.
        </p>

        <form action={addReplyAction} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="hidden" name="threadId" value={thread.id} />
          <textarea
            name="content"
            required
            rows={4}
            placeholder="Type your answer here..."
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #888c8c',
              borderRadius: '4px',
              fontSize: '13px'
            }}
          />
          <div>
            <ForumReplySubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
