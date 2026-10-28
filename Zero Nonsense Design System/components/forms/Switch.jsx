import React from 'react';
export function Switch({ label, checked, defaultChecked, onChange, disabled, style }) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = e => { if (disabled) return; if (!isControlled) setInternal(!on); onChange && onChange(e); };
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body-size)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, ...style }}>
      <input type="checkbox" role="switch" checked={on} onChange={toggle} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span aria-hidden="true" style={{
        width: '44px', height: '24px', flex: 'none', borderRadius: 'var(--radius-pill)',
        border: '2px solid var(--border-strong)', background: on ? 'var(--zn-blueprint-ink)' : 'var(--zn-paper-shade)',
        borderColor: on ? 'var(--zn-blueprint-ink)' : 'var(--border-strong)',
        position: 'relative', transition: 'all var(--dur-fast) var(--ease-brand)',
      }}>
        <span style={{ position: 'absolute', top: '2px', left: on ? '22px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--zn-archival-paper)', border: on ? 'none' : '2px solid var(--border-strong)', boxSizing: 'border-box', transition: 'left var(--dur-fast) var(--ease-brand)' }} />
      </span>
      {label}
    </label>
  );
}