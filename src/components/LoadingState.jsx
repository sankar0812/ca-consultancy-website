export default function LoadingState({ variant = 'page', label = 'Loading' }) {
  return (
    <div className={`loading loading--${variant}`} role="status" aria-live="polite">
      <span className="loading__spinner" aria-hidden="true" />
      <span className={variant === 'page' ? 'visually-hidden' : 'loading__label'}>{label}</span>
    </div>
  );
}
