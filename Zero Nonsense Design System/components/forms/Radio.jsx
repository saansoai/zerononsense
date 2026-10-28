import React from 'react';
export function Radio({ label, name, value, checked, defaultChecked, onChange, disabled, style }) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body-size)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, ...style }}>
      <input type="radio" name={name} value={value} checked={isControlled ? checked : undefined} defaultChecked={defaultChecked} disabled={disabled}
        onChange={e => { if (!isControlled) setInternal(e.target.checked); onChange && onChange(e); }}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span aria-hidden="true" style={{ width: '20px', height: '20px', flex: 'none', borderRadius: '50%', border: '2px solid var(--border-strong)', display: 'grid', placeItems: 'center', background: 'var(--zn-archival-paper)' }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--zn-verification-stamp)', transform: on ? 'scale(1)' : 'scale(0)', transition: 'transform var(--dur-fast) var(--ease-brand)' }} />
      </span>
      {label}
    </label>
  );
}