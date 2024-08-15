import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import styles from './MainPage.module.scss';

export default function MainPage() {
  const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledForm);
  return (
    <div className={styles.tilesContainer}>
      <Link to="/controlled-form">Controlled form with React hook from</Link>
      <Link to="/uncontrolled-form">Uncontrolled form</Link>
    </div>
  );
}
