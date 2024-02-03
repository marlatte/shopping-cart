import HomeLink from './ui/HomeLink';
import styles from './styles/footer.module.css';

export default function Footer() {
  return (
    <footer>
      <div className={styles.flexContainer}>
        <div className={styles.linkContainer}>
          <HomeLink />
        </div>
        <FakeLinks />
      </div>
      <div className={styles.copyright}>
        <a
          href="https://github.com/marlatte"
          target="_blank"
          rel="noreferrer"
          aria-label="Marlatte's Github"
          className={styles.copyrightLink}
        >
          <p>Walker</p>
          <i className={`${styles.githubIcon} fa fa-github`} aria-hidden />
          <p>Marlatt</p>
        </a>
      </div>
    </footer>
  );
}

function FakeLinks() {
  return (
    <div className={styles.fakeLinks}>
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
        <div
          key={text}
          className={styles.fakeLink}
          data-testid="fake-link"
          title="Not really a link."
        >
          {text}
        </div>
      ))}
    </div>
  );
}
