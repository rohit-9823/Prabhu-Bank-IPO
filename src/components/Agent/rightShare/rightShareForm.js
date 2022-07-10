import React, { useState, useEffect } from "react";
import { ErrorMessage, Formik } from "formik";
import Logo from "../../../assests/images/logo.png";
// import "./publicIpoForm.css";
import { Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setIpoDetails,
  setIpoMetaDetails,
  setPersonDetails,
} from "../../../actions/userIpoActions";
import { useHistory } from "react-router-dom";
import { red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import * as yup from "yup";
import { httpClient } from "../../../constants/httpClient";
import { notify } from "../../../constants/notify";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
export default function Rightshareform(props) {
  let [amount, setAmount] = useState("0");
  const token = localStorage.getItem("dm-access_token");
  let userIpoDetails = useSelector((state) => state.userIpoDetails);
  // let ipoInfo=useSelector((state)=>state.userIpoDetails.ipoMetaDetails)
  const handleSubmit1 = (values) => {
    let finalValue = "";

    finalValue = {
      ...values,
      ...userIpoDetails.personalDetails.citizenshipDetails,
      ...userIpoDetails.personalDetails.accountdetail,
      ...userIpoDetails.personalDetails.personalDetails,
      ...userIpoDetails.personalDetails.voucher,
      ...userIpoDetails.ipoDetails,
    };

    // Account Details
    finalValue.bankName = finalValue.accountdetail.bankname;
    finalValue.branchName = finalValue.accountdetail.branchname;
    finalValue.accounttype = finalValue.accountdetail.accountType;
    finalValue.accountno = finalValue.accountdetail.accountNo;

    // Voucher

    finalValue.agentBranchName = finalValue.voucher.branchname;
    finalValue.agentBankName = finalValue.voucher.bankname;
    finalValue.transactionId = finalValue.voucher.transactionid;
    finalValue.chequeNo = finalValue.voucher.chequeno;

    // Common Voucher Fields
    finalValue.agentPaymentType = paytype;
    finalValue.voucher = finalValue.voucher.voucherUpload;

    finalValue.amount = amount;

    // Personal Details
    finalValue.granFatherName = finalValue.personalDetails.grandfatherName;
    finalValue.fatherName = finalValue.personalDetails.fatherName;
    finalValue.mobileNo = finalValue.personalDetails.phoneNumber;
    finalValue.email = finalValue.personalDetails.email;

    // Address Details
    finalValue.citizenshipIssuedDistrictId =
      finalValue.citizenshipDetails.citizenshipIssuedDistrictId;
    finalValue.citizenshipNo = finalValue.citizenshipDetails.citizenshipNo;
    finalValue.tempMunicipalityId =
      finalValue.temporaryAddress.localMunicipality;
    finalValue.tempWard = finalValue.temporaryAddress.wardNo;
    finalValue.tempTole = finalValue.temporaryAddress.tole;
    finalValue.perMunicipalityId = permunivalues;
    finalValue.perWard = finalValue.permanentAddress.wardNo;
    finalValue.boid = boidchange;
    finalValue.formnumber = finalValue.personalDetails.formnumber;
    finalValue.name = finalValue.personalDetails.name;
    finalValue.panNo = finalValue.personalDetails.panNo;
    finalValue.perTole = finalValue.permanentAddress.tole;

    finalValue.gender = genders;
    finalValue.ipoIssueId = props.history.location.state;
    // finalValue.appliedQuantity =statekitta;
    // finalValue.price = statetotal;
    finalValue.isPermanent = false;
    finalValue.issueDate = finalValue.citizenshipDetails.issudeDate;
    finalValue.isMinor = isminor;

    if (finalValue.personalDetails.isMinor) {
      finalValue.birthCertificateNo = finalValue.mainorDetails.mainorIdNumber;
      finalValue.birthCertificateIssueDate =
        finalValue.mainorDetails.birthCertificateIssueDate;

      finalValue.guardianName = finalValue.mainorDetails.guardianName;
      finalValue.guardianRelationship =
        finalValue.mainorDetails.guardianRelationship;

      finalValue.citizenshipNo =
        finalValue.mainorDetails.guardianCitizenshipNumber;
      finalValue.citizenshipIssuedDistrictId =
        finalValue.mainorDetails.guardianCitizenshipIssuedDistrictId;
      finalValue.issueDate = finalValue.mainorDetails.guardianIssudeDate;
    }

    if (appliedKitta == null && minKitta == null && maxKitta == null) {
      console.log(values);
      httpClient
        .UPLOADAGENTFORM(
          "POST",
          "api/applicant/create/agent/right-share",
          finalValue,
          finalValue.citizenshipDetails.citizenshipFrontImage,
          finalValue.citizenshipDetails.citizenshipBackImage,
          finalValue.citizenshipDetails.marriageCertificate,
          finalValue.citizenshipDetails.spouseCertificate,
          null,
          finalValue.citizenshipDetails.birthCertificateImage,
          finalValue.personalDetails.isMinor,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((resp) => {
          let value = JSON.parse(resp);

          Swal.fire({
            title: "Successfull",
            title: `Token number:  ${value.data}`,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/agent");
              // Swal.fire("Ok", "success");
            }
          });
        })
        .catch((err) => {
          let data = JSON.parse(err);
          notify.error(data.message);
        });

      // submittingKitta(finalValue)
      //
    }
  };

  const handleChange = (event, allValues) => {
    let { value } = event.target;
    let division = value % 10;
    if (division !== 0) {
      setAppliedkittaError(true);
    } else {
      if (userIpoDetails.ipoMetaDetails.maxkitta <= value) {
        setMaxKitta(true);
      } else {
        setMaxKitta(null);
      }

      if (userIpoDetails.ipoMetaDetails.minkitta > value) {
        setMinKitta(true);
      } else {
        setMinKitta(null);
      }

      setAppliedkittaError(null);
    }
    let finalAmount = value * userIpoDetails.ipoMetaDetails.pricepershare;
    allValues.setFieldValue("kitta", value);
    setAmount(finalAmount);
  };
  // declaration section
  const [paytype, setpaytype] = useState(1);
  const [provience, setProvience] = useState({});
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [selectedOption, setselectedOption] = useState("");
  const [displaybranch, setdisplaybranch] = useState("");
  const [valuebranch, setvaluebranch] = useState("");
  const [citizenshipFrontImage, setCitizenshipFrontImage] = useState(null);
  const [
    citizenshipFrontImageErrorMessage,
    setCitizenshipFrontImageErrorMessage,
  ] = useState(null);
  const [citizenshipBackImage, setCitizenshipBackImage] = useState(null);
  const [location, setLocation] = useState([]);

  const [selectedImageOffer3, setImageOffer3] = useState();
  const [banklists, setbanklists] = useState([]);
  const [tempprovince, settempprovince] = useState([]);
  const [perdistrict, setperdistrict] = useState([]);
  const [province, setprovince] = useState([]);
  const [checkboxes, setcheckboxes] = useState(true);
  const [frontimagename, setfrontimage] = useState("Front Side");
  const [frontimagenames, setfrontimages] = useState();
  const [backimagename, setbackimage] = useState("Back Side");
  const [spousecertificate, setspousecertificate] = useState("Image");
  const [spousecertificates, setspousecertificates] = useState();
  const [backimagenames, setbackimages] = useState();
  const [boidyes, setboidyes] = useState(true);
  const [voucherImage, setVoucherImage] = useState("Voucher Image");
  const [marriageCertificates, setmarriagecertificates] = useState();
  const [marriageCertificate, setmarriageCertificate] = useState("Image");
  const [minorid, setminorid] = useState("Minor Id");
  const [minorids, setminorids] = useState();
  const [voucheruploads, setvoucheruploads] = useState();
  const [genders, setgender] = useState();
  const [permunivalues, setpermunivalues] = useState();
  const [branchnames, setbranchnames] = useState([]);
  const [ipometadata, setipometadata] = useState([]);
  const [district, setDistricts] = useState([]);
  const [municipality, setMunicipality] = useState([]);
  const [newmunicipality, setnewMunicipality] = useState([]);
  const [municipalityAndWardNo, setMunicipalityAndWardNo] = useState([]);
  const [wards, setWards] = useState([]);
  const [issuedistrict, setissuedistricts] = useState([]);
  const [isminor, setIsMinor] = useState(false);
  const [appliedKitta, setAppliedkittaError] = useState(null);
  const [minKitta, setMinKitta] = useState(null);
  const [maxKitta, setMaxKitta] = useState(null);
  const [voucherBranch, setVoucherBranch] = useState([]);
  const [right, setright] = useState({
    kitta: "",
    total: "",
  });

  const [btndisable, setbtndisable] = useState(true);
  const [boidchange, setboidchange] = useState([]);
  const [statekitta, setstatekitta] = useState([]);
  const [statetotal, setstatetotal] = useState([]);

  let history = useHistory();
  // redux data and methods initialization
  let dispatch = useDispatch();
  let settingPersonalDetails = bindActionCreators(setPersonDetails, dispatch);
  let ipoDetails = useSelector((state) => state.userIpoDetails.ipoDetails);
  let settingIpoMetaDetails = bindActionCreators(setIpoMetaDetails, dispatch);
  let ipoInfo = useSelector((state) => state.userIpoDetails.ipoMetaDetails);
  let personalDetails = useSelector(
    (state) => state.userIpoDetails.personalDetails
  );

  // end of redux data and methods initialization

  const [details, setDetails] = useState({});

  const accountTypeOption = [
    { value: "current", label: "Current" },
    { value: "saving", label: "Saving" },
  ];

  let schema = yup.object().shape({
    personalDetails: yup.object().shape({
      name: yup.string().required("Name is required"),
      boid: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(16, "Number must be exactly 16 digits")
        .max(16, "Number   must be exactly 16 digits"),
      phoneNumber: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Number must be exactly 10 digits")
        .max(10, "Number   must be exactly 10 digits")
        .required("Phone number is required."),
      email: yup.string().email("Must be a valid email"),
      grandfatherName: yup.string().required("Grandfather name is required"),
      fatherName: yup.string().required("Father name is required"),
    }),

    kitta: yup.string().required("Applied Kitta is required"),
    // citizenshipDetails: yup.object().shape({
    //   citizenshipNo: yup.string().required("Citizenship number is required"),
    //   citizenshipFrontImage: yup.string().required("citizenship front image is required"),
    //   citizenshipBackImage: yup.string().required("Citizenship back image is required"),
    //   citizenshipIssuedDistrictId: yup.string().required("Issue district is required"),
    //   issudeDate: yup.string().required("Issue date is required"),

    //   // birthCertificateIssueDate:yup.string().required("Birth Certificate Issue Date is required"),
    //   // birthCertificateImage:yup.string().required("Birth Certificate Issue Date is required"),

    // }),
    temporaryAddress: yup.object().shape({
      // provience:yup.number().typeError('Provience must be a number').required("Provience is required"),
      district: yup.string().required("District is required"),
      localMunicipality: yup
        .string()
        .required("Local municipality is required"),
      wardNo: yup
        .number()
        .typeError("Wardno. is a number")
        .required("Ward no is required"),
      tole: yup.string().required("Tole is required"),
    }),

    // mainorDetails: yup.object().shape({

    // mainorIdNumber: yup.string().when('personalDetails.isMinor', {
    //   is: true,
    //   then: yup.string().required('Field is required')
    // }),

    //   // provience:yup.number().typeError('Provience must be a number').required("Provience is required"),
    //   mainorIdNumber: yup.string().required("Minor id number is required"),
    //   birthCertificateIssueDate: yup.string().required("Birth certificate issue date is required"),
    //   birthCertificateImage: yup.number().required("Birth certificate image is required"),
    //   guardianName: yup.string().required("Guardian name is required"),
    //   guardianRelationship: yup.string().required("Relationship is required"),
    //   guardianCitizenshipNumber: yup.string().required("Citizenship Number is required"),
    //   guardianCitizenshipFrontImage: yup.string().required("Citizensnship back is required"),
    //   guardianCitizenshipBackImage: yup.string().required("Citizensnship back is required."),
    //   guardianCitizenshipIssuedDistrictId: yup.string().required("Issue District is required."),
    //   guardianIssudeDate: yup.string().required("Issue Date is required."),

    // }),

    accountdetail: yup.object().shape({
      bankname: yup.string().required("Bank Name is required"),
      branchname: yup.string().required("Branch Name is required"),
      accountNo: yup.string().required("Account no is required"),
      accountType: yup.string().required("Account Type required"),
    }),
    voucher: yup.object().shape({
      // bankname: yup.string().required("Bank Name is required"),
      // branchname: yup.string().required("Branch Name is required"),
      // transactionid: yup.string().required("Transaction id is required"),
      // chequeno: yup.string().required("Cheque no required"),
      // vouchertype: yup.string().required("Voucher Type required"),
      // voucherUpload: yup.string().required("Voucher Image required"),
    }),
    permanentAddress: yup.object().shape({
      // provience:yup.string().required("Provience is required"),
      district: yup.string().required("District is required"),
      localMunicipality: yup
        .string()
        .required("Local municipality is required"),
      wardNo: yup.string().required("Ward no is required"),
      tole: yup.string().required("Tole is required"),
    }),
  });
  // end of validation
  // end of state management

  const handleboidy = (value, allvalues) => {
    if (value == "yes") {
      setboidyes(true);
    } else {
      setboidchange(null);
      setstatekitta(0);
      setstatetotal(0);
      setboidyes(false);
    }
    console.log(value);
  };

  const banklist = () => {
    axios
      .get("https://backend.prabhucapital.com/api/v1/public/bank-data")
      .then((res) => {
        let datas = res.data.data.list.map((values) => {
          return {
            value: values.bank,
            label: values.bank,
          };
        });
        setbanklists(datas);
      });
  };
  const vouchertypes = (e) => {
    let id = parseInt(e.target.value, 10);

    setpaytype(id);
  };
  const handleChangeIconImage3 = (e) => {
    let files = e.target.files[0];
    let reader = new FileReader();
    // setimgname(files.name);

    setImageOffer3(files);
    // reader.onloadend = () => {
    //     setImageOffer(files);
    // };
    // reader.readAsDataURL(files);
  };
  const handleprovincedata = (value, allvalue) => {
    // let data = {
    //   id:ipoDetails.id,
    // };

    let data = {
      stateId: value.value,
    };
    httpClient
      .POST("api/district/state/get-all", data, false, true, "data")
      .then((res) => {
        let finaldata = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        setperdistrict(finaldata);
      })
      .catch((err) => {});
  };
  const handleprovincedatas = (value, allvalue) => {
    let data = {
      stateId: value.value,
    };
    httpClient.POST("api/district/state/get-all", data).then((res) => {
      let datas = res.data.data.map((values) => {
        return {
          value: values.id,
          label: values.name,
        };
      });
      setDistricts(datas);
    });
  };

  const handleDownload = (e, value, type) => {
    e.preventDefault();
    window.open(
      "http://ipoapply.prabhucapital.com/api/ipo/download/" +
        type +
        "/" +
        value,
      "_blank"
    );
  };

  const handleboidchanges = (e) => {
    let target = e.target.value;
    setboidchange(e.target.value);
    let data = {
      boid: target,
      ipoId: 1,
    };
    httpClient
      .POST("api/right-share/get-kitta", data, false, true, "data")
      .then((resp) => {
        let datas = resp.data.data;
        var conversion = JSON.stringify({ datas });

        if (Object.keys(datas).length === 0) {
          setstatekitta(0);
          setstatetotal(0);
          setbtndisable(true);
        } else {
          setstatekitta(resp.data.data.totalkitta);
          setstatetotal(resp.data.data.issueright);
          setbtndisable(false);
        }
      })
      .catch((err) => {});
  };

  // method declaration
  useEffect(() => {
    banklist();
    getprovinces();
    gettempprovinces();
    getpermanentdistrict();
    getissuedistrict();
    // checkIsIpoSelectOrNot();
    getIpoInfo();

    if (props.value == "agent1") {
      setDetails({
        kitta: "",
        amount: "",
        personalDetails: {
          isMinor: false,
          name: "",
          boid: "",
          phoneNumber: "",
          email: "",
          grandfatherName: "",
          fatherName: "",
          gender: "",
          panNo: "",
          formnumber: "",
        },
        citizenshipDetails: {
          citizenshipNo: "",
          citizenshipFrontImage: "",
          citizenshipBackImage: "",
          citizenshipIssuedDistrictId: "",
          marriageCertificate: "",
          spouseCertificate: "",
          issudeDate: "",
        },
        mainorDetails: {
          mainorIdNumber: "",
          birthCertificateIssueDate: "",
          birthCertificateImage: "",
          guardianName: "",
          guardianRelationship: "",
          guardianCitizenshipNumber: "",
          guardianCitizenshipFrontImage: "",
          guardianCitizenshipBackImage: "",
          guardianCitizenshipIssuedDistrictId: "",
          guardianIssudeDate: "",
        },
        temporaryAddress: {
          provience: "",
          district: "",
          localMunicipality: "",
          wardNo: "",
          tole: "",
        },
        accountdetail: {
          bankname: "",
          branchname: "",
          accountType: "",
          accountNo: "",
        },
        permanentAddress: {
          provience: "",
          district: "",
          localMunicipality: "",
          wardNo: "",
          tole: "",
        },
        voucher: {
          vouchertype: "",
          transactionid: "",
          bankname: "",
          branchname: "",
          chequeno: "",
          voucherUpload: "",
        },
      });
    } else {
      setDetails({
        kitta: "",
        amount: "",
        personalDetails: {
          isMinor: false,
          name: "",
          boid: "",
          phoneNumber: "",
          email: "",
          grandfatherName: "",
          fatherName: "",
          gender: "",
          panNo: "",
          formnumber: "",
        },
        citizenshipDetails: {
          citizenshipNo: "",
          citizenshipFrontImage: "",
          citizenshipBackImage: "",
          citizenshipIssuedDistrictId: "",
          marriageCertificate: "",
          issudeDate: "",
        },
        mainorDetails: {
          mainorIdNumber: "",
          birthCertificateIssueDate: "",
          birthCertificateImage: "",
          guardianName: "",
          guardianRelationship: "",
          guardianCitizenshipNumber: "",
          guardianCitizenshipFrontImage: "",
          guardianCitizenshipBackImage: "",
          guardianCitizenshipIssuedDistrictId: "",
          guardianIssudeDate: "",
        },
        temporaryAddress: {
          provience: "",
          district: "",
          localMunicipality: "",
          wardNo: "",
          tole: "",
        },
        accountdetail: {
          bankname: "",
          branchname: "",
          accountType: "",
          accountNo: "",
        },
        permanentAddress: {
          provience: "",
          district: "",
          localMunicipality: "",
          wardNo: "",
          tole: "",
        },
      });
    }

    // getLocation()
  }, []);
  const checkIsIpoSelectOrNot = () => {
    if (!ipoDetails.companyname) {
      notify.error("Please select Ipo");
      if (props.value == "agent1") {
        history.push("/agent");
      } else {
        history.push("/");
      }
    }
  };
  const getIpoInfo = () => {
    httpClient
      .POST("api/ipo/get-ipo", { ipoIssueId: ipoDetails.id })
      .then((resp) => {
        // setIpoInfo(resp.data.data)
        settingIpoMetaDetails(resp.data.data);
        setipometadata(resp.data.data);
      });
  };

  const getissuedistrict = () => {
    httpClient.GET("api/district/get-all").then((res) => {
      let datas = res.data.data.map((values) => {
        return {
          value: values.id,
          label: values.name,
        };
      });
      setissuedistricts(datas);
    });
  };
  const getprovinces = () => {
    let values = {
      id: ipoDetails.id,
    };
    httpClient
      .GET("api/state/get-all", false, true)
      .then((res) => {
        let data = res.data.data;
        let finalvalue = data.map((item, index) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        setprovince(finalvalue);
      })
      .catch((err) => {});
  };
  const handlespouseCertificate = (event, allvalues) => {
    allvalues.setFieldValue(
      "citizenshipDetails.spouseCertificate",
      event.target.files[0]
    );
    setspousecertificates(URL.createObjectURL(event.target.files[0]));
  };
  const gettempprovinces = () => {
    let values = {
      id: ipoDetails.id,
    };
    httpClient
      .GET("api/state/get-all")
      .then((res) => {
        let newvalue = res.data.data.map((datas) => {
          return {
            value: datas.id,
            label: datas.name,
          };
        });

        settempprovince(newvalue);
      })
      .catch((err) => {});
  };
  const getpermanentdistrict = () => {
    let values = {
      id: ipoDetails.id,
    };
    httpClient
      .POST("api/ipo/get-location", values)
      .then((res) => {
        let newvalue = res.data.data.district.map((datas) => {
          return {
            value: datas.districtid,
            label: datas.districtname,
          };
        });

        // setperdistrict(newvalue);
      })
      .catch((err) => {});
  };

  const getLocation = () => {
    httpClient
      .POST("api/ipo/get-location", { id: ipoDetails.id })
      .then((resp) => {
        let data = resp.data.data;
        setProvience({ provience: data.province, id: data.provinceid });

        let finalDistrict = data.district.map((item, index) => {
          return {
            value: item.districtid,
            label: item.districtname,
          };
        });
        setDistricts(finalDistrict);
      })
      .catch((err) => {
        notify.error("Error in fetching district");
      });
  };
  const handleSubmit = (values) => {
    settingPersonalDetails(values);
    if (props.value == "agent1") {
      history.push("/AgentApplyipo2");
    } else {
      history.push("/publicipo2");
    }
  };
  const handleFrontCitizenshipChange = (event, allvalues) => {
    allvalues.setFieldValue(
      "citizenshipDetails.citizenshipFrontImage",
      event.target.files[0]
    );
    setfrontimages(URL.createObjectURL(event.target.files[0]));
  };
  const handleVoucherImage = (event, allvalues) => {
    allvalues.setFieldValue("voucher.voucherUpload", event.target.files[0]);
    setvoucheruploads(URL.createObjectURL(event.target.files[0]));
  };
  const handleMinorDocChange = (event, allvalues) => {
    allvalues.setFieldValue(
      "citizenshipDetails.birthCertificateImage",
      event.target.files[0]
    );
    setminorids(URL.createObjectURL(event.target.files[0]));
  };

  const handleBackCitizenshipChange = (event, allvalues) => {
    allvalues.setFieldValue(
      "citizenshipDetails.citizenshipBackImage",
      event.target.files[0]
    );
    setbackimages(URL.createObjectURL(event.target.files[0]));
  };
  const handleMarriageCertificate = (event, allvalues) => {
    allvalues.setFieldValue(
      "citizenshipDetails.marriageCertificate",
      event.target.files[0]
    );
    setmarriagecertificates(URL.createObjectURL(event.target.files[0]));
  };

  const handleMinorChange = (event, allValues) => {
    // allvalues.
    if (event.target.checked) {
      setIsMinor(true);
      return allValues.setFieldValue("personalDetails.isMinor", true);
    } else {
      setIsMinor(false);
      return allValues.setFieldValue("personalDetails.isMinor", false);
    }
    // allValues.setFieldValue("personalDetails.isminor", false)
  };
  const handleMunicipalityChange = (value) => {
    setpermunivalues(value.value);
  };
  //   const handleMunicipalityChange = (value, allValues, origin) => {

  //     let selectedMunicipality = municipalityAndWardNo.filter((item, index) => {

  //       if (item.municipilityid == value.value) {
  //         return true;
  //       }
  //     });
  //     let wards = selectedMunicipality[0].wards.map((item) => {
  //       return {
  //         value: item,
  //         label: item,
  //       };
  //     });
  //     //

  //     setWards(wards);
  //     if (origin === "temporary")
  //       return allValues.setFieldValue(
  //         "temporaryAddress.localMunicipality",
  //         value.value
  //       );
  //     allValues.setFieldValue("permanentAddress.localMunicipality", value.value);
  //     //
  //   };

  const handleMunicipalityChanges = (value, allValues, origin) => {
    return allValues.setFieldValue(
      "temporaryAddress.localMunicipality",
      value.value
    );
  };

  const handleWardChange = (value, allValues, origin) => {
    if (origin === "temporary")
      return allValues.setFieldValue("temporaryAddress.wardNo", value.value);
    allValues.setFieldValue("permanentAddress.wardNo", value.value);
  };

  const muniper = (value) => {
    let data = {
      districtId: value.value,
    };
    httpClient
      .POST("api/municipality/get-all", data, false, true, "data")
      .then((res) => {
        let finaldata = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        setMunicipality(finaldata);
      })
      .catch((err) => {});
  };

  //   const handleDistrictChange = (value, allValues, origin) => {
  //
  //

  //     httpClient
  //       .POST("api/ipo/get-location/municipality", {
  //         districtId: value.value,
  //         ipoId: ipoDetails.id,
  //       })
  //       .then((resp) => {
  //         let data = resp.data.data;
  //         let finalMunicipalities = data.map((item, index) => {
  //           return {
  //             value: item.municipilityid,
  //             label: item.municipilityname,
  //           };
  //         });
  //         setMunicipality(finalMunicipalities);
  //         //
  //         setMunicipalityAndWardNo(resp.data.data);
  //       })
  //       .catch((err) => {
  //         notify.error("Error in fetching data");
  //       });
  //     if (origin === "temporary") {
  //       allValues.setFieldValue("temporaryAddress.provience", provience.id);
  //       return allValues.setFieldValue("temporaryAddress.district", value.value);
  //     }

  //     allValues.setFieldValue("permanentAddress.provience", provience.id);
  //     allValues.setFieldValue("permanentAddress.district", value.value);
  //   };

  const handleDistrictChanges = (value, allValues, origin) => {
    let data = {
      districtId: value.value,
    };
    httpClient
      .POST("api/municipality/get-all", data)
      .then((resp) => {
        let data = resp.data.data;
        let finalMunicipalities = data.map((item, index) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        setnewMunicipality(finalMunicipalities);
        //
        setMunicipalityAndWardNo(resp.data.data);
      })
      .catch((err) => {
        notify.error("Error in fetching data");
      });
    allValues.setFieldValue("temporaryAddress.provience", provience.id);
    return allValues.setFieldValue("temporaryAddress.district", value.value);
  };

  // const handlecheckbox=()=>{
  // setcheckboxes(!checkboxes)
  // }

  const handleDistrictchange = (value, allValues, origin) => {
    if (origin === "citizen") {
      return allValues.setFieldValue(
        "citizenshipDetails.citizenshipIssuedDistrictId",
        value.value
      );
    } else {
      return allValues.setFieldValue(
        "mainorDetails.guardianCitizenshipIssuedDistrictId",
        value.value
      );
    }
  };

  const handleAccountType = (value, allValues) => {
    return allValues.setFieldValue("accountdetail.accountType", value.value);
  };

  const handleBankName = (value, allValues) => {
    setbranchnames(null);

    let updatedString = "";
    if (value.value.includes("&")) {
      updatedString = value.value.replace("&", "%26");
    } else {
      updatedString = value.value;
    }
    axios
      .get(
        `https://backend.prabhucapital.com/api/v1/public/bank-data?bank=${updatedString}&sort=false`
      )
      .then((res) => {
        let datas = res.data.data.list.map((values) => {
          return {
            value: values.branchName,
            label: values.branchName,
          };
        });
        setbranchnames(datas);
      });

    return allValues.setFieldValue("accountdetail.bankname", value.value);
  };

  const handleBankBranch = (value, allValues) => {
    return allValues.setFieldValue("accountdetail.branchname", value.value);
  };
  const handlevoucherbranch = (value, allValues) => {
    return allValues.setFieldValue("voucher.branchname", value.value);
  };

  const voucherHandleBranchName = (value, allValues) => {
    setdisplaybranch(value.value);
    let updatedString = "";
    if (value.value.includes("&")) {
      updatedString = value.value.replace("&", "%26");
    } else {
      updatedString = value.value;
    }
    axios
      .get(
        `https://backend.prabhucapital.com/api/v1/public/bank-data?bank=${updatedString}&sort=false`
      )

      .then((res) => {
        let finalvalue = res.data.data.list.map((values) => {
          return {
            value: values.branchName,
            label: values.branchName,
          };
        });
        setVoucherBranch(finalvalue);
      });
    return allValues.setFieldValue("voucher.bankname", value.value);
  };
  // const handleChange=(event,allValues)=>{
  //   let {value}=event.target
  //
  //   let finalAmount=value*userIpoDetails.ipoMetaDetails.pricepershare
  //   allValues.setFieldValue("kitta",value)
  //   setAmount(finalAmount)
  // }

  // end of method declaration

  // const removeImage=()=>{
  //
  //   setmarriagecertificates()
  //   setmarriageCertificate('Images')
  // }
  const handleboidchange = (e) => {
    let target = e.target.value;
    setboidchange(e.target.value);
    let data = {
      boid: target,
      ipoId: 1,
    };
    httpClient
      .POST("api/right-share/get-kitta", data, false, true, "data")
      .then((resp) => {
        let datas = resp.data.data;
        var conversion = JSON.stringify({ datas });

        if (Object.keys(datas).length === 0) {
          setstatekitta(0);
          setstatetotal(0);
          setbtndisable(true);
        } else {
          setstatekitta(resp.data.data.totalkitta);
          setstatetotal(resp.data.data.issueright);
          setbtndisable(false);
        }
      })
      .catch((err) => {});
  };
  return (
    <div className="ipoissued-body">
      <div className="ipoissued-body1">
        <div className="apply-for-issue">
          <div className="apply-for-issue1">
            <p id="apply-for-issue">
              <span
                onClick={() => history.goBack()}
                style={{ cursor: "pointer" }}
              >
                <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
              </span>{" "}
              &nbsp; &nbsp;Apply for issue
            </p>
            <div className="apply-share-form">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">
                  {ipoDetails.companyname}{" "}
                  <span id="ipoissued-p-ipo">{ipoDetails.ipotype}</span>{" "}
                  <span id="ipoissued-share-type">{ipoDetails.sharetype}</span>
                </p>
              </div>
              <div>
                <form>
                  <div className="share-apply-form1">
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Issue Manager</label>
                      </div>
                      <input disabled value={ipoInfo.issuemanager}></input>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Issue open date</label>
                      </div>
                      <input disabled value={ipoInfo.startdate}></input>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Issue close date</label>
                      </div>
                      <input disabled value={ipoInfo.enddate}></input>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Number of share issued</label>
                      </div>
                      <input disabled value={ipoInfo.noofshareissued}></input>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Price per share</label>
                      </div>
                      <input disabled value={ipoInfo.pricepershare}></input>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Max Kitta</label>
                      </div>
                      <input disabled value={ipometadata.maxkitta}></input>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Min Kitta</label>
                      </div>
                      <input disabled value={ipometadata.minkitta}></input>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Prospectus</label>
                      </div>
                      <button
                        onClick={(e) =>
                          handleDownload(e, ipoInfo.prospectus, "prospectus")
                        }
                      >
                        View prospectus
                      </button>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Offer letter</label>
                      </div>
                      <button
                        onClick={(e) =>
                          handleDownload(e, ipoInfo.offerletter, "offerLetter")
                        }
                      >
                        View offer letter
                      </button>{" "}
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Form</label>
                      </div>
                      <button
                        onClick={(e) => handleDownload(e, ipoInfo.form, "form")}
                      >
                        View forms
                      </button>{" "}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* p
                  e
                  r
                  s
                  o
                  n
                  a
                  l Detal form here           */}

            <Formik
              initialValues={details}
              onSubmit={handleSubmit1}
              //   validationSchema={schema}
            >
              {(allvalues, errors, touched, setFieldValue) => (
                <div>
                  <div className="apply-share-form personal-info-form">
                    <div className="ipo-issued-brief iib-border-bottom">
                      <p id="ipo-issued-name">Personal Details</p>
                    </div>
                    <div>
                      <Form>
                        <div className="isminor-checkbox">
                          {/* <input type="checkbox" /> */}
                          <Checkbox
                            onChange={(event) =>
                              handleMinorChange(event, allvalues)
                            }
                            {...label}
                            sx={{
                              color: red[800],
                              "&.Mui-checked": {
                                color: red[600],
                              },
                            }}
                          />
                          <label>Is minor?</label>
                        </div>

                        <div className="share-apply-form1">
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Applicant name*</label>
                            </div>
                            <Field
                              placeholder="Full name"
                              name="personalDetails.name"
                            ></Field>
                            <ErrorMessage
                              name="personalDetails.name"
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="input-gender">
                            <label htmlFor="">Gender*</label>
                            <div className="input-gender2">
                              <div className="input-gen-radio1">
                                <input
                                  type="radio"
                                  className="radio-btnn"
                                  name="personalDetails.gender"
                                  onClick={setgender(0)}
                                />
                                <label for="radio-btn">Male</label>
                              </div>
                              <div className="input-gen-radio1">
                                <input
                                  type="radio"
                                  className="radio-btn"
                                  name="personalDetails.gender"
                                  onClick={setgender(1)}
                                />
                                <label for="radio-btn">Female</label>
                              </div>
                              <div className="input-gen-radio1">
                                <input
                                  type="radio"
                                  className="radio-btn"
                                  name="personalDetails.gender"
                                  onClick={setgender(2)}
                                />
                                <label for="radio-btn">Others</label>
                              </div>
                            </div>
                          </div>{" "}
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Form Number</label>
                            </div>
                            <Field
                              placeholder="Form Number"
                              name={"personalDetails.formnumber"}
                              // onChange={(e)=>handleboidchange(e)}
                              // value={boidchange}
                            ></Field>
                            <ErrorMessage
                              name={"personalDetails.formnumber"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Phone number*</label>
                            </div>
                            <Field
                              placeholder="Mobile number"
                              name={"personalDetails.phoneNumber"}
                            ></Field>
                            <ErrorMessage
                              name={"personalDetails.phoneNumber"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Email address</label>
                            </div>
                            <Field
                              placeholder="mail@gmail.com"
                              name={"personalDetails.email"}
                            ></Field>
                            <ErrorMessage
                              name={"personalDetails.email"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Grandfather name*</label>
                            </div>
                            <Field
                              placeholder="Full name"
                              name={"personalDetails.grandfatherName"}
                            ></Field>
                            <ErrorMessage
                              name={"personalDetails.grandfatherName"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Father name*</label>
                            </div>
                            <Field
                              placeholder="Full name"
                              name={"personalDetails.fatherName"}
                            ></Field>
                            <ErrorMessage
                              name={"personalDetails.fatherName"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Pan no.</label>
                            </div>
                            <Field
                              placeholder="pan no."
                              name={"personalDetails.panNo"}
                            ></Field>
                          </div>
                        </div>

                        {!isminor && (
                          <div className="">
                            <p id="citizen-det-p">Citizenship details</p>
                            <div className="share-apply-form1">
                              <div className="form-input-share">
                                <div>
                                  <label htmlFor="">Citizenship no.*</label>
                                </div>
                                <Field
                                  placeholder="Citizenship number"
                                  name={"citizenshipDetails.citizenshipNo"}
                                ></Field>
                                <ErrorMessage
                                  name={"citizenshipDetails.citizenshipNo"}
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>

                              <div className="form-input-share">
                                <div>
                                  <label htmlFor="">Citizenship Front*</label>
                                </div>

                                <div className="upload-btn-wrapper">
                                  <button className="ctzn-up-fi-btn">
                                    <div>
                                      <span id="spa-fi-up-p">
                                        {frontimagename}
                                      </span>
                                    </div>
                                    <div>
                                      {" "}
                                      <span>
                                        <i className="fas fa-upload"></i>
                                      </span>
                                    </div>
                                  </button>
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={(event) => (
                                      handleFrontCitizenshipChange(
                                        event,
                                        allvalues
                                      ),
                                      setfrontimage(event.target.files[0].name)
                                    )}
                                  />
                                </div>
                                {frontimagenames != null ? (
                                  <div className="ctzenshp-img-frame">
                                    <img
                                      src={frontimagenames}
                                      alt="citizenship img"
                                    />
                                  </div>
                                ) : null}

                                <ErrorMessage
                                  name="citizenshipDetails.citizenshipFrontImage"
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>

                              <div className="form-input-share">
                                <div>
                                  <label htmlFor="">Citizenship Back*</label>
                                </div>
                                <div className="upload-btn-wrapper">
                                  <button className="ctzn-up-fi-btn">
                                    <div>
                                      <span id="spa-fi-up-p">
                                        {backimagename}
                                      </span>
                                    </div>
                                    <div>
                                      {" "}
                                      <span>
                                        <i className="fas fa-upload"></i>
                                      </span>
                                    </div>
                                  </button>
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={(event) => (
                                      handleBackCitizenshipChange(
                                        event,
                                        allvalues
                                      ),
                                      setbackimage(event.target.files[0].name)
                                    )}
                                  />
                                </div>
                                {backimagenames != null ? (
                                  <div className="ctzenshp-img-frame">
                                    <img
                                      src={backimagenames}
                                      alt="citizenship img"
                                    />
                                  </div>
                                ) : null}
                                <ErrorMessage
                                  name={
                                    "citizenshipDetails.citizenshipBackImage"
                                  }
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>

                              <div className="form-input-share">
                                <div>
                                  <label htmlFor="">
                                    Marriage Certificate/ Migration Certificate
                                  </label>
                                </div>
                                <div className="upload-btn-wrapper">
                                  <button className="ctzn-up-fi-btn">
                                    <div>
                                      <span id="spa-fi-up-p">
                                        {marriageCertificate}
                                      </span>
                                    </div>
                                    <div>
                                      {" "}
                                      <span>
                                        <i className="fas fa-upload"></i>
                                      </span>
                                    </div>
                                  </button>
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={(event) => (
                                      handleMarriageCertificate(
                                        event,
                                        allvalues
                                      ),
                                      setmarriageCertificate(
                                        event.target.files[0].name
                                      )
                                    )}
                                  />
                                </div>
                                {marriageCertificates != null ? (
                                  <div className="ctzenshp-img-frame">
                                    <img
                                      src={marriageCertificates}
                                      alt="citizenship img"
                                    />
                                    {/* <button type="button" onClick={removeImage}>X</button> */}
                                  </div>
                                ) : null}
                                <ErrorMessage
                                  name={
                                    "citizenshipDetails.marriageCertificate"
                                  }
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>

                              <div className="form-input-share">
                                {/* <Select
                          options={district}
                          onChange={(value)=>handleDistrictChange(value,allvalues)}
                          /> */}

                                <div className="form-input-share react-select">
                                  <div>
                                    <label htmlFor="">
                                      Citizenship Issue district*
                                    </label>
                                  </div>
                                  <div className="form-select-tag">
                                    <Select
                                      options={issuedistrict}
                                      name="citizenshipDetails.citizenshipIssuedDistrictId"
                                      onChange={(value) =>
                                        handleDistrictchange(
                                          value,
                                          allvalues,
                                          "citizen"
                                        )
                                      }
                                    />
                                  </div>
                                  <ErrorMessage
                                    name={
                                      "citizenshipDetails.citizenshipIssuedDistrictId"
                                    }
                                    render={(msg) => (
                                      <div className="err-message">{msg}</div>
                                    )}
                                  ></ErrorMessage>
                                </div>
                              </div>

                              <div className="form-input-share">
                                <div>
                                  <label htmlFor="">Issue date*</label>
                                </div>
                                <Field
                                  placeholder="yyyy/mm/dd"
                                  name="citizenshipDetails.issudeDate"
                                ></Field>
                                <ErrorMessage
                                  name={"citizenshipDetails.issudeDate"}
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>
                              <div className="form-input-share">
                                <div>
                                  <label htmlFor="">Spouse Citizenship</label>
                                </div>
                                <div className="upload-btn-wrapper">
                                  <button className="ctzn-up-fi-btn">
                                    <div>
                                      <span id="spa-fi-up-p">
                                        {spousecertificate}
                                      </span>
                                    </div>
                                    <div>
                                      {" "}
                                      <span>
                                        <i className="fas fa-upload"></i>
                                      </span>
                                    </div>
                                  </button>
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={(event) => (
                                      handlespouseCertificate(event, allvalues),
                                      setspousecertificate(
                                        event.target.files[0].name
                                      )
                                    )}
                                  />
                                </div>
                                {spousecertificates != null ? (
                                  <div className="ctzenshp-img-frame">
                                    <img
                                      src={spousecertificates}
                                      alt="spouse citizenship img"
                                    />
                                    {/* <button type="button" onClick={removeImage}>X</button> */}
                                  </div>
                                ) : null}
                                <ErrorMessage
                                  name={"citizenshipDetails.spousecertificate"}
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>
                            </div>
                          </div>
                        )}

                        {isminor && (
                          <div className="">
                            <p id="citizen-det-p">Minor details</p>
                            <div className="share-apply-form1">
                              <div className="form-input-share">
                                <div>
                                  <label htmlFor="">Minor Id Number*</label>
                                </div>
                                <Field
                                  placeholder="Mainor Id Number"
                                  name={"mainorDetails.mainorIdNumber"}
                                ></Field>
                                <ErrorMessage
                                  name={"mainorDetails.mainorIdNumber"}
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>

                              <div className="form-input-share">
                                <div>
                                  <label htmlFor="">Minor Id</label>
                                </div>

                                <div className="upload-btn-wrapper">
                                  <button className="ctzn-up-fi-btn">
                                    <div>
                                      <span id="spa-fi-up-p">{minorid}</span>
                                    </div>
                                    <div>
                                      {" "}
                                      <span>
                                        <i className="fas fa-upload"></i>
                                      </span>
                                    </div>
                                  </button>
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={(event) => (
                                      handleMinorDocChange(event, allvalues),
                                      setminorid(event.target.files[0].name)
                                    )}
                                  />
                                </div>
                                {minorids != null ? (
                                  <div className="ctzenshp-img-frame">
                                    <img src={minorids} alt="citizenship img" />
                                  </div>
                                ) : null}

                                <ErrorMessage
                                  name="mainorDetails.birthCertificateImage"
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>

                              <div className="form-input-share">
                                <div>
                                  <label htmlFor="">
                                    Birth Certificate Issue date*
                                  </label>
                                </div>
                                <Field
                                  placeholder="yyyy/mm/dd"
                                  name="mainorDetails.birthCertificateIssueDate"
                                ></Field>
                                <ErrorMessage
                                  name={
                                    "mainorDetails.birthCertificateIssueDate"
                                  }
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>
                            </div>
                          </div>
                        )}
                      </Form>
                    </div>
                  </div>

                  {isminor && (
                    <div className="apply-share-form personal-info-form">
                      <div className="ipo-issued-brief iib-border-bottom">
                        <p id="ipo-issued-name">Guardian Details</p>
                      </div>
                      <div>
                        <Form>
                          <div className="share-apply-form1">
                            <div className="form-input-share">
                              <div>
                                <label htmlFor="">Guardian Name*</label>
                              </div>
                              <Field
                                placeholder="Gurdains Name"
                                name={"mainorDetails.guardianName"}
                              ></Field>
                              <ErrorMessage
                                name={"mainorDetails.guardianName"}
                                render={(msg) => (
                                  <div className="err-message">{msg}</div>
                                )}
                              ></ErrorMessage>
                            </div>
                            <div className="form-input-share">
                              <div>
                                <label htmlFor="">Relationship</label>
                              </div>
                              <Field
                                placeholder="Relationship"
                                name={"mainorDetails.guardianRelationship"}
                              ></Field>
                              <ErrorMessage
                                name={"mainorDetails.guardianRelationship"}
                                render={(msg) => (
                                  <div className="err-message">{msg}</div>
                                )}
                              ></ErrorMessage>
                            </div>

                            <div className="form-input-share">
                              <div>
                                <label htmlFor="">Citizenship no.*</label>
                              </div>
                              <Field
                                placeholder="Citizenship number"
                                name={"mainorDetails.guardianCitizenshipNumber"}
                              ></Field>
                              <ErrorMessage
                                name={"mainorDetails.guardianCitizenshipNumber"}
                                render={(msg) => (
                                  <div className="err-message">{msg}</div>
                                )}
                              ></ErrorMessage>
                            </div>

                            <div className="form-input-share">
                              <div>
                                <label htmlFor="">Citizenship Front*</label>
                              </div>

                              <div className="upload-btn-wrapper">
                                <button className="ctzn-up-fi-btn">
                                  <div>
                                    <span id="spa-fi-up-p">
                                      {frontimagename}
                                    </span>
                                  </div>
                                  <div>
                                    {" "}
                                    <span>
                                      <i className="fas fa-upload"></i>
                                    </span>
                                  </div>
                                </button>
                                <input
                                  type="file"
                                  name="image"
                                  onChange={(event) => (
                                    handleFrontCitizenshipChange(
                                      event,
                                      allvalues
                                    ),
                                    setfrontimage(event.target.files[0].name)
                                  )}
                                />
                              </div>
                              {frontimagenames != null ? (
                                <div className="ctzenshp-img-frame">
                                  <img
                                    src={frontimagenames}
                                    alt="citizenship img"
                                  />
                                </div>
                              ) : null}

                              <ErrorMessage
                                name="citizenshipDetails.citizenshipFrontImage"
                                render={(msg) => (
                                  <div className="err-message">{msg}</div>
                                )}
                              ></ErrorMessage>
                            </div>

                            <div className="form-input-share">
                              <div>
                                <label htmlFor="">Citizenship Back*</label>
                              </div>
                              <div className="upload-btn-wrapper">
                                <button className="ctzn-up-fi-btn">
                                  <div>
                                    <span id="spa-fi-up-p">
                                      {backimagename}
                                    </span>
                                  </div>
                                  <div>
                                    {" "}
                                    <span>
                                      <i className="fas fa-upload"></i>
                                    </span>
                                  </div>
                                </button>
                                <input
                                  type="file"
                                  name="image"
                                  onChange={(event) => (
                                    handleBackCitizenshipChange(
                                      event,
                                      allvalues
                                    ),
                                    setbackimage(event.target.files[0].name)
                                  )}
                                />
                              </div>
                              {backimagenames != null ? (
                                <div className="ctzenshp-img-frame">
                                  <img
                                    src={backimagenames}
                                    alt="citizenship img"
                                  />
                                </div>
                              ) : null}

                              <ErrorMessage
                                name={"citizenshipDetails.citizenshipBackImage"}
                                render={(msg) => (
                                  <div className="err-message">{msg}</div>
                                )}
                              ></ErrorMessage>
                            </div>

                            <div className="form-input-share">
                              {/* <Select
                          options={district}
                          onChange={(value)=>handleDistrictChange(value,allvalues)}
                          /> */}

                              <div className="form-input-share">
                                <div>
                                  <label htmlFor="">
                                    Citizenship Issue district*
                                  </label>
                                </div>
                                <div className="form-select-tag">
                                  <Select
                                    options={issuedistrict}
                                    name="mainorDetails.guardianCitizenshipIssuedDistrictId"
                                    onChange={(value) =>
                                      handleDistrictchange(
                                        value,
                                        allvalues,
                                        "gurdain"
                                      )
                                    }
                                  />
                                </div>
                                <ErrorMessage
                                  name={
                                    "mainorDetails.guardianCitizenshipIssuedDistrictId"
                                  }
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>
                            </div>

                            <div className="form-input-share">
                              <div>
                                <label htmlFor="">Issue date*</label>
                              </div>
                              <Field
                                placeholder="yyyy/mm/dd"
                                name="mainorDetails.guardianIssudeDate"
                              ></Field>
                              <ErrorMessage
                                name={"mainorDetails.guardianIssudeDate"}
                                render={(msg) => (
                                  <div className="err-message">{msg}</div>
                                )}
                              ></ErrorMessage>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  )}

                  {/* //////////////////////////////////////permanent address start /////////////////////////////////////////////////////////*/}

                  <div className="apply-share-form personal-info-form">
                    <div className="ipo-issued-brief iib-border-bottom">
                      <p id="ipo-issued-name">Permanent address</p>
                    </div>
                    <div>
                      <Form>
                        {/* <div className="isminor-checkbox">
                        <input type="checkbox" onChange={(event)=>handlePermanentAddressChange(event,allvalues)}/>
                        <label>Same as temporary address</label>
                      </div> */}
                        <div className="share-apply-form1">
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Province*</label>
                            </div>
                            <div className="form-select-tag">
                              <Select
                                options={province}
                                onChange={(value) =>
                                  handleprovincedata(value, allvalues)
                                }
                              />
                            </div>
                            <ErrorMessage
                              name={"permanentAddress.provience"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">District</label>
                            </div>
                            <div className="form-select-tag">
                              <Select
                                options={perdistrict}
                                onChange={(value) => muniper(value, allvalues)}
                              />
                            </div>
                            {/* <Field placeholder="Jhapa" name={"permanentAddress.district"}></Field> */}
                            <ErrorMessage
                              name={"permanentAddress.district"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Local municipality*</label>
                            </div>
                            <div className="form-select-tag">
                              <Select
                                options={municipality}
                                onChange={(value) =>
                                  handleMunicipalityChange(value, allvalues)
                                }
                              />
                            </div>
                            {/* <Field placeholder="Damak Nagarpalika" name={"permanentAddress.localMunicipality"}></Field> */}
                            <ErrorMessage
                              name={"permanentAddress.localMunicipality"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Ward</label>
                            </div>

                            <Field
                              placeholder="Ward"
                              name={"permanentAddress.wardNo"}
                              // style={{ marginTop: "-1px" }}
                            ></Field>

                            {/* <Field placeholder="06" name={"permanentAddress.wardNo"}></Field> */}
                            <ErrorMessage
                              name={"permanentAddress.wardNo"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Tole*</label>
                            </div>
                            <Field
                              placeholder="Mahabir tole"
                              name={"permanentAddress.tole"}
                            ></Field>
                            <ErrorMessage
                              name={"permanentAddress.tole"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                  {/* //////////////////////////////////////permanent address ended /////////////////////////////////////////////////////////*/}
                  {/* //////////////////////////////////////Temporary address start /////////////////////////////////////////////////////////*/}

                  <div className="apply-share-form personal-info-form">
                    <div className="ipo-issued-brief iib-border-bottom">
                      {/* <Checkbox onClick={handlecheckbox}>Same as above</Checkbox> */}
                      <p id="ipo-issued-name">Correspondence address</p>
                    </div>
                    <div>
                      <Form>
                        <div className="share-apply-form1">
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Province*</label>
                            </div>
                            <div className="form-select-tag">
                              <Select
                                options={tempprovince}
                                onChange={(value) =>
                                  handleprovincedatas(value, allvalues)
                                }
                              />
                            </div>
                            <ErrorMessage
                              name={"temporaryAddress.provience"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">District</label>
                            </div>
                            <div className="form-select-tag">
                              <Select
                                options={district}
                                onChange={(value) =>
                                  handleDistrictChanges(
                                    value,
                                    allvalues,
                                    "temporary"
                                  )
                                }
                              />
                            </div>
                            <ErrorMessage
                              name={"temporaryAddress.district"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Local municipality*</label>
                            </div>
                            <div className="form-select-tag">
                              <Select
                                options={newmunicipality}
                                onChange={(value) =>
                                  handleMunicipalityChanges(
                                    value,
                                    allvalues,
                                    "temporary"
                                  )
                                }
                              />{" "}
                            </div>
                            {/* {
                            municipalityAndWardNo.length? <input value={municipalityAndWardNo.municipilityname}></input>:<input placeholder="damak" disabled></input>
                          } */}

                            <ErrorMessage
                              name={"temporaryAddress.localMunicipality"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Ward</label>
                            </div>

                            <Field
                              placeholder="Ward"
                              name={"temporaryAddress.wardNo"}
                              // style={{ marginTop: "-1px" }}
                            ></Field>
                            {/* <Field placeholder="06" name={"temporaryAddress.wardNo"}></Field> */}
                            <ErrorMessage
                              name={"temporaryAddress.wardNo"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Tole*</label>
                            </div>
                            <Field
                              placeholder="Mahabir tole"
                              name={"temporaryAddress.tole"}
                            ></Field>
                            <ErrorMessage
                              name={"temporaryAddress.tole"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>

                  {/* //////////////////////////////////////Temporary address ended /////////////////////////////////////////////////////////*/}

                  {/* //////////////////////////////////////Account detail start /////////////////////////////////////////////////////////*/}
                  <div className="apply-share-form personal-info-form">
                    <div className="ipo-issued-brief iib-border-bottom">
                      <p id="ipo-issued-name">Account Detail</p>
                    </div>
                    <div>
                      <Form>
                        <div className="share-apply-form1">
                          <div className="form-input-share">
                            <label htmlFor="">Bank Name</label>
                            <div className="form-select-tag">
                              <Select
                                options={banklists}
                                // name="accountdetail.bankname"
                                onChange={(value) =>
                                  handleBankName(value, allvalues)
                                }
                              />
                            </div>
                            {/* <ErrorMessage
                              name={"accountdetail.bankname"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage> */}
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Branch Name</label>
                            </div>
                            <div className="form-select-tag">
                              <Select
                                options={branchnames}
                                // name="accountdetail.branchname"
                                onChange={(value) =>
                                  handleBankBranch(value, allvalues)
                                }
                              />
                            </div>
                            <ErrorMessage
                              name={"accountdetail.branchname"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>

                            {/* <Field
                          as="select"
                          name="branchname"
                          class="form-input"
                          onChange={(e) => setvaluebranch(e.target.value)}
                          value={valuebranch}
                        >

                          <option value="" style={{ display: "none" }}></option>
                          {branchnames.map((value) => (
                            <option>{value.branchName}</option>
                          ))}
                        </Field> */}
                            {/* <ErrorMessage name={"accountdetail.branchname"}render={(msg) => (
                                    <div className="err-message">
                                      {msg}
                                    </div>
                                  )}></ErrorMessage> */}
                            {/* <Select
                          options={district}
                          onChange={(value)=>handleDistrictChange(value,allvalues,"temporary")}
                          /> */}
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Account Type*</label>
                            </div>
                            <div className="form-select-tag">
                              <Select
                                options={accountTypeOption}
                                name="accountdetail.accountType"
                                onChange={(value) =>
                                  handleAccountType(value, allvalues)
                                }
                              />
                            </div>
                            <ErrorMessage
                              name={"accountdetail.accountType"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>

                            {/* <Field
                          as="select"
                          name="accountdetal.accountType"
                          class="form-input" required>
                          <option value="" style={{ display: "none" }}></option>
                          <option>Current</option><option>Saving</option>
                        </Field> */}
                            {/* <Select
                          options={municipality}
                          onChange={(value)=>handleMunicipalityChange(value,allvalues,"temporary")}
                          /> */}
                            {/* {
                            municipalityAndWardNo.length? <input value={municipalityAndWardNo.municipilityname}></input>:<input placeholder="damak" disabled></input>
                          } */}

                            {/* <ErrorMessage name={"accountdetail.accounttype"}render={(msg) => (

                                    <div className="err-message">
                                      {msg}
                                    </div>
                                  )}></ErrorMessage> */}
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Account No</label>
                            </div>
                            <Field
                              placeholder="Account No"
                              name={"accountdetail.accountNo"}
                              // style={{ marginTop: "-1px" }}
                            ></Field>
                            <ErrorMessage
                              name={"accountdetail.accountNo"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                  {/* //////////////////////////////////////Account detail Ended /////////////////////////////////////////////////////////*/}
                  {/* //////////////////////////////////////Share detail started /////////////////////////////////////////////////////////*/}
                  <div className="apply-share-form personal-info-form">
                    <div className="ipo-issued-brief iib-border-bottom">
                      <p id="ipo-issued-name">Share Details</p>
                    </div>
                    <div>
                      <Form>
                        <div className="share-apply-form1">
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Applied Kitta</label>
                            </div>
                            <Field name="kitta">
                              {() => {
                                return (
                                  <Field
                                    name="kitta"
                                    value={statekitta}
                                    disabled
                                  />
                                );
                              }}
                            </Field>
                            <ErrorMessage
                              name={"kitta"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage>
                            {appliedKitta && (
                              <div className="err-message">
                                Kitta Should be divisal of 10
                              </div>
                            )}

                            {minKitta && (
                              <div className="err-message">
                                Kitta Should be greater then{" "}
                                {userIpoDetails.ipoMetaDetails.minkitta}
                              </div>
                            )}

                            {maxKitta && (
                              <div className="err-message">
                                Kitta Should be less then{" "}
                                {userIpoDetails.ipoMetaDetails.maxkitta}
                              </div>
                            )}
                          </div>
                          <div className="form-input-share">
                            <div>
                              <label htmlFor="">Amount</label>
                            </div>
                            <Field
                              name={"amount"}
                              value={statetotal}
                              disabled
                            ></Field>
                          </div>
                        </div>

                        {/* <div className="pubform-next-but">
                            <button className="next-but-pubform" type="submit">
                              Submit
                            </button>
                            </div> */}
                      </Form>
                    </div>
                  </div>

                  <div className="input-gender">
                    <div className="apply-share-form personal-info-form">
                      <div className="ipo-issued-brief iib-border-bottom">
                        <p id="ipo-issued-name">BOID</p>
                      </div>
                      <div className="boid-main2">
                        <label htmlFor="">BOID Available</label>
                        <div className="boid-input-body">
                          <div className="input-gender2">
                            <div className="input-gen-radio1">
                              <input
                                type="radio"
                                className="radio-btnn"
                                name="personalDetailsgender"
                                onClick={() => handleboidy("yes")}
                              />
                              <label for="radio-btn">Yes</label>
                            </div>
                            <div className="input-gen-radio1">
                              <input
                                type="radio"
                                className="radio-btn"
                                name="personalDetailsgender"
                                onClick={() => handleboidy("no", allvalues)}
                              />
                              <label for="radio-btn">No</label>
                            </div>
                          </div>
                        </div>
                        {boidyes ? (
                          <div className="boid-input-body">
                            <div className="form-input-share">
                              <br />
                              <div>
                                <label htmlFor="">BOID</label>
                              </div>
                              <Field
                                placeholder="Your boid"
                                name={"personalDetails.boid"}
                                onChange={(e) => handleboidchanges(e)}
                                value={boidchange}
                              ></Field>
                              <ErrorMessage
                                name={"personalDetails.boid"}
                                render={(msg) => (
                                  <div className="err-message">{msg}</div>
                                )}
                              ></ErrorMessage>
                            </div>
                          </div>
                        ) : (
                          <div className="else-boid-content">
                            <p className="boid-label">Please Visit Branch</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* //////////////////////////////////////Share detail ended /////////////////////////////////////////////////////////*/}

                  <div className="apply-share-form personal-info-form">
                    <div className="ipo-issued-brief iib-border-bottom">
                      <p id="ipo-issued-name">Bank Slip Upload</p>
                    </div>
                    <div>
                      <Form>
                        <div className="share-apply-form1">
                          <div className="form-input-share">
                            <label htmlFor="">Type</label>
                            <div className="form-select-tag ">
                              <Field
                                as="select"
                                placeholder="Vehicle Type"
                                name="voucher.vouchertype"
                                className="form-input-voucher"
                                onClick={(e) => vouchertypes(e)}
                                //   value={voucherdata.status}
                              >
                                <option value="1">Cheque</option>
                                <option value="0">Cash</option>
                              </Field>
                            </div>
                            {/* <ErrorMessage
                              name={"voucher.vouchertype"}
                              render={(msg) => (
                                <div className="err-message">{msg}</div>
                              )}
                            ></ErrorMessage> */}
                          </div>

                          {paytype == "0" ? (
                            <>
                              <div className="form-input-share">
                                <div>
                                  <label>Transaction id</label>
                                </div>

                                <Field
                                  name="voucher.transactionid"
                                  // class="form-input"
                                  placeholder="Transaction id"
                                ></Field>
                                <ErrorMessage
                                  name={"voucher.transactionid"}
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="form-input-share">
                                <label>Bank name</label>
                                <div className="form-select-tag">
                                  <Select
                                    options={banklists}
                                    onChange={(value) =>
                                      voucherHandleBranchName(value, allvalues)
                                    }
                                    // value={displaybranch}
                                  />
                                </div>
                                <ErrorMessage
                                  name={"voucher.bankname"}
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>
                              <div className="form-input-share">
                                <div>
                                  <label>Branch name</label>
                                </div>
                                <div className="form-select-tag">
                                  <Select
                                    options={voucherBranch}
                                    // name="accountdetail.branchname"
                                    onChange={(value) =>
                                      handlevoucherbranch(value, allvalues)
                                    }
                                  />
                                </div>
                                <ErrorMessage
                                  name={"voucher.branchname"}
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>
                              <div className="form-input-share">
                                <div>
                                  <label>Cheque no</label>
                                </div>

                                <Field
                                  name="voucher.chequeno"
                                  // class="form-input"
                                  placeholder="chequeno"
                                ></Field>
                                <ErrorMessage
                                  name={"voucher.chequeno"}
                                  render={(msg) => (
                                    <div className="err-message">{msg}</div>
                                  )}
                                ></ErrorMessage>
                              </div>

                              {/* <br /> */}

                              {/* <input
                                  id="file"
                                  name="selectedImageOffer3"
                                  type="file"
                                  title=" "
                                  // onChange={(e) => { handleChangeIconImage(e);setFieldValue("Forms",imgname); }}
                                  onChange={(e) => handleChangeIconImage3(e)}
                                  className="form-control"
                                /> */}

                              {/* <Thumb file={values.file} /> */}
                              {/* {errors.voucher && touched.voucher ? (
                                <div className="error-message">
                                  {errors.voucher}
                                </div>
                              ) : null} */}
                            </>
                          )}
                          <div className="form-input-share">
                            <div>
                              <label for="file">Bank Slip upload</label>
                            </div>
                            <div className="upload-btn-wrapper">
                              <button className="ctzn-up-fi-btn">
                                <div>
                                  <span id="spa-fi-up-p">{voucherImage}</span>
                                </div>
                                <div>
                                  {" "}
                                  <span>
                                    <i className="fas fa-upload"></i>
                                  </span>
                                </div>
                              </button>
                              <input
                                type="file"
                                name="image"
                                onChange={(event) => (
                                  handleVoucherImage(event, allvalues),
                                  setVoucherImage(event.target.files[0].name)
                                )}
                              />
                            </div>

                            {voucheruploads != null ? (
                              <div className="ctzenshp-img-frame">
                                <img
                                  src={voucheruploads}
                                  alt="citizenship img"
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="pubform-next-but">
                          <button className="next-but-pubform" type="submit">
                            Submit
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
