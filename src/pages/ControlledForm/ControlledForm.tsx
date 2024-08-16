import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { controlledFormSchema } from '../../core/schemas/schemas';
import { ControlledFormData } from '../../models/ControlledFormData';
import { RootState } from '../../store/store';
import styles from '../forms.module.scss';
import usePasswordStrength from '../Main/hooks/usePasswordStrength';
import { usePasswordVisibility } from '../UncontrolledForm/hooks/usePasswordVisibility';
import { useControlledFormSubmit } from './hooks/useControlledFormSubmit';

export default function ControlledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ControlledFormData>({ resolver: yupResolver(controlledFormSchema), mode: 'onChange' });

  const countries = useSelector((state: RootState) => state.countries);
  const isSubmitAllowed = Object.getOwnPropertyNames(errors).length === 0;

  const { showPasswordStrength, setShowPasswordStrength, onSubmit } = useControlledFormSubmit();

  const { checkTheStrength, strengthLevel } = usePasswordStrength();

  const { passwordVisibility, togglePasswordVisibility } = usePasswordVisibility();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkTheStrength(e.target.value);
  };

  return (
    <div>
      <h4>React hook from</h4>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...register('name')} />
        <span className={styles.error}>{errors?.name?.message}</span>

        <label htmlFor="age">Age</label>
        <input type="text" id="age" {...register('age')} />
        <span className={styles.error}>{errors?.age?.message}</span>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register('email')} />
        <span className={styles.error}>{errors?.email?.message}</span>

        <label htmlFor="password">Password</label>
        <input
          type={passwordVisibility}
          id="password"
          {...register('password', {
            onChange: (e) => {
              handlePasswordChange(e);
            },
          })}
          onFocus={() => setShowPasswordStrength('visible')}
        />
        <div className="password-visibility">
          <label htmlFor="passwordVisibility">Show passwords</label>
          <input type="checkbox" name="passwordVisibility" onChange={togglePasswordVisibility} />
        </div>
        <span className={`${styles.strengthLevelBox} ${styles[strengthLevel]} ${styles[showPasswordStrength]}`}>
          {`Password strength is ${strengthLevel}`}
        </span>
        <span className={styles.error}>{errors?.password?.message}</span>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input type={passwordVisibility} id="confirmPassword" {...register('confirmPassword')} />
        <span className={styles.error}>{errors?.confirmPassword?.message}</span>

        <fieldset className={styles.gender}>
          <legend>Gender</legend>
          <div>
            <input type="radio" id="male" value="male" {...register('gender')} />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" id="female" value="female" {...register('gender')} />
            <label htmlFor="female">Female</label>
          </div>
        </fieldset>
        <span className={styles.error}>{errors?.gender?.message}</span>

        <div className={styles.agreement}>
          <label htmlFor="agreement">Accept Terms and Conditions agreement </label>
          <input type="checkbox" id="agreement" {...register('agreement')} />
        </div>

        <span className={styles.error}>{errors?.agreement?.message}</span>

        <div className={styles.avatarContainer}>
          <label htmlFor="avatar">Upload picture: jpeg/png format, max size - 1 megabyte</label>
          <input type="file" id="avatar" {...register('avatar')} />
          <span className={styles.error}>{errors?.avatar?.message}</span>
        </div>

        <div className={styles.countriesList}>
          <label htmlFor="country">Country</label>
          <input {...register('country')} id="country" type="text" autoComplete="off" list="country-list" />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} label={country} />
            ))}
          </datalist>
        </div>
        <span className={styles.error}>{errors?.country?.message}</span>

        <button type="submit" className={styles.submitButton} disabled={!isSubmitAllowed}>
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
