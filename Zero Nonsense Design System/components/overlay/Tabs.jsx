import React from 'react';
export function Tabs({ items = [], value, defaultValue, onChange, glass, style }) {
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].value));
  const active = value !== undefined ? value : internal;
  const pick = v => { if (value === undefined) setInternal(v); onChange && onChange(v); };
  return (
    <div role="tablist" style={{ display: 'flex', gap: '4px', padding: '4px', borderRadius: 'var(--radius-pill)', width: 'fit-content',
      border: glass ? '1px solid var(--glass-border)' : '2px solid var(--border-strong)',
      background: glass ? 'var(--glass-bg)' : 'var(--zn-archival-paper)',
      backdropFilter: glass ? 'blur(var(--glass-blur))' : 'none', WebkitBackdropFilter: glass ? 'blur(var(--glass-blur))' : 'none', ...style }}>
      {items.map(it => {
        const on = it.value === active;
        return (
          <button key={it.value} role="tab" aria-selected={on} onClick={() => pick(it.value)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '8px 18px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer',
            background: on ? 'var(--zn-verification-stamp)' : 'transparent',
            color: on ? 'var(--text-on-red)' : glass ? 'var(--zn-archival-paper)' : 'var(--text-body)',
            transition: 'all var(--dur-fast) var(--ease-brand)' }}>
            {it.label}
          </button>
        );
      })}
    </div>
  );
}