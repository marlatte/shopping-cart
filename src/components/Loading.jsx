import PropTypes from 'prop-types';
import { ThreeCircles } from 'react-loader-spinner';
import css from './styles/loading.module.css';

export default function Loading({ small }) {
  return (
    <div className={small ? css.loading : css.loadingTall}>
      <ThreeCircles color="black" />
    </div>
  );
}

Loading.defaultProps = {
  small: false,
};

Loading.propTypes = {
  small: PropTypes.bool,
};
