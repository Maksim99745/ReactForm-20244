import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import styles from './MainPage.module.scss';
import { UncontrolledFormDataView } from './components/UncontrolledFormDataView';

export default function MainPage() {
  const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledForm);
  return (
    <div className={styles.tilesContainer}>
      <div className={styles.tileContainer}>
        <div className={styles.linkContainer}>
          <Link to="/controlled-form">React hook from</Link>
        </div>
      </div>
      <div className={styles.tileContainer}>
        <div className={styles.linkContainer}>
          <Link to="/uncontrolled-form">Uncontrolled form</Link>
        </div>
        {uncontrolledFormData.map((formData, index) => (
          <UncontrolledFormDataView
            key={formData.name}
            uncontrolledFormData={formData}
            isLast={index === uncontrolledFormData.length - 1}
          />
        ))}
        {uncontrolledFormData.length === 0 && <div>There will be placed your data</div>}
      </div>
    </div>
  );
}
