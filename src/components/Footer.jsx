import HomeLink from './ui/HomeLink';

export default function Footer() {
  return (
    <footer>
      <div className="flex-container">
        <HomeLink />
        <FakeLinks />
      </div>
      <div className="copyright">
        <a
          href="https://github.com/marlatte"
          target="_blank"
          rel="noreferrer"
          aria-label="Marlatte's Github"
        >
          <p>Walker</p>
          <i className="fa fa-github" aria-hidden />
          <p>Marlatt</p>
        </a>
      </div>
    </footer>
  );
}

function FakeLinks() {
  return (
    <div>
      {[
        'Connect',
        'Twitter',
        'Facebook',
        'Instagram',
        'YouTube',
        'Resources',
        'Return Policy',
        'FAQS',
        'Privacy Policy',
        'Customer Support',
        'About',
        'Our Story',
        'Press',
        'Careers',
      ].map((text) => (
        <div key={text} className="fake-link" data-testid="fake-link">
          {text}
        </div>
      ))}
    </div>
  );
}
