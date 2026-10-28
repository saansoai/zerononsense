import React from 'react';
export function Tooltip({ label, children, side = 'top' }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translate(-50%,-8px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%,8px)' },
    right: { left: '100%', top: '50%', transform: 'translate(8px,-50%)' },
    left: { right: '100%', top: '50%', transform: 'translate(-8px,-50%)' },
  }[side];
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      {show && (
        <span role="tooltip" style={{ position: 'absolute', zIndex: 100, whiteSpace: 'nowrap', ...pos,
          background: 'var(--zn-ink-black)', color: 'var(--zn-archival-paper)', fontFamily: 'var(--font-mono)',
          fontSize: '11px', letterSpacing: '0.04em', padding: '6px 10px', borderRadius: '4px', pointerEvents: 'none' }}>
          {label}
        </span>
      )}
    </span>
  );
}