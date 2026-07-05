import React from 'react';

export function SetMarker({ status = 'pending', size = 30 }) {
  if (status === 'complete') {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width={size * 0.53} height={size * 0.53} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7" />
        </svg>
      </div>
    );
  }
  if (status === 'active') {
    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <div
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, var(--accent), var(--line) 50%, var(--accent) 100%)',
            animation: 'wt-spin 2.4s linear infinite'
          }}
        />
        <div style={{ position: 'relative', width: size, height: size, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--line)' }} />
      </div>
    );
  }
  return <div style={{ width: size, height: size, borderRadius: '50%', border: '1px solid var(--line)' }} />;
}
