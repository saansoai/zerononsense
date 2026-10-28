/* @ds-bundle: {"format":4,"namespace":"ZeroNonsenseDesignSystem_e3dd65","components":[{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"RubberStamp","sourcePath":"components/display/RubberStamp.jsx"},{"name":"StampFrame","sourcePath":"components/display/StampFrame.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"},{"name":"Tabs","sourcePath":"components/overlay/Tabs.jsx"},{"name":"Toast","sourcePath":"components/overlay/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/overlay/Tooltip.jsx"}],"sourceHashes":{"components/display/Badge.jsx":"7dd50193082c","components/display/Card.jsx":"6d8b9e2a66da","components/display/RubberStamp.jsx":"c91d6cd23d7c","components/display/StampFrame.jsx":"9b80da064eca","components/display/Tag.jsx":"6b9668732e0f","components/forms/Button.jsx":"25c3c894ab87","components/forms/Checkbox.jsx":"486867b3c218","components/forms/Input.jsx":"b751f90ff847","components/forms/Radio.jsx":"bda6d60e773b","components/forms/Select.jsx":"7180eb7b27db","components/forms/Switch.jsx":"7ea2617e4b2e","components/overlay/Dialog.jsx":"a91163d4e2e0","components/overlay/Tabs.jsx":"d6fbfc548f90","components/overlay/Toast.jsx":"7d27d90ea07e","components/overlay/Tooltip.jsx":"ed21953b0d66"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ZeroNonsenseDesignSystem_e3dd65 = window.ZeroNonsenseDesignSystem_e3dd65 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/display/Badge.jsx
try { (() => {
function Badge({
  color = 'red',
  children,
  style
}) {
  const colors = {
    red: {
      background: 'var(--zn-verification-stamp)',
      color: 'var(--text-on-red)'
    },
    blue: {
      background: 'var(--zn-blueprint-ink)',
      color: 'var(--text-on-blue)'
    },
    ink: {
      background: 'var(--zn-ink-black)',
      color: 'var(--zn-archival-paper)'
    },
    paper: {
      background: 'var(--zn-archival-paper)',
      color: 'var(--text-body)',
      border: '1.5px solid var(--border-strong)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      fontWeight: 500,
      letterSpacing: 'var(--kerning-sub)',
      textTransform: 'uppercase',
      padding: '4px 10px',
      borderRadius: '3px',
      ...colors[color],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  variant = 'paper',
  dashed,
  children,
  style,
  ...rest
}) {
  const variants = {
    paper: {
      background: 'var(--zn-archival-paper)',
      border: dashed ? 'var(--border-dashed) var(--zn-verification-stamp)' : '2px solid var(--border-strong)',
      color: 'var(--text-body)',
      borderRadius: 'var(--radius-sm)'
    },
    blue: {
      background: 'var(--zn-blueprint-ink)',
      color: 'var(--text-on-blue)',
      borderRadius: 'var(--radius-sm)',
      border: 'none'
    },
    red: {
      background: 'var(--zn-verification-stamp)',
      color: 'var(--text-on-red)',
      borderRadius: 'var(--radius-sm)',
      border: 'none'
    },
    glass: {
      background: 'var(--glass-bg)',
      color: 'var(--zn-archival-paper)',
      border: '1px solid var(--glass-border)',
      borderRadius: 'var(--radius-lg)',
      backdropFilter: 'blur(var(--glass-blur))',
      WebkitBackdropFilter: 'blur(var(--glass-blur))',
      boxShadow: 'var(--shadow-glass)'
    },
    glassStrong: {
      background: 'var(--glass-bg-strong)',
      color: 'var(--zn-ink-black)',
      border: '1px solid var(--glass-border)',
      borderRadius: 'var(--radius-lg)',
      backdropFilter: 'blur(var(--glass-blur-strong))',
      WebkitBackdropFilter: 'blur(var(--glass-blur-strong))',
      boxShadow: 'var(--shadow-glass)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      padding: 'var(--space-5)',
      fontFamily: 'var(--font-mono)',
      ...variants[variant],
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/RubberStamp.jsx
try { (() => {
/* Circular rubber stamp: text on a circle around the brand asterisk, rotated like a hand stamp. */
function RubberStamp({
  text = '100% Ingredient Transparency • ',
  size = 120,
  color = 'red',
  rotate = -12,
  style
}) {
  const c = {
    red: 'var(--zn-verification-stamp)',
    blue: 'var(--zn-blueprint-ink)',
    paper: 'var(--zn-archival-paper)',
    ink: 'var(--zn-ink-black)'
  }[color];
  const r = size / 2 - 12;
  const id = React.useId().replace(/:/g, '');
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      transform: `rotate(${rotate}deg)`,
      ...style
    },
    role: "img",
    "aria-label": text
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: size / 2 - 2,
    fill: "none",
    stroke: c,
    strokeWidth: "2.5",
    strokeDasharray: "1 0"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: size / 2 - 7,
    fill: "none",
    stroke: c,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("path", {
    id: id,
    d: `M ${size / 2} ${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 -${2 * r},0`
  })), /*#__PURE__*/React.createElement("text", {
    fill: c,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: size * 0.095,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("textPath", {
    href: `#${id}`
  }, text)), /*#__PURE__*/React.createElement("text", {
    x: size / 2,
    y: size / 2 + size * 0.17,
    textAnchor: "middle",
    fill: c,
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: size * 0.5,
      fontWeight: 700
    }
  }, "*"));
}
Object.assign(__ds_scope, { RubberStamp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/RubberStamp.jsx", error: String((e && e.message) || e) }); }

// components/display/StampFrame.jsx
try { (() => {
/* Postage-stamp scalloped frame, built with a radial-gradient mask like the ZN* secondary logo. */
function StampFrame({
  color = 'blue',
  inset = 12,
  children,
  style
}) {
  const bg = {
    blue: 'var(--zn-blueprint-ink)',
    red: 'var(--zn-verification-stamp)',
    paper: 'var(--zn-archival-paper)',
    ink: 'var(--zn-ink-black)'
  }[color];
  const mask = 'radial-gradient(circle 7px at 7px 7px, transparent 6.5px, #000 7px) -7px -7px / 21px 21px';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      padding: inset + 8,
      WebkitMask: mask,
      mask,
      display: 'inline-block',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: color === 'paper' ? 'none' : 'none',
      background: color === 'paper' ? 'var(--zn-archival-paper)' : 'transparent',
      padding: inset,
      display: 'grid',
      placeItems: 'center'
    }
  }, children));
}
Object.assign(__ds_scope, { StampFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StampFrame.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function Tag({
  selected,
  onClick,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      padding: '6px 14px',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      border: '1.5px solid var(--border-strong)',
      background: selected ? 'var(--zn-ink-black)' : hover ? 'rgba(30,28,24,0.08)' : 'transparent',
      color: selected ? 'var(--zn-archival-paper)' : 'var(--text-body)',
      transition: 'all var(--dur-fast) var(--ease-brand)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: 'var(--font-mono)',
  fontWeight: 'var(--weight-cta)',
  letterSpacing: 'var(--kerning-cta)',
  fontSize: 'var(--text-cta)',
  textTransform: 'uppercase',
  cursor: 'pointer',
  border: '2px solid transparent',
  borderRadius: 'var(--radius-pill)',
  padding: '12px 24px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all var(--dur-fast) var(--ease-brand)',
  lineHeight: 1
};
const variants = {
  primary: {
    background: 'var(--zn-verification-stamp)',
    color: 'var(--text-on-red)'
  },
  secondary: {
    background: 'var(--zn-blueprint-ink)',
    color: 'var(--text-on-blue)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-body)',
    borderColor: 'var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-body)'
  },
  glass: {
    background: 'var(--glass-bg)',
    color: 'var(--zn-archival-paper)',
    borderColor: 'var(--glass-border)',
    backdropFilter: 'blur(var(--glass-blur))',
    WebkitBackdropFilter: 'blur(var(--glass-blur))'
  }
};
const sizes = {
  sm: {
    padding: '8px 16px',
    fontSize: '12px'
  },
  md: {},
  lg: {
    padding: '16px 32px',
    fontSize: '15px'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverFx = hover && !disabled ? variant === 'primary' ? {
    background: 'var(--zn-red-deep)'
  } : variant === 'secondary' ? {
    background: 'var(--zn-blue-deep)'
  } : variant === 'glass' ? {
    background: 'var(--glass-bg-strong)',
    color: 'var(--zn-ink-black)'
  } : {
    background: 'rgba(30,28,24,0.08)'
  } : null;
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...variants[variant],
      ...sizes[size],
      ...hoverFx,
      transform: press && !disabled ? 'translateY(2px)' : 'none',
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-body-size)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: on,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '20px',
      height: '20px',
      flex: 'none',
      borderRadius: '4px',
      border: '2px solid var(--border-strong)',
      background: on ? 'var(--zn-verification-stamp)' : 'var(--zn-archival-paper)',
      borderColor: on ? 'var(--zn-verification-stamp)' : 'var(--border-strong)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--zn-archival-paper)',
      fontSize: '15px',
      fontWeight: 700,
      transition: 'all var(--dur-fast) var(--ease-brand)'
    }
  }, on ? '*' : ''), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  annotation,
  invalid,
  glass,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = React.useId();
  const inputId = id || uid;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      letterSpacing: 'var(--kerning-sub)',
      textTransform: 'uppercase',
      color: glass ? 'var(--zn-archival-paper)' : 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId
  }, rest, {
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-body-size)',
      lineHeight: 'var(--leading-body)',
      padding: '12px 14px',
      borderRadius: 'var(--radius-sm)',
      outline: 'none',
      border: `2px solid ${invalid ? 'var(--zn-verification-stamp)' : focus ? 'var(--focus-ring)' : glass ? 'var(--glass-border)' : 'var(--border-strong)'}`,
      background: glass ? 'var(--glass-bg)' : 'var(--zn-archival-paper)',
      color: glass ? 'var(--zn-archival-paper)' : 'var(--text-body)',
      backdropFilter: glass ? 'blur(var(--glass-blur))' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-brand)'
    }
  })), annotation && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-annotation)',
      color: invalid ? 'var(--zn-verification-stamp)' : glass ? 'rgba(243,241,228,0.8)' : 'rgba(30,28,24,0.6)'
    }
  }, annotation));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-body-size)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: isControlled ? checked : undefined,
    defaultChecked: defaultChecked,
    disabled: disabled,
    onChange: e => {
      if (!isControlled) setInternal(e.target.checked);
      onChange && onChange(e);
    },
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '20px',
      height: '20px',
      flex: 'none',
      borderRadius: '50%',
      border: '2px solid var(--border-strong)',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--zn-archival-paper)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: 'var(--zn-verification-stamp)',
      transform: on ? 'scale(1)' : 'scale(0)',
      transition: 'transform var(--dur-fast) var(--ease-brand)'
    }
  })), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  glass,
  style,
  id,
  ...rest
}) {
  const uid = React.useId();
  const selectId = id || uid;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-mono)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      letterSpacing: 'var(--kerning-sub)',
      textTransform: 'uppercase',
      color: glass ? 'var(--zn-archival-paper)' : 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selectId
  }, rest, {
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-body-size)',
      padding: '12px 40px 12px 14px',
      borderRadius: 'var(--radius-sm)',
      border: `2px solid ${glass ? 'var(--glass-border)' : 'var(--border-strong)'}`,
      background: glass ? 'var(--glass-bg)' : 'var(--zn-archival-paper)',
      color: glass ? 'var(--zn-archival-paper)' : 'var(--text-body)',
      backdropFilter: glass ? 'blur(var(--glass-blur))' : 'none',
      cursor: 'pointer'
    }
  }), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-58%)',
      pointerEvents: 'none',
      color: glass ? 'var(--zn-archival-paper)' : 'var(--zn-verification-stamp)',
      fontSize: '14px'
    }
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-body-size)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: on,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '44px',
      height: '24px',
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      border: '2px solid var(--border-strong)',
      background: on ? 'var(--zn-blueprint-ink)' : 'var(--zn-paper-shade)',
      borderColor: on ? 'var(--zn-blueprint-ink)' : 'var(--border-strong)',
      position: 'relative',
      transition: 'all var(--dur-fast) var(--ease-brand)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '2px',
      left: on ? '22px' : '2px',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: 'var(--zn-archival-paper)',
      border: on ? 'none' : '2px solid var(--border-strong)',
      boxSizing: 'border-box',
      transition: 'left var(--dur-fast) var(--ease-brand)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  glass
}) {
  React.useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    if (open) window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'grid',
      placeItems: 'center',
      background: 'rgba(31,52,84,0.4)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(480px, calc(100vw - 48px))',
      maxHeight: '80vh',
      overflow: 'auto',
      background: glass ? 'var(--glass-bg-strong)' : 'var(--zn-archival-paper)',
      backdropFilter: glass ? 'blur(var(--glass-blur-strong))' : 'none',
      WebkitBackdropFilter: glass ? 'blur(var(--glass-blur-strong))' : 'none',
      border: glass ? '1px solid var(--glass-border)' : '2px solid var(--border-strong)',
      borderRadius: glass ? 'var(--radius-lg)' : 'var(--radius-sm)',
      boxShadow: 'var(--shadow-glass)',
      padding: 'var(--space-6)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '16px',
      marginBottom: '12px'
    }
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: 'var(--leading-heading)',
      letterSpacing: 'var(--kerning-heading)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: 'var(--font-serif)',
      fontSize: '22px',
      color: 'var(--zn-verification-stamp)',
      lineHeight: 1
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-body-size)',
      lineHeight: 'var(--leading-body)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  glass,
  style
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].value));
  const active = value !== undefined ? value : internal;
  const pick = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: '4px',
      padding: '4px',
      borderRadius: 'var(--radius-pill)',
      width: 'fit-content',
      border: glass ? '1px solid var(--glass-border)' : '2px solid var(--border-strong)',
      background: glass ? 'var(--glass-bg)' : 'var(--zn-archival-paper)',
      backdropFilter: glass ? 'blur(var(--glass-blur))' : 'none',
      WebkitBackdropFilter: glass ? 'blur(var(--glass-blur))' : 'none',
      ...style
    }
  }, items.map(it => {
    const on = it.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(it.value),
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '8px 18px',
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        cursor: 'pointer',
        background: on ? 'var(--zn-verification-stamp)' : 'transparent',
        color: on ? 'var(--text-on-red)' : glass ? 'var(--zn-archival-paper)' : 'var(--text-body)',
        transition: 'all var(--dur-fast) var(--ease-brand)'
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Toast.jsx
try { (() => {
function Toast({
  open = true,
  tone = 'ink',
  children,
  onDismiss,
  style
}) {
  if (!open) return null;
  const tones = {
    ink: {
      background: 'var(--zn-ink-black)',
      color: 'var(--zn-archival-paper)'
    },
    red: {
      background: 'var(--zn-verification-stamp)',
      color: 'var(--text-on-red)'
    },
    blue: {
      background: 'var(--zn-blueprint-ink)',
      color: 'var(--text-on-blue)'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-glass)',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      lineHeight: 'var(--leading-body)',
      ...tones[tone],
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: 1
    }
  }, "*"), /*#__PURE__*/React.createElement("span", null, children), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'inherit',
      cursor: 'pointer',
      fontSize: '14px',
      opacity: 0.7,
      padding: 0
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Toast.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children,
  side = 'top'
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%,-8px)'
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translate(-50%,8px)'
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translate(8px,-50%)'
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translate(-8px,-50%)'
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-block'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 100,
      whiteSpace: 'nowrap',
      ...pos,
      background: 'var(--zn-ink-black)',
      color: 'var(--zn-archival-paper)',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      letterSpacing: '0.04em',
      padding: '6px 10px',
      borderRadius: '4px',
      pointerEvents: 'none'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Tooltip.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.RubberStamp = __ds_scope.RubberStamp;

__ds_ns.StampFrame = __ds_scope.StampFrame;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
