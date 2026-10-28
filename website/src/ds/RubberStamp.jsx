import React from 'react';
/* Circular rubber stamp: text on a circle around the brand asterisk, rotated like a hand stamp. */
export function RubberStamp({ text = '100% Ingredient Transparency • ', size = 120, color = 'red', rotate = -12, style }) {
  const c = { red: 'var(--zn-verification-stamp)', blue: 'var(--zn-blueprint-ink)', paper: 'var(--zn-archival-paper)', ink: 'var(--zn-ink-black)' }[color];
  const r = size / 2 - 12;
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: `rotate(${rotate}deg)`, ...style }} role="img" aria-label={text}>
      <circle cx={size/2} cy={size/2} r={size/2 - 2} fill="none" stroke={c} strokeWidth="2.5" strokeDasharray="1 0" />
      <circle cx={size/2} cy={size/2} r={size/2 - 7} fill="none" stroke={c} strokeWidth="1" />
      <defs><path id={id} d={`M ${size/2} ${size/2} m -${r},0 a ${r},${r} 0 1,1 ${2*r},0 a ${r},${r} 0 1,1 -${2*r},0`} /></defs>
      <text fill={c} style={{ fontFamily: 'var(--font-mono)', fontSize: size * 0.095, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
      <text x={size/2} y={size/2 + size*0.17} textAnchor="middle" fill={c} style={{ fontFamily: 'var(--font-serif)', fontSize: size * 0.5, fontWeight: 700 }}>*</text>
    </svg>
  );
}