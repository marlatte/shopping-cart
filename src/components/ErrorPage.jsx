import { useRouteError } from 'react-router-dom';
import css from './styles/errorPage.module.css';
import HomeLink from './ui/HomeLink';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className={css.errorPage}>
      <header>
        <HomeLink />
      </header>
      <div className={css.errorContainer}>
        <h1>Oh no!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <footer>
        <a
          href="https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol"
          target="_blank"
          rel="noopener noreferrer"
        >
          {error.status === 418 ? 'Finally!' : 'Not a teapot.'}
        </a>
      </footer>
    </main>
  );
}
