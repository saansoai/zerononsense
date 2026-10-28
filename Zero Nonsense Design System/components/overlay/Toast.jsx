import React from 'react';
export function Toast({ open = true, tone = 'ink', children, onDismiss, style }) {
  if (!open) return null;
  const tones = {
    ink: { background: 'var(--zn-ink-black)', color: 'var(--zn-archival-paper)' },
    red: { background: 'var(--zn-verification-stamp)', color: 'var(--text-on-red)' },
    blue: { background: 'var(--zn-blueprint-ink)', color: 'var(--text-on-blue)' },
  };
  return (
    <div role="status" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-glass)', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 'var(--leading-body)', ...tones[tone], ...style }}>
      <span aria-hidden="true" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '18px', lineHeight: 1 }}>*</span>
      <span>{children}</span>
      {onDismiss && <button onClick={onDismiss} aria-label="Dismiss" style={{ border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer', fontSize: '14px', opacity: 0.7, padding: 0 }}>✕</button>}
    </div>
  );
}