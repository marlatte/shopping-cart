import PropTypes from 'prop-types';
import shirtsUrl from '../../assets/shirts-on-hanger.jpg';
import modelUrl from '../../assets/model-in-field.jpg';

export default function Articles() {
  return (
    <section className="articles">
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
    <div className="entry">
      <div className="fake-link">
        <img src={imgUrl} alt={imgAlt} />
      </div>
      <div className="fake-link">
        <h2>{title}</h2>
      </div>
    </div>
  );
}

Entry.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
