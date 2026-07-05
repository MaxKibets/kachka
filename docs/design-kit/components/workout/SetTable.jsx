import React from 'react';
import { SetMarker } from './SetMarker';

function cols(showPre) {
  return showPre
    ? '28px minmax(0,1fr) 24px minmax(0,1fr) minmax(0,1fr) 30px'
    : '28px minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) 30px';
}

export function SetTable({ sets = [], showPreColumn = true, onSetClick }) {
  const gridTemplateColumns = cols(showPreColumn);
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns,
          gap: 6,
          padding: '0 0 6px 4px',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '.07em',
          color: 'var(--text-3)',
          textTransform: 'uppercase'
        }}
      >
        <span>Set</span>
        <span>Previous</span>
        {showPreColumn && <span style={{ textAlign: 'center' }}>Pre</span>}
        <span style={{ textAlign: 'center' }}>Kg</span>
        <span style={{ textAlign: 'center' }}>Reps</span>
        <span />
      </div>
      {sets.map((s, i) => (
        <div
          key={i}
          onClick={onSetClick ? () => onSetClick(i, s) : undefined}
          style={{
            display: 'grid',
            gridTemplateColumns,
            gap: 6,
            alignItems: 'center',
            padding: '8px 0 8px 4px',
            borderBottom: i < sets.length - 1 ? '1px solid var(--line)' : 'none',
            cursor: onSetClick ? 'pointer' : 'default'
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: s.warmup ? 'var(--warmup)' : 'var(--text)' }}>{s.set}</span>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-3)' }}>{s.previous}</div>
          {showPreColumn && <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{s.pre}</div>}
          <div style={{ textAlign: 'center', fontSize: s.kg == null ? 18 : 14, fontWeight: 700, color: s.kg == null ? 'var(--text-3)' : 'var(--text)' }}>{s.kg ?? '—'}</div>
          <div style={{ textAlign: 'center', fontSize: s.reps == null ? 18 : 14, fontWeight: 700, color: s.reps == null ? 'var(--text-3)' : 'var(--text)' }}>{s.reps ?? '—'}</div>
          <div style={{ justifySelf: 'end' }}>
            <SetMarker status={s.status} />
          </div>
        </div>
      ))}
    </div>
  );
}
