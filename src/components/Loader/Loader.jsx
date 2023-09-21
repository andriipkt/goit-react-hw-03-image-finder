import { Rings } from 'react-loader-spinner';
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.loader}>
      <Rings color="#3f51b5" />
    </div>
  );
}

export default Loader;
