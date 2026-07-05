import React from 'react';
import { Button } from '../buttons/Button';
import { ProgressBar } from '../progress/ProgressBar';

function MinusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14" /></svg>;
}
function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>;
}
function SkipIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5l8 7-8 7zM18 5v14" /></svg>;
}

export function RestBar({ exerciseLabel, time, value = 56, onAdjust, onSkip }) {
  return (
    <div
      style={{
        width: 390,
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        borderRadius: '28px 28px 0 0',
        padding: '18px 18px 24px',
        fontFamily: 'var(--font-sans)',
        color: 'var(--text)',
        boxShadow: 'var(--shadow-elevation)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.09em', textTransform: 'uppercase', color: 'var(--accent)' }}>Resting</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-2)', marginTop: 4 }}>{exerciseLabel}</div>
        </div>
        <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1, letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums', color: 'var(--text)' }}>{time}</div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <ProgressBar value={value} />
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button fullWidth={false} flex={1} tone="var(--text)" icon={<MinusIcon />} onClick={() => onAdjust && onAdjust(-15)}>15s</Button>
        <Button fullWidth={false} flex={1.5} variant="accent" gap={8} onClick={onSkip}>Skip rest<SkipIcon /></Button>
        <Button fullWidth={false} flex={1} tone="var(--text)" icon={<PlusIcon />} onClick={() => onAdjust && onAdjust(15)}>15s</Button>
      </div>
    </div>
  );
}
