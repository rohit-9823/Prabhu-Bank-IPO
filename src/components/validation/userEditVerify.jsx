import * as Yup from 'yup';

const Usereditverify = Yup.object().shape({
    fullname: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required('FullName is required.'),
    mobileno: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
  .min(10, 'Number must be exactly 10 digits')
  .max(10, 'Number   must be exactly 10 digits')
  .required('Mobile no is required.'),
})
export default Usereditverify; 