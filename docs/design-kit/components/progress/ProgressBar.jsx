import React from 'react';

export function ProgressBar({ segments = 1, current = 0, value = 0, height = 4 }) {
  if (segments > 1) {
    return (
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height,
              borderRadius: height / 2,
              background: i < current ? 'var(--accent)' : 'var(--surface-2)',
              opacity: i < current ? 0.4 : 1
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <div style={{ height, borderRadius: height / 2, background: 'var(--surface-2)', overflow: 'hidden' }}>
      <div style={{ width: value + '%', height: '100%', borderRadius: height / 2, background: 'var(--accent)', opacity: 0.4 }} />
    </div>
  );
}
