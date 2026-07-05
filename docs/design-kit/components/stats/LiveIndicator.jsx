import React from 'react';

export function LiveIndicator({ time }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)', fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'wt-pulse 1.6s ease-in-out infinite' }} />
      {time}
    </div>
  );
}
