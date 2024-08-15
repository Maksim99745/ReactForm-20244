import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import styles from './UncontrolledForm.module.scss';
import usePasswordStrength from './hooks/usePasswordStrength';
import useValidation from './hooks/useValidation';

export default function UncontrolledForm() {
  const countries = useSelector((state: RootState) => state.countries);
  const {
    findError,
    handleSubmit,
    handleUnBlockForm,
    isNotAbleToSubmit,
    showPasswordStrength,
    setShowPasswordStrength,
  } = useValidation();

  const { checkTheStrength, strengthLevel } = usePasswordStrength();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkTheStrength(e.target.value);
  };

  return (
    <div>
      <h4>Uncontrolled Form</h4>
      <form className={styles.formContainer} onSubmit={handleSubmit} onChange={handleUnBlockForm}>
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
          type="text"
          id="password"
          name="password"
          onChange={handleChange}
          onFocus={() => setShowPasswordStrength('visible')}
        />
        <span className={`${styles.strengthLevelBox} ${styles[strengthLevel]} ${styles[showPasswordStrength]}`}>
          {`Password strength is ${strengthLevel}`}
        </span>

        <span className={styles.error}>{findError('password')}</span>

        <label htmlFor="confirmPassword">Confirm password</label>
        <input type="txt" id="confirmPassword" name="confirmPassword" />
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
          <input type="checkbox" id="agreement" name="agreement" />
          <span className={styles.error}>{findError('agreement')}</span>
        </div>

        <div className={styles.avatarContainer}>
          <label htmlFor="avatar">Upload picture: jpeg/png format, max size - 1 megabyte</label>
          <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
          <span className={styles.error}>{findError('avatar')}</span>
        </div>

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

        <button type="submit" disabled={isNotAbleToSubmit} className={styles.submitButton}>
          Submit
        </button>
      </form>
      <div className={styles.returnLink}>
        <Link to="/" type="button">
          Return
        </Link>
      </div>
    </div>
  );
}
