import { forwardRef, useId } from 'react';

/**
 * Accessible field wrapper. `as` can be "input" | "textarea" | "select".
 * Pass react-hook-form's register() result as props.
 */
const FormInput = forwardRef(function FormInput(
  { label, name, error, hint, required = false, as = 'input', children, ...rest },
  ref
) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const Tag = as;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {required ? (
          <span className="field__flag" aria-hidden="true"> *</span>
        ) : (
          <span className="field__flag field__flag--optional"> (optional)</span>
        )}
      </label>
      <Tag
        id={id}
        name={name}
        ref={ref}
        className={`field__control field__control--${as}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        {...rest}
      >
        {children}
      </Tag>
      {hint && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default FormInput;
