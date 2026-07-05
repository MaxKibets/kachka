import React from 'react';

export function StatBlock({ value, suffix, unit, label }) {
  return (
    <div
      style={{
        flex: '0 0 auto',
        height: 62,
        padding: '0 18px',
        background: 'var(--surface-2)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        whiteSpace: 'nowrap'
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--text)', lineHeight: 1 }}>
        {value}
        {suffix ? <React.Fragment> <span style={{ color: 'var(--text-2)' }}>{suffix}</span></React.Fragment> : null}
        {unit ? <React.Fragment> <span style={{ fontSize: 10, color: 'var(--text-2)' }}>{unit}</span></React.Fragment> : null}
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '.07em' }}>{label}</div>
    </div>
  );
}
