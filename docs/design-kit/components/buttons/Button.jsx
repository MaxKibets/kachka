import React from 'react';

export function Button({
  variant = 'secondary',
  icon,
  children,
  onClick,
  fullWidth = true,
  flex,
  gap = 6,
  tone
}) {
  const isAccent = variant === 'accent';
  return (
    <button
      onClick={onClick}
      style={{
        width: fullWidth ? '100%' : undefined,
        flex,
        padding: fullWidth ? 12 : '14px 0',
        borderRadius: 16,
        background: isAccent ? 'var(--accent)' : 'var(--surface-2)',
        border: isAccent ? 'none' : '1px solid var(--line)',
        color: tone ?? (isAccent ? '#fff' : 'var(--text-2)'),
        fontFamily: 'inherit',
        fontWeight: 700,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap,
        cursor: 'pointer',
        boxShadow: isAccent ? 'var(--shadow-accent-glow)' : 'none'
      }}
    >
      {icon}
      {children}
    </button>
  );
}
