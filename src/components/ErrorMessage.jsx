import { AlertTriangle } from 'lucide-react';

export default function ErrorMessage({ title = 'Something went wrong', children }) {
  return (
    <div className="feedback feedback--error" role="alert">
      <AlertTriangle size={24} aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}
