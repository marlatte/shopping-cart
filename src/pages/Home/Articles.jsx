import PropTypes from 'prop-types';
import shirtsUrl from '../../assets/shirts-on-hanger.jpg';
import modelUrl from '../../assets/model-in-field.jpg';
import css from './styles/home.module.css';

export default function Articles() {
  return (
    <section className={css.articles}>
      <Entry
        imgUrl={shirtsUrl}
        imgAlt="Shirts on a hanger"
        title="What are the best ways to keep your clothing looking new?"
      />
      <Entry
        imgUrl={modelUrl}
        imgAlt="A stylish model in a field"
        title="Wondering how to dress stylishly? We've got you."
      />
    </section>
  );
}

function Entry({ imgUrl, imgAlt, title }) {
  return (
    <div className={css.entry}>
      <img src={imgUrl} alt={imgAlt} title="Not a real link" />
      <h3 className={css.articleTitle} title="Not a real link">
        {title}
      </h3>
    </div>
  );
}

Entry.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
