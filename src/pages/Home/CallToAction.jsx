import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CallToAction() {
  const [showToast, setShowToast] = useState(false);
  const fetcher = useFetcher();

  const email = fetcher.data || 'johnsmith@example.com';

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [showToast]);

  return (
    <section className="cta">
      <h3>Upgrade your style</h3>
      <p>Get 15% off your next order by subscribing to our newsletter!</p>
      <fetcher.Form
        aria-label="Subscribe to our Newsletter"
        method="post"
        onSubmit={() => {
          setShowToast(true);
        }}
      >
        <label>
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email..."
          />
        </label>
        <button type="submit">Subscribe</button>
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
    <div className="toast" role="alert" aria-label="Subscribe Successful">
      <p>Thanks for subscribing, {email}!</p>
      <button
        type="button"
        aria-label="Close Toast"
        className="close-toast-btn"
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
