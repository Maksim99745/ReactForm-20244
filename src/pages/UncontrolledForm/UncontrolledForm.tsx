import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import styles from '../forms.module.scss';
import usePasswordStrength from '../Main/hooks/usePasswordStrength';
import useCustomValidation from './hooks/useCustomValidation';
import { usePasswordVisibility } from './hooks/usePasswordVisibility';

export default function UncontrolledForm() {
  const countries = useSelector((state: RootState) => state.countries);
  const { findError, handleSubmit, showPasswordStrength, setShowPasswordStrength } = useCustomValidation();
  const { passwordVisibility, togglePasswordVisibility } = usePasswordVisibility();
  const { checkTheStrength, strengthLevel } = usePasswordStrength();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkTheStrength(e.target.value);
  };

  return (
    <div>
      <h4>Uncontrolled Form</h4>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <span className={styles.error}>{findError('name')}</span>

        <label htmlFor="age">Age</label>
        <input type="text" id="age" name="age" />
        <span className={styles.error}>{findError('age')}</span>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
        <span className={styles.error}>{findError('email')}</span>

        <label htmlFor="password">Password</label>
        <input
          type={passwordVisibility}
          id="password"
          name="password"
          onChange={handlePasswordChange}
          onFocus={() => setShowPasswordStrength('visible')}
        />
        <div className="password-visibility">
          <label htmlFor="passwordVisibility">Show passwords</label>
          <input type="checkbox" name="passwordVisibility" onChange={togglePasswordVisibility} />
        </div>
        <span className={`${styles.strengthLevelBox} ${styles[strengthLevel]} ${styles[showPasswordStrength]}`}>
          {`Password strength is ${strengthLevel}`}
        </span>
        <span className={styles.error}>{findError('password')}</span>

        <label htmlFor="confirmPassword">Confirm password</label>
        <input type={passwordVisibility} id="confirmPassword" name="confirmPassword" />
        <span className={styles.error}>{findError('confirmPassword')}</span>

        <fieldset className={styles.gender}>
          <legend>Gender</legend>
          <div>
            <input type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">Female</label>
          </div>
        </fieldset>
        <span className={styles.error}>{findError('gender')}</span>

        <div className={styles.agreement}>
          <label htmlFor="agreement">Accept Terms and Conditions agreement </label>
          <input type="checkbox" id="agreement" name="agreement" data-val="true" value="true" />
        </div>
        <span className={styles.error}>{findError('agreement')}</span>

        <div className={styles.avatarContainer}>
          <label htmlFor="avatar">Upload picture: jpeg/png format, max size - 1 megabyte</label>
          <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
        </div>
        <div className={styles.error}>{findError('avatar')}</div>

        <div className={styles.countriesList}>
          <label htmlFor="country">Country</label>
          <input name="country" id="country" type="text" autoComplete="off" list="country-list" />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} label={country} />
            ))}
          </datalist>
        </div>
        <span className={styles.error}>{findError('country')}</span>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      <div className={styles.returnLink}>
        <Link to="/" type="button">
          Return to the main page
        </Link>
      </div>
    </div>
  );
}
