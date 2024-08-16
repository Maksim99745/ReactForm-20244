import * as yup from 'yup';

const MAX_PERSONAL_DATA_LENGTH = 25;
const NUMBER_REGEX = /\d/;
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const SPECIAL_SYMBOL_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
const MAX_PHOTO_SIZE_BITE = 1000000;
const MAX_LENGTH_MESSAGE = `Max allowed length is ${MAX_PERSONAL_DATA_LENGTH} symbol`;

export const allowedCountries = ['USA', 'Poland', 'Serbia', 'Italy'];
const allowedCountriesMessage = `Country should be in the list ${allowedCountries.join(', ')}`;

const passwordSchema = yup
  .string()
  .required(`Password is required`)
  .matches(NUMBER_REGEX, `Password should contains minimum: 1 number`)
  .matches(UPPERCASE_REGEX, `Password should contains minimum: 1 upper-cased letter,`)
  .matches(LOWERCASE_REGEX, `Password should contains minimum: 1 lowercased letter`)
  .matches(SPECIAL_SYMBOL_REGEX, `Password should contains minimum: 1 special character !@#$%^&*`)
  .max(MAX_PERSONAL_DATA_LENGTH, MAX_LENGTH_MESSAGE);

const avatarUncontrolledSchema = yup
  .mixed<File>()
  .required('Avatar is required')
  .test(
    'fileType',
    'File type must be either image/jpeg or image/png',
    (value) => value && ['image/jpeg', 'image/png'].includes(value.type),
  )
  .test('fileSize', `File size must be less than 1 MB`, (value) => value && value.size <= MAX_PHOTO_SIZE_BITE);

const avatarControlledSchema = yup
  .mixed<FileList>()
  .required('Avatar is required')
  .test('fileType', 'File type must be either image/jpeg or image/png', (value) => {
    const file = value && value[0];
    return file && ['image/jpeg', 'image/png'].includes(file.type);
  })
  .test('fileSize', 'File size must be less than 1 MB', (value) => {
    const file = value && value[0];
    return file && file.size <= MAX_PHOTO_SIZE_BITE;
  });

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First letter must be uppercase, only latin alphabet')
    .max(MAX_PERSONAL_DATA_LENGTH, MAX_LENGTH_MESSAGE),
  age: yup
    .string()
    .required('Age is required')
    .matches(/^[1-9]\d*$/, 'Age must be a positive number'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  agreement: yup
    .boolean()
    .required('It"s mandatory to accept the Terms and Conditions')
    .oneOf([true], 'It"s mandatory to accept the Terms and Conditions'),
  country: yup.string().required('Country is required').oneOf(allowedCountries, allowedCountriesMessage),
});

export const controlledFormSchema = schema.shape({ avatar: avatarControlledSchema });
export const uncontrolledFormSchema = schema.shape({ avatar: avatarUncontrolledSchema });
