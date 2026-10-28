import React from 'react';
export function Input({ label, annotation, invalid, glass, style, id, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const uid = React.useId();
  const inputId = id || uid;
  return (
    <label htmlFor={inputId} style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', ...style }}>
      {label && <span style={{ fontSize: '12px', letterSpacing: 'var(--kerning-sub)', textTransform: 'uppercase', color: glass ? 'var(--zn-archival-paper)' : 'var(--text-body)' }}>{label}</span>}
      <input id={inputId} {...rest}
        onFocus={e => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={e => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
        style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body-size)', lineHeight: 'var(--leading-body)',
          padding: '12px 14px', borderRadius: 'var(--radius-sm)', outline: 'none',
          border: `2px solid ${invalid ? 'var(--zn-verification-stamp)' : focus ? 'var(--focus-ring)' : glass ? 'var(--glass-border)' : 'var(--border-strong)'}`,
          background: glass ? 'var(--glass-bg)' : 'var(--zn-archival-paper)',
          color: glass ? 'var(--zn-archival-paper)' : 'var(--text-body)',
          backdropFilter: glass ? 'blur(var(--glass-blur))' : 'none',
          transition: 'border-color var(--dur-fast) var(--ease-brand)',
        }} />
      {annotation && <span style={{ fontSize: 'var(--text-annotation)', color: invalid ? 'var(--zn-verification-stamp)' : glass ? 'rgba(243,241,228,0.8)' : 'rgba(30,28,24,0.6)' }}>{annotation}</span>}
    </label>
  );
}