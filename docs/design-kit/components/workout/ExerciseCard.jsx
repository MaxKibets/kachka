import React from 'react';
import { IconButton } from '../buttons/IconButton';
import { Button } from '../buttons/Button';

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.9" /><circle cx="12" cy="12" r="1.9" /><circle cx="19" cy="12" r="1.9" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function ExerciseCard({
  icon,
  accentIcon = false,
  title,
  meta,
  kebab = true,
  onKebabClick,
  progress,
  addLabel,
  onAdd,
  children,
  bare = false
}) {
  const body = (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 12,
              flex: 'none',
              background: accentIcon ? 'var(--current-tint)' : 'var(--surface-2)',
              color: accentIcon ? 'var(--accent)' : 'var(--text-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-.01em', color: 'var(--text)', whiteSpace: 'nowrap' }}>{title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
          {meta && <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{meta}</div>}
          {kebab && <IconButton size="sm" ariaLabel="More" icon={<MoreIcon />} onClick={onKebabClick} />}
        </div>
      </div>
      {progress && <div style={{ marginBottom: 16 }}>{progress}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
      {addLabel && (
        <div style={{ marginTop: 10 }}>
          <Button variant="secondary" icon={<PlusIcon />} onClick={onAdd}>{addLabel}</Button>
        </div>
      )}
    </React.Fragment>
  );

  if (bare) return <div>{body}</div>;
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 24, padding: 16, border: '1px solid var(--line)' }}>
      {body}
    </div>
  );
}
