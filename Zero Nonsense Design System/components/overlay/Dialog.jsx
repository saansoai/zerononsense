import React from 'react';
export function Dialog({ open, onClose, title, children, footer, glass }) {
  React.useEffect(() => {
    const fn = e => { if (e.key === 'Escape' && onClose) onClose(); };
    if (open) window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'grid', placeItems: 'center', background: 'rgba(31,52,84,0.4)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
      <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} style={{
        width: 'min(480px, calc(100vw - 48px))', maxHeight: '80vh', overflow: 'auto',
        background: glass ? 'var(--glass-bg-strong)' : 'var(--zn-archival-paper)',
        backdropFilter: glass ? 'blur(var(--glass-blur-strong))' : 'none', WebkitBackdropFilter: glass ? 'blur(var(--glass-blur-strong))' : 'none',
        border: glass ? '1px solid var(--glass-border)' : '2px solid var(--border-strong)',
        borderRadius: glass ? 'var(--radius-lg)' : 'var(--radius-sm)', boxShadow: 'var(--shadow-glass)', padding: 'var(--space-6)', color: 'var(--text-body)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '12px' }}>
          {title && <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '24px', lineHeight: 'var(--leading-heading)', letterSpacing: 'var(--kerning-heading)' }}>{title}</h2>}
          <button onClick={onClose} aria-label="Close" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--zn-verification-stamp)', lineHeight: 1 }}>*</button>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body-size)', lineHeight: 'var(--leading-body)' }}>{children}</div>
        {footer && <div style={{ marginTop: 'var(--space-5)', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>{footer}</div>}
      </div>
    </div>
  );
}