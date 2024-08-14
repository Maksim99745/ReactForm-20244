import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { schema } from '../../core/schemas/schemas';
import { RootState } from '../../store/store';
import styles from './UncontrolledForm.module.scss';

export default function UncontrolledForm() {
  const countries = useSelector((state: RootState) => state.countries);
  const [isNotAbleToSubmit, setIsNotAbleToSubmit] = useState(false);
  const [errorMessages, setErrorMessages] = useState<yup.ValidationError[] | []>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(data.entries());

    try {
      const formData = await schema.validate(formValues, { abortEarly: false });
      setErrorMessages([]);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrorMessages(error.inner);
        setIsNotAbleToSubmit(true);
      }
    }
  };

  const findError = (name: string): string | null => {
    const error = errorMessages.find((errorName) => errorName.path === name);
    return error ? error.message : null;
  };

  const handleUnBlockForm = () => {
    if (isNotAbleToSubmit) {
      setIsNotAbleToSubmit(false);
    }
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
        <input type="password" id="password" name="password" />
        <span className={styles.error}>{findError('password')}</span>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
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
    </div>
  );
}
