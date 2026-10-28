import React from 'react';
export function Tag({ selected, onClick, children, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase',
      padding: '6px 14px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
      border: '1.5px solid var(--border-strong)',
      background: selected ? 'var(--zn-ink-black)' : hover ? 'rgba(30,28,24,0.08)' : 'transparent',
      color: selected ? 'var(--zn-archival-paper)' : 'var(--text-body)',
      transition: 'all var(--dur-fast) var(--ease-brand)', ...style }}>
      {children}
    </button>
  );
}