import HomeLink from './ui/HomeLink';
import css from './styles/footer.module.css';

export default function Footer() {
  return (
    <footer>
      <div className={css.flexContainer}>
        <div className={css.linkContainer}>
          <HomeLink />
        </div>
        <FakeLinks />
      </div>
      <div className={css.copyright}>
        <a
          href="https://github.com/marlatte"
          target="_blank"
          rel="noreferrer"
          aria-label="Marlatte's Github"
          className={css.copyrightLink}
        >
          <p>Walker</p>
          <i className={`${css.githubIcon} fa fa-github`} aria-hidden />
          <p>Marlatt</p>
        </a>
      </div>
    </footer>
  );
}

function FakeLinks() {
  return (
    <div className={css.fakeLinks}>
      {[
        ['Connect', 'Twitter', 'Facebook', 'Instagram', 'YouTube'],
        [
          'Resources',
          'Return Policy',
          'FAQS',
          'Privacy Policy',
          'Customer Support',
        ],
        ['About', 'Our Story', 'Press', 'Careers'],
      ].map((column) => (
        <div key={`${column[0]} column`} className={css.fakeLinkColumn}>
          {column.map((text) => (
            <div
              key={text}
              className={css.fakeLink}
              data-testid="fake-link"
              title="Not really a link."
            >
              {text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
