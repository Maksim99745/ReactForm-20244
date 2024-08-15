import * as yup from 'yup';

const MAX_PERSONAL_DATA_LENGTH = 25;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const MAX_PHOTO_SIZE_BITE = 1000000;
const MAX_LENGTH_MESSAGE = `Max allowed length is ${MAX_PERSONAL_DATA_LENGTH} symbol`;

export const allowedCountries = ['USA', 'Poland', 'Serbia', 'Italy'];
const allowedCountriesMessage = `Country should be in the list ${allowedCountries.join(', ')}`;

const avatarSchema = yup
  .mixed<File>()
  .required('Avatar is required')
  .test(
    'fileType',
    'File type must be either image/jpeg or image/png',
    (value) => value && ['image/jpeg', 'image/png'].includes(value.type),
  )
  .test('fileSize', `File size must be less than 1 MB`, (value) => value && value.size <= MAX_PHOTO_SIZE_BITE);

const passwordSchema = yup
  .string()
  .required(`Password is required`)
  .matches(
    PASSWORD_REGEX,
    `Password should contains minimum: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character !@#$%^&*`,
  )
  .max(MAX_PERSONAL_DATA_LENGTH, MAX_LENGTH_MESSAGE);

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First letter must be uppercase')
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
  agreement: yup.string().required('It"s mandatory to accept the Terms and Conditions'),
  avatar: avatarSchema,
  country: yup.string().required('Country is required').oneOf(allowedCountries, allowedCountriesMessage),
});
