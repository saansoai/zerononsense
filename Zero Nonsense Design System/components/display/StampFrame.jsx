import React from 'react';
/* Postage-stamp scalloped frame, built with a radial-gradient mask like the ZN* secondary logo. */
export function StampFrame({ color = 'blue', inset = 12, children, style }) {
  const bg = { blue: 'var(--zn-blueprint-ink)', red: 'var(--zn-verification-stamp)', paper: 'var(--zn-archival-paper)', ink: 'var(--zn-ink-black)' }[color];
  const mask = 'radial-gradient(circle 7px at 7px 7px, transparent 6.5px, #000 7px) -7px -7px / 21px 21px';
  return (
    <div style={{ background: bg, padding: inset + 8, WebkitMask: mask, mask, display: 'inline-block', ...style }}>
      <div style={{ border: color === 'paper' ? 'none' : 'none', background: color === 'paper' ? 'var(--zn-archival-paper)' : 'transparent', padding: inset, display: 'grid', placeItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}