import React from 'react';

function Flag({ mirrored }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="3" />
    </svg>
  );
}

export function CTAButton({ label = 'FINISH', holdLabel = 'Hold to', onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        flex: '1 1 auto',
        minWidth: 0,
        height: 62,
        padding: '0 14px',
        borderRadius: 16,
        background: 'var(--accent)',
        border: 'none',
        color: '#fff',
        fontFamily: 'inherit',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-accent-glow)',
        overflow: 'hidden'
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: '-.01em',
          animation: 'wt-cta-a 3.6s ease-in-out infinite',
          whiteSpace: 'nowrap'
        }}
      >
        <Flag mirrored />
        {label}
        <Flag />
      </span>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: '-.01em',
          animation: 'wt-cta-b 3.6s ease-in-out infinite',
          whiteSpace: 'nowrap'
        }}
      >
        {holdLabel}
      </span>
    </button>
  );
}
