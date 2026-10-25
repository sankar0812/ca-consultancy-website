import Reveal from './Reveal.jsx';
import { process } from '../data/process.js';

export default function ProcessSteps() {
  return (
    <ol className="process">
      {process.map((step, index) => (
        <Reveal as="li" className="process__step" key={step.title} delay={index * 0.08}>
          <span className="process__index" aria-hidden="true">{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
