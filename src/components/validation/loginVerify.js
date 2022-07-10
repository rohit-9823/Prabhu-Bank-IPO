import * as Yup from 'yup';

const Loginverify = Yup.object().shape({
    Username: Yup.string()
    .email('Must be a valid username')
    .required(' Username is required.'),
password: Yup.string()
    .required(' Password is required.'),
});

export default Loginverify;
