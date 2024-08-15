import { UncontrolledFormData } from '../../../models/UncontrolledFormData';
import styles from './UncontrolledFormDataView.module.scss';

interface UncontrolledFormDataViewProps {
  uncontrolledFormData: UncontrolledFormData;
  isLast: boolean;
}

export function UncontrolledFormDataView({ uncontrolledFormData, isLast }: UncontrolledFormDataViewProps) {
  const { name, age, email, password, confirmPassword, agreement, gender, avatar, country } = uncontrolledFormData;
  return (
    <div className={`${styles.formDataContainer} ${isLast && styles.lastFormData}`}>
      <div className={styles.dataContainer}>Name: {name}</div>
      <div className={styles.dataContainer}>Age: {age}</div>
      <div className={styles.dataContainer}>Email: {email}</div>
      <div className={styles.dataContainer}>Password: {password}</div>
      <div className={styles.dataContainer}>Password confirmation: {confirmPassword}</div>
      <div className={styles.dataContainer}>Gender: {gender}</div>
      <div className={styles.dataContainer}>Accept Terms and Conditions agreement: {agreement}</div>
      <div className={styles.photoContainer}>
        Avatar:
        <img src={avatar} alt="avatar" width="50px" />
      </div>

      <div className={styles.dataContainer}>Country: {country}</div>
    </div>
  );
}
