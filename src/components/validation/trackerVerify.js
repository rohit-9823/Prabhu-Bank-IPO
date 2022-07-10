import * as Yup from 'yup';

const Trackerverify = Yup.object().shape({
  Name: Yup.string()
  .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
  .required('Name is required.'),
  fatherName: Yup.string()
  .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
  .required('Father Name is required.'),
  
  formNumber: Yup.string()
  .matches(/^[0-9]+$/, "Must be only digits")
.min(10, 'Form number must be exactly 10 digits')
.max(10, 'Form number must be exactly 10 digits')
.required('Form number is required.'),
  boid: Yup.string()
  .matches(/^[0-9]+$/, "Must be only digits")
.min(10, 'BOID number must be exactly 10 digits')
.max(10, 'BOID number must be exactly 10 digits')
.required('BOID number is required.'),
  

})
export default Trackerverify; 