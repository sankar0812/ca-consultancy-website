import { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessMessage({ title, children, action }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="feedback feedback--success" role="status" tabIndex={-1} ref={ref}>
      <CheckCircle2 size={28} aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
        {action}
      </div>
    </div>
  );
}
