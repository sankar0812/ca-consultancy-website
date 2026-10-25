import Button from './Button.jsx';
import Reveal from './Reveal.jsx';

/** actions: [{ label, to?, href?, variant? }] */
export default function CTASection({ title, text, actions }) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <Reveal className="container cta__inner">
        <div>
          <h2 id="cta-title">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta__actions">
          {actions.map((action) => (
            <Button key={action.label} to={action.to} href={action.href} variant={action.variant || 'gold'}>
              {action.label}
            </Button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
