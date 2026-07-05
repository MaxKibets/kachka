import React from 'react';

export function IconButton({ icon, size = 'lg', onClick, ariaLabel }) {
  const dims = size === 'lg' ? 44 : 30;
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: dims,
        height: dims,
        flex: 'none',
        borderRadius: '50%',
        background: size === 'lg' ? 'var(--surface)' : 'var(--surface-2)',
        border: '1px solid var(--line)',
        color: size === 'lg' ? 'var(--text)' : 'var(--text-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit'
      }}
    >
      {icon}
    </button>
  );
}
