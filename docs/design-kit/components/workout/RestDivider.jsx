import React from 'react';

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function RestDivider({ label = 'Rest', icon = <ClockIcon /> }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 700,
          color: 'var(--text-2)',
          background: 'var(--surface-2)',
          padding: '8px 12px',
          borderRadius: 12,
          whiteSpace: 'nowrap'
        }}
      >
        {icon}
        {label}
      </div>
      <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
    </div>
  );
}
