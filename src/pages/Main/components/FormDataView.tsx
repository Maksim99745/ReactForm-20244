import { FormDataAvatarBase64 } from '../../../models/FormDataAvatarBase64';
import styles from './FormDataView.module.scss';

interface FormDataViewProps {
  FormData: FormDataAvatarBase64;
  isLast: boolean;
}

export function FormDataView({ FormData, isLast }: FormDataViewProps) {
  const { name, age, email, password, confirmPassword, agreement, gender, avatar, country } = FormData;
  return (
    <div className={`${styles.formDataContainer} ${isLast && styles.lastFormData}`}>
      <div className={styles.dataContainer}>Name: {name}</div>
      <div className={styles.dataContainer}>Age: {age}</div>
      <div className={styles.dataContainer}>Email: {email}</div>
      <div className={styles.dataContainer}>Password: {password}</div>
      <div className={styles.dataContainer}>Password confirmation: {confirmPassword}</div>
      <div className={styles.dataContainer}>Gender: {gender}</div>
      <div className={styles.dataContainer}>Accept Terms and Conditions agreement: {agreement && 'yes'}</div>
      <div className={styles.photoContainer}>
        Avatar:
        <img src={avatar} alt="avatar" width="50px" />
      </div>

      <div className={styles.dataContainer}>Country: {country}</div>
    </div>
  );
}
