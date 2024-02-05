import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './styles/callToAction.module.css';

export default function CallToAction() {
  const [showToast, setShowToast] = useState(false);
  const fetcher = useFetcher();

  const email = fetcher.data || 'johnsmith@example.com';

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  }, [showToast]);

  return (
    <section className={css.cta}>
      <h3 className={css.ctaHeading}>Upgrade your style</h3>
      <p>
        Get <strong>15% off</strong> your next order&nbsp;by <br />
        subscribing to our newsletter!
      </p>
      <fetcher.Form
        aria-label="Subscribe to our Newsletter"
        className={css.subscribe}
        method="post"
        onSubmit={() => {
          setShowToast(true);
        }}
      >
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          autoComplete="email"
          aria-label="email"
        />
        <button className={css.btn} type="submit">
          Subscribe
        </button>
      </fetcher.Form>
      {showToast && (
        <Toast
          email={email}
          onClick={() => {
            setShowToast(false);
          }}
        />
      )}
    </section>
  );
}

function Toast({ email, onClick }) {
  return (
    <div className={css.toast} role="alert" aria-label="Subscribe Successful">
      <p>
        Thanks for subscribing, <span className={css.toastEmail}>{email}</span>!
      </p>
      <button
        type="button"
        aria-label="Close Toast"
        className={css.closeToastBtn}
        onClick={onClick}
      >
        ×
      </button>
    </div>
  );
}

Toast.propTypes = {
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
