import React from 'react';
export function Card({ variant = 'paper', dashed, children, style, ...rest }) {
  const variants = {
    paper: { background: 'var(--zn-archival-paper)', border: dashed ? 'var(--border-dashed) var(--zn-verification-stamp)' : '2px solid var(--border-strong)', color: 'var(--text-body)', borderRadius: 'var(--radius-sm)' },
    blue: { background: 'var(--zn-blueprint-ink)', color: 'var(--text-on-blue)', borderRadius: 'var(--radius-sm)', border: 'none' },
    red: { background: 'var(--zn-verification-stamp)', color: 'var(--text-on-red)', borderRadius: 'var(--radius-sm)', border: 'none' },
    glass: { background: 'var(--glass-bg)', color: 'var(--zn-archival-paper)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(var(--glass-blur))', WebkitBackdropFilter: 'blur(var(--glass-blur))', boxShadow: 'var(--shadow-glass)' },
    glassStrong: { background: 'var(--glass-bg-strong)', color: 'var(--zn-ink-black)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(var(--glass-blur-strong))', WebkitBackdropFilter: 'blur(var(--glass-blur-strong))', boxShadow: 'var(--shadow-glass)' },
  };
  return <div {...rest} style={{ padding: 'var(--space-5)', fontFamily: 'var(--font-mono)', ...variants[variant], ...style }}>{children}</div>;
}