import * as Yup from 'yup';

const Createagentverify = Yup.object().shape({
  fullname: Yup.string()
  .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
  .required('FullName is required.'),
  email: Yup.string()
  .email('Must be a valid email address')
  .required('Email is required.'),
  mobileno: Yup.string()
  .matches(/^[0-9]+$/, "Must be only digits")
.min(10, 'Number must be exactly 10 digits')
.max(10, 'Number   must be exactly 10 digits')
.required('Mobile no is required.'),
password: Yup.string()
    .required('Password is required')
    .min(8, 'Password length should be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, 1 Uppercase, Lowercase, Number and Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must and should match'),
})
export default Createagentverify; 