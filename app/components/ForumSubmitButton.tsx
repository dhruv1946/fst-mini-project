'use client';

import { useFormStatus } from 'react-dom';

export function ForumSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-amz-yellow"
      style={{
        width: '100%',
        marginTop: '6px',
        opacity: pending ? 0.75 : 1,
        cursor: pending ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px 14px',
        fontWeight: 700,
        fontSize: '13px',
      }}
    >
      {pending ? (
        <>
          <span
            style={{
              display: 'inline-block',
              width: '14px',
              height: '14px',
              border: '2px solid #0f1111',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <span>Publishing Question...</span>
        </>
      ) : (
        'Post Your Question'
      )}
    </button>
  );
}

export function ForumReplySubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-amz-yellow"
      style={{
        padding: '8px 22px',
        opacity: pending ? 0.75 : 1,
        cursor: pending ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 700,
        fontSize: '13px',
      }}
    >
      {pending ? (
        <>
          <span
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              border: '2px solid #0f1111',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <span>Submitting Answer...</span>
        </>
      ) : (
        'Submit Answer'
      )}
    </button>
  );
}
