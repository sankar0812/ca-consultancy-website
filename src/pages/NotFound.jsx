import PageTransition from '../components/PageTransition.jsx';
import Button from '../components/Button.jsx';
import useSeo from '../hooks/useSeo.js';

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'The page you were looking for could not be found.' });

  return (
    <PageTransition>
      <section className="section not-found">
        <div className="container not-found__inner">
          <h1>We could not find that page.</h1>
          <p>The link may be out of date, or the page may have moved. Try one of these instead.</p>
          <div className="not-found__actions">
            <Button to="/" variant="navy">Go to the home page</Button>
            <Button to="/contact#enquiry" variant="outline">Contact us</Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
