import React from 'react';
export function Select({ label, options = [], glass, style, id, ...rest }) {
  const uid = React.useId();
  const selectId = id || uid;
  return (
    <label htmlFor={selectId} style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', ...style }}>
      {label && <span style={{ fontSize: '12px', letterSpacing: 'var(--kerning-sub)', textTransform: 'uppercase', color: glass ? 'var(--zn-archival-paper)' : 'var(--text-body)' }}>{label}</span>}
      <div style={{ position: 'relative' }}>
        <select id={selectId} {...rest} style={{
          appearance: 'none', WebkitAppearance: 'none', width: '100%',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body-size)',
          padding: '12px 40px 12px 14px', borderRadius: 'var(--radius-sm)',
          border: `2px solid ${glass ? 'var(--glass-border)' : 'var(--border-strong)'}`,
          background: glass ? 'var(--glass-bg)' : 'var(--zn-archival-paper)',
          color: glass ? 'var(--zn-archival-paper)' : 'var(--text-body)',
          backdropFilter: glass ? 'blur(var(--glass-blur))' : 'none', cursor: 'pointer',
        }}>
          {options.map(o => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span aria-hidden="true" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-58%)', pointerEvents: 'none', color: glass ? 'var(--zn-archival-paper)' : 'var(--zn-verification-stamp)', fontSize: '14px' }}>▾</span>
      </div>
    </label>
  );
}