import React from 'react';
const base = {
  fontFamily: 'var(--font-mono)', fontWeight: 'var(--weight-cta)', letterSpacing: 'var(--kerning-cta)',
  fontSize: 'var(--text-cta)', textTransform: 'uppercase', cursor: 'pointer',
  border: '2px solid transparent', borderRadius: 'var(--radius-pill)',
  padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px',
  transition: 'all var(--dur-fast) var(--ease-brand)', lineHeight: 1,
};
const variants = {
  primary: { background: 'var(--zn-verification-stamp)', color: 'var(--text-on-red)' },
  secondary: { background: 'var(--zn-blueprint-ink)', color: 'var(--text-on-blue)' },
  outline: { background: 'transparent', color: 'var(--text-body)', borderColor: 'var(--border-strong)' },
  ghost: { background: 'transparent', color: 'var(--text-body)' },
  glass: { background: 'var(--glass-bg)', color: 'var(--zn-archival-paper)', borderColor: 'var(--glass-border)', backdropFilter: 'blur(var(--glass-blur))', WebkitBackdropFilter: 'blur(var(--glass-blur))' },
};
const sizes = { sm: { padding: '8px 16px', fontSize: '12px' }, md: {}, lg: { padding: '16px 32px', fontSize: '15px' } };
export function Button({ variant = 'primary', size = 'md', disabled, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverFx = hover && !disabled ? (
    variant === 'primary' ? { background: 'var(--zn-red-deep)' } :
    variant === 'secondary' ? { background: 'var(--zn-blue-deep)' } :
    variant === 'glass' ? { background: 'var(--glass-bg-strong)', color: 'var(--zn-ink-black)' } :
    { background: 'rgba(30,28,24,0.08)' }
  ) : null;
  return (
    <button {...rest} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...sizes[size], ...hoverFx,
        transform: press && !disabled ? 'translateY(2px)' : 'none',
        opacity: disabled ? 0.45 : 1, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>
      {children}
    </button>
  );
}