import React from 'react';
export function Badge({ color = 'red', children, style }) {
  const colors = {
    red: { background: 'var(--zn-verification-stamp)', color: 'var(--text-on-red)' },
    blue: { background: 'var(--zn-blueprint-ink)', color: 'var(--text-on-blue)' },
    ink: { background: 'var(--zn-ink-black)', color: 'var(--zn-archival-paper)' },
    paper: { background: 'var(--zn-archival-paper)', color: 'var(--text-body)', border: '1.5px solid var(--border-strong)' },
  };
  return <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, letterSpacing: 'var(--kerning-sub)', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '3px', ...colors[color], ...style }}>{children}</span>;
}