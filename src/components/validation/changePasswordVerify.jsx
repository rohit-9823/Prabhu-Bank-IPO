import * as Yup from 'yup';

const Changepasswordverify = Yup.object().shape({
  oldPassword: Yup.string()
  .required(' Password is required.'),
newPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password length should be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must and should match'),
})
export default Changepasswordverify; 