import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import styles from './MainPage.module.scss';
import { FormDataView } from './components/FormDataView';

export default function MainPage() {
  const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledForm);
  const controlledFormData = useSelector((state: RootState) => state.controlledForm);
  return (
    <div className={styles.tilesContainer}>
      <div className={styles.tileContainer}>
        <div className={styles.linkContainer}>
          <Link to="/controlled-form">React hook from</Link>
        </div>
        {controlledFormData.map((formData, index) => (
          <FormDataView key={Math.random()} FormData={formData} isLast={index === controlledFormData.length - 1} />
        ))}
        {controlledFormData.length === 0 && <div>There will be placed data from React hook from</div>}
      </div>
      <div className={styles.tileContainer}>
        <div className={styles.linkContainer}>
          <Link to="/uncontrolled-form">Uncontrolled form</Link>
        </div>
        {uncontrolledFormData.map((formData, index) => (
          <FormDataView key={Math.random()} FormData={formData} isLast={index === uncontrolledFormData.length - 1} />
        ))}
        {uncontrolledFormData.length === 0 && <div>There will be placed data from uncontrolled form</div>}
      </div>
    </div>
  );
}
