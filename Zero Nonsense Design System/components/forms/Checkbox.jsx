import React from 'react';
export function Checkbox({ label, checked, defaultChecked, onChange, disabled, style }) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = e => { if (disabled) return; if (!isControlled) setInternal(!on); onChange && onChange(e); };
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body-size)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, ...style }}>
      <input type="checkbox" checked={on} onChange={toggle} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span aria-hidden="true" style={{
        width: '20px', height: '20px', flex: 'none', borderRadius: '4px',
        border: '2px solid var(--border-strong)', background: on ? 'var(--zn-verification-stamp)' : 'var(--zn-archival-paper)',
        borderColor: on ? 'var(--zn-verification-stamp)' : 'var(--border-strong)',
        display: 'grid', placeItems: 'center', color: 'var(--zn-archival-paper)', fontSize: '15px', fontWeight: 700,
        transition: 'all var(--dur-fast) var(--ease-brand)',
      }}>{on ? '*' : ''}</span>
      {label}
    </label>
  );
}