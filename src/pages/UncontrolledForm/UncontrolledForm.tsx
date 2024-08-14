import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './UncontrolledForm.module.scss';

export default function UncontrolledForm() {
  const countries = useSelector((state: RootState) => state.countries);
  return (
    <div>
      <h4>Uncontrolled Form</h4>
      <form className={styles.formContainer}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" required />
        <label htmlFor="age">Age</label>
        <input type="text" id="age" required />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" required />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" required />
        <label htmlFor="confirm-password">Confirm password</label>
        <input type="text" id="confirm-password" required />
        <fieldset className={styles.gender}>
          <legend>Gender</legend>
          <div>
            <input type="radio" id="male" name="gender" value="male" checked required />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">Female</label>
          </div>
        </fieldset>
        <div className={styles.agreement}>
          <label htmlFor="agreement">Accept Terms and Conditions agreement </label>
          <input type="checkbox" id="agreement" required />
        </div>

        <label htmlFor="avatar">Upload picture</label>
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
        <div className={styles.countriesList}>
          <label htmlFor="country">Country</label>
          <input name="country" id="country" type="text" autoComplete="off" list="country-list" />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} label={country} />
            ))}
          </datalist>
        </div>
      </form>
    </div>
  );
}
