import * as Yup from "yup";

const ipoDetailVerify = Yup.object().shape({
  arrData: Yup.array()
    .min(1)
    // .max()
    .of(
      Yup.object().shape({
        // municipalityId: Yup.string().required('Municipality is required.'),
        // District: Yup.string().required('District is required.'),
        ward: Yup.array()
          .required("Ward is required.")
          .nullable(),
      })
    )
    .required("Must have values"),

  companyName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(" Company Name is required."),
  ipoType: Yup.string()
    .required(" IPO Type is required."),
  // shareType: Yup.string()
  //   .required(" Share Type is required."),
  issueManager: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(" Issue Manager is required."),
  // ipoDetails: Yup.string().required(" IPO Details is required."),
  priceforShare: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Price of Share is required."),
    companycode: Yup.string()
    .required("Company Code is required."),
    maxkitta: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Maximum kitta is required."),
    minkitta: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Minimum Kitta is required."),
  numberofShare: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Number of Share is required."),

  // startDate: Yup.string().required("Start Date is required."),
  // endDate: Yup.string().required("End Date is required."),
  // offerFile: Yup.string().required('Offer Letter is required.'),
  // Forms: Yup.string().required('Forms is required.'),
  // prospectus: Yup.string().required('Prospectus is required.'),
});

export default ipoDetailVerify;
