import { useRouteError } from 'react-router-dom';
import css from './styles/childError.module.css';

export default function MainError() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className={css.errorPage}>
      <h1>Oh no!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </main>
  );
}
