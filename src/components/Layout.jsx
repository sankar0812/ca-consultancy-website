import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import LoadingState from './LoadingState.jsx';

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<LoadingState variant="page" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
