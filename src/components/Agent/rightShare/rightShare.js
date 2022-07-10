import React, { useEffect, useState } from "react";
import { notify } from "../../../constants/notify";
import { ErrorMessage, Formik, isEmptyArray } from "formik";
import { Form, Field } from "formik";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import Select from "react-select";
import Logo from "../../../assests/images/logo.png";
import { red } from "@mui/material/colors";
import { httpClient } from "../../../constants/httpClient";
import "../agentIpoReports/style.css";
import { baseUrl } from "../../Base_api/baseapi";
import axios from 'axios'
import * as yup from "yup";
function Rightshare(props) {

  const baseurl = baseUrl;
  let ids = props.history.location.state;
  const[boidchange,setboidchange]=useState([])
  const[tempProvince,settempProvince]=useState([])
  const[tempdistrict,settempdistrict]=useState([])
  const[perdistrict,setperdistrict]=useState([])
  const[bank,setbank]=useState([])
  const[tempmunivalues,settempmunivalues]=useState()
  const[permunivalues,setpermunivalues]=useState()
  const[branch,setbranch]=useState([])
  const[banknamevalue,setbanknamevalue]=useState([])
  const[branchnamevalue,setbranchnamevalue]=useState([])
  const[accounttypevalue,setaccounttypevalue]=useState([])
  const[tempmunicipality,settempmunicipality]=useState([])
  const[permunicipality,setpermunicipality]=useState([])
  const[citizendistrictvalue,setcitizendistrictvalue]=useState([])
  const[voucherimage,setvoucherimage]=useState()
  const [frontimagenames, setfrontimages] = useState();
  const [backimagenames, setbackimages] = useState();
  const [voucher, setvoucher] = useState();
  const [frontimagename, setfrontimage] = useState("Front Side");
  const [backimagename, setbackimage] = useState("Back Side");
  const [vouchername, setvouchername] = useState("Voucher");
  const[citizendistrict,setcitizendistrict]=useState([])
  const[btndisable,setbtndisable]=useState(true)
  const[right,setright]=useState({
      kitta:'',
      total:'',
  })
  const [details, setdetails] = useState({
    kitta: "",
    amount: "",

    isMinor: "",
    applicantname: "",
    boid: "",
    phoneNumber: "",
    email: "",
    name: "",
    grandfatherName: "",
    fatherName: "",
    panNo: "",

voucher:"",
    citizenshipDetails: {
    
      citizenshipNo: "",
      citizenshipIssuedDistrictId: "",
      issudeDate: "",
    },
  
    temporaryAddress: {
      provience: "",
      district: "",
      localMunicipality: "",
      wardNo: "",
      tole: "",
    },
    permanentAddress: {
      provience: "",
      district: "",
      localMunicipality: "",
      wardNo: "",
      tole: "",
    },

    bankname: "",
    branchname: "",
    accountType: "",
    accountNo: "",

  });
  useEffect(() => {
    handleswal();
    handleBank();
    citizenshipDistrict()
    handletempProvince();
  }, []);
  const handleswal = () => {
    httpClient
      .GET(`api/applicant/get-all-by-id/${ids}`, false, true)
      .then((res) => {
        let datas = res.data.data;
        setdetails({
          kitta: datas.kitta,
          amount: datas.price,
          isMinor: datas.isminor,
          name: "",
          boid: datas.boid,
          phoneNumber: datas.mobileno,
          email: datas.email,
          name: datas.name,
          grandfatherName: datas.granfathername,
          fatherName: datas.fathername,
          panNo: datas.panno,
          citizenshipNo: datas.citizenshipDetails.citizenshipnumber,
          citizenshipFrontImage: datas.citizenshipDetails.citizenshipfrontimage,
          citizenshipBackImage: datas.citizenshipDetails.citizenshipbackimage,
          citizenshipIssuedDistrictId:
            datas.citizenshipDetails.citizenshipissuedistrict,
          issudeDate: datas.citizenshipDetails.citizenshipissuedate,

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

          provience: datas.permanentAddress.state,
          district: datas.permanentAddress.district,
          localMunicipality: datas.permanentAddress.municipility,
          wardNo: datas.permanentAddress.ward,
          tole: datas.permanentAddress.tole,

          bankname: datas.bankname,
          branchname: datas.branchname,
          accountType: datas.accounttype,
          accountNo: datas.accountno,

          temporaryAddress: {
            provience: datas.temporaryAddress.state,
            district: datas.temporaryAddress.district,
            localMunicipality: datas.temporaryAddress.municipility,
            wardNo: datas.temporaryAddress.ward,
            tole: datas.temporaryAddress.tole,
          },
        });
      });
    props.history.push("/Rightshare", details);
  };
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
        
        let datas=resp.data.data;
        var conversion = JSON.stringify({datas});
        
        if(Object.keys(datas).length === 0){
            setright({
                kitta:0,
                total:0,
            })
            setbtndisable(true)
        }
        else{
            setright({
                kitta:resp.data.data.issueright,
                total:resp.data.data.totalkitta,
            })
            setbtndisable(false)
        }
      })
      .catch((err) => {
        
      });
  };

const handletempProvince=()=>{
  httpClient.GET('api/state/get-all',false,true)
  .then((res)=>{
    let data = res.data.data;
    let finalvalue = data.map((item, index) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    settempProvince(finalvalue)
    
  })
  .catch((err)=>{
    
  })
}
const handleBank=()=>{
  axios
      .get("https://backend.prabhucapital.com/api/v1/public/bank-data")
      .then((res) => {
        let datas = res.data.data.list.map((values) => {
          return {
            value: values.bank,
            label: values.bank,
          };
        });
      setbank(datas)
    
  })
  .catch((err)=>{
    
  })
}
const handleBankBranch = (value, allValues) => {
  let updatedString=''
  if(value.value.includes('&')){
      updatedString=value.value.replace('&',"%26");
  }
  else{
    updatedString=value.value
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
      setbranch(finalvalue);
    });
    setbanknamevalue(value.value)
  // return allValues.setFieldValue("voucher.bankname", value.value);
};

const handleBranch=(value)=>{
  setbranchnamevalue(value.value)
}

const handledistrictdata = (value, allvalue) => {
  
  let data={
   districtId:value.value,
  }
  httpClient.POST('api/municipality/get-all',data,false,true,'data')
  .then((res)=>{
    let finaldata=res.data.data.map((item)=>{
return{
        value:item.id,
      label:item.name,
}
    })
    settempmunicipality(finaldata)
  })
  .catch((err)=>{
    
  })
};
const handleperdistrictdata = (value, allvalue) => {
  
  let data={
   districtId:value.value,
  }
  httpClient.POST('api/municipality/get-all',data,false,true,'data')
  .then((res)=>{
    let finaldata=res.data.data.map((item)=>{
return{
        value:item.id,
      label:item.name,
}
    })
    setpermunicipality(finaldata)
  })
  .catch((err)=>{
    
  })
};

const handleprovincedata = (value, allvalue) => {
  
  let data={
   stateId:value.value,
  }
  httpClient.POST('api/district/state/get-all',data,false,true,'data')
  .then((res)=>{
    let finaldata=res.data.data.map((item)=>{
return{
        value:item.id,
      label:item.name,
}
    })
    settempdistrict(finaldata)
  })
  .catch((err)=>{
    
  })
  
};
const handleperprovincedata = (value, allvalue) => {
  
  let data={
   stateId:value.value,
  }
  httpClient.POST('api/district/state/get-all',data,false,true,'data')
  .then((res)=>{
    let finaldata=res.data.data.map((item)=>{
return{
        value:item.id,
      label:item.name,
}
    })
    setperdistrict(finaldata)
  })
  .catch((err)=>{
    
  })
  
};
const accounttype = [
  { value: "current", label: "Current" },
  { value: "saving", label: "Saving" },
];
const citizenshipDistrict=()=>{
  httpClient.GET('api/district/get-all',false,true)
  .then((res)=>{
    
    let finaldata=res.data.data.map((item)=>{
      return{
        value:item.id,
        label:item.name,
      }
    })
    setcitizendistrict(finaldata)
  })
}
const handleAccounttype=(value)=>{
  setaccounttypevalue(value.value)
}

let schema = yup.object().shape({
  personalDetails: yup.object().shape({
    name: yup.string().required("Name is required"),
    boid: yup
      .string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(16, "Number must be exactly 16 digits")
      .max(16, "Number   must be exactly 16 digits"),
    phonenumber: yup
      .string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Number must be exactly 10 digits")
      .max(10, "Number   must be exactly 10 digits")
      .required("Phone number is required."),
    email: yup.string().email("Must be a valid email"),
    grandfatherName: yup.string().required("Grandfather name is required"),
    fatherName: yup.string().required("Father name is required"),
  }),

  citizenshipDetails: yup.object().shape({
      citizenshipNo: yup.string().required("Citizenship number is required"),
      citizenshipissuedistrict: yup.string().required("Issue district is required"),
      issuedate: yup.string().required("Issue date is required"),

      // birthCertificateIssueDate:yup.string().required("Birth Certificate Issue Date is required"),
      // birthCertificateImage:yup.string().required("Birth Certificate Issue Date is required"),

    }),

  kitta: yup.string().required("Applied Kitta is required"),

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

  
  accountdetail: yup.object().shape({
    bankname: yup.string().required("Bank Name is required"),
    branchname: yup.string().required("Branch Name is required"),
    accountNo: yup.string().required("Account no is required"),
    accountType: yup.string().required("Account Type required"),
  }),
  permanentAddress: yup.object().shape({
    district: yup.string().required("District is required"),
    municipality: yup
      .string()
      .required("Local municipality is required"),
    wardno: yup.string().required("Ward no is required"),
    tole: yup.string().required("Tole is required"),
  }),
  temporaryAddress: yup.object().shape({
    district: yup.string().required("District is required"),
    municipality: yup
      .string()
      .required("Local municipality is required"),
    wardno: yup.string().required("Ward no is required"),
    tole: yup.string().required("Tole is required"),
  }),

});
const handleFrontCitizenshipChange = (event, allvalues) => {
  allvalues.setFieldValue(
    "frontside",
    event.target.files[0]
  );
  setfrontimages(URL.createObjectURL(event.target.files[0]));
};
const handleBackCitizenshipChange = (event, allvalues) => {
  allvalues.setFieldValue(
    "backside",
    event.target.files[0]
  );
  setbackimages(URL.createObjectURL(event.target.files[0]));
};
const handleVoucher = (event, allvalues) => {
  allvalues.setFieldValue(
    "voucher",
    event.target.files[0]
  );
  setvoucherimage(URL.createObjectURL(event.target.files[0]));
};
const handleCitizendistrict=(value,allValues)=>{
  
  setcitizendistrictvalue(value.value)
}
const handletempmunivalue=(value)=>{
  settempmunivalues(value.value);

}
const handlepermunivalue=(value)=>{
  setpermunivalues(value.value);

}
const token = localStorage.getItem("dm-access_token");
  return (
    <div className="container printable-area" style={{ margin: "10px" }}>
      <div className="apply-for-issue1-1">
        
        {/* p
                    e
                    r
                    s
                    o
                    n
                    a
                    l Detal form here           */}

        <Formik
          enableReinitialize
          initialValues={details}
          onSubmit={async (values) => {
            
            let datas={

              name : values.name,
    boid : boidchange,
    phoneno : values.phonenumber,
    email : values.email,
    grandfathername : values.grandfatherName,
    fathername : values.fatherName,
    panno : values.panNo,


    citizenshipNo : values.citizenshipNo,
    citizenshipdistrict : citizendistrictvalue,
    citizenshipdate : values.citizenshipDetails.issuedate,


    perWard : values.permanentAddress.wardno,
    perTole : values.tole,
    tempWard : values.temporaryAddress.wardno,
    tempTole : values.temporaryAddress.tole,
    tempmuni :tempmunivalues,
    permuni :permunivalues,


  bankName : banknamevalue,
    branchName : branchnamevalue,
    accounttype : accounttypevalue,
    accountno : values.accountno,
    

    appliedQuantity : right.kitta,
    price : right.total,
    
    
    // Address Details
    
            }
            httpClient
            .UPLOADRIGHT(
              "POST",
              "api/applicant/create/right-share",
              datas,
              values.frontside,
              values.backside,
              values.voucher,
              { headers: { Authorization: `Bearer ${token}` } }
            )  
            // httpClient.POST('POST','api/applicant/create/right-share',datas,false,true,'datas')
            .then((Res)=>{
              
            })
            
          }}
          // validationSchema={schema}
        >
          {(allvalues, setFieldValue) => (
            <Form autocomplete="off" novalidate className="changepasswordBody">
          <>
            <div className="apply-share-form personal-info-form">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">Personal Details</p>
              </div>
              <div>
                <Form>
                  {details.isMinor ? (
                    <div className="isminor-checkbox">
                      {/* <input type="checkbox" /> */}
                      <Checkbox
                        // onChange={(event) =>
                        //   handleMinorChange(event, allvalues)
                        // }
                        // {...label}
                        sx={{
                          color: red[800],
                          "&.Mui-checked": {
                            color: red[600],
                          },
                        }}
                        checked
                      />
                      <label>Is minor?</label>
                    </div>
                  ) : null}
                  <div className="share-apply-form1">
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Applicant name*</label>
                      </div>
                      <Field
                        
                        // value={popupdata.}
                        placeholder="Name"
                        name="name"
                      ></Field>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">BOID</label>
                      </div>
                      <Field
                        placeholder="Your boid"
                        name="boid"
                        onChange={(e)=>handleboidchange(e)}
                        value={boidchange}
                      ></Field>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Phone number*</label>
                      </div>
                      <Field
                        
                        placeholder="Mobile number"
                        name="phonenumber"
                      ></Field>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Email address</label>
                      </div>
                      <Field
                        
                        placeholder="mail@gmail.com"
                        name="email"
                      ></Field>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Grandfather name*</label>
                      </div>
                      <Field
                        
                        placeholder="Full name"
                        name="grandfatherName"
                      ></Field>
                      <ErrorMessage
                        name={"grandfatherName"}
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
                        name="fatherName"
                      ></Field>
                      <ErrorMessage
                        name={"fatherName"}
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
                        name="panNo"
                      ></Field>
                    </div>
                  </div>
                  {/* {!isminor && ( */}

                  {/* )} */}
                  {/* {isminor && ( */}

                  {/* )} */}
                </Form>
              </div>
            </div>
            <div className="apply-share-form personal-info-form">
              <div className="">
                <p id="citizen-det-p">Citizenship details</p>
                <div className="share-apply-form1">
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Citizenship no.*</label>
                    </div>
                    <Field
                      
                      placeholder="Citizenship number"
                      name="citizenshipNo"
                    ></Field>
                    <ErrorMessage
                      name="citizenshipDetails.citizenshipNo"
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>

                  

                  <div className="form-input-share">
                    {/* <Field
                            options={district}
                            onChange={(value)=>handleDistrictChange(value,allvalues)}
                            /> */}

                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Citizenship Issue district*</label>
                      </div>
                      <Select
                      name="citizenshipDetails.citizenshipissuedistrict"
options={citizendistrict}
onChange={(value) =>
  handleCitizendistrict(value, allvalues)
}

                      />

                      {/* <ErrorMessage
                                    name={
                                      "citizenshipIssuedDistrictId"
                                    }
                                    render={(msg) => (
                                      <div className="err-message">{msg}</div>
                                    )}
                                  ></ErrorMessage> */}
                    </div>
                  </div>

                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Issue date*</label>
                    </div>
                    <Field
                      
                      placeholder="yyyy/mm/dd"
                      name="citizenshipDetails.issuedate"
                    ></Field>
                    <ErrorMessage
                      name={"issudeDate"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>
                </div>
              </div>{" "}
            </div>
            {/* //////////////////////////Minor Details///////////////////////////////////// */}

            {/* //////////////////////////Minor Guardian Details Ended///////////////////////////////////// */}
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
                      <Select
                                options={tempProvince}
                                onChange={(value) =>
                                  handleperprovincedata(value)
                                }
                              />
                      <ErrorMessage
                        name={"provience"}
                        render={(msg) => (
                          <div className="err-message">{msg}</div>
                        )}
                      ></ErrorMessage>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">District</label>
                      </div>
                      <Select
                    name="temporaryAddress.district"
                                options={perdistrict}
                                onChange={(value) =>
                                  handleperdistrictdata(value)
                                }
                              />
                      {/* <Field placeholder="Jhapa" name={"district"}></Field> */}
                      <ErrorMessage
                        name={"district"}
                        render={(msg) => (
                          <div className="err-message">{msg}</div>
                        )}
                      ></ErrorMessage>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Local municipality*</label>
                      </div>
                      <Select
                    name="municipality"
                                options={permunicipality}
                                onChange={(value) =>
                                  handlepermunivalue(value)
                                }
                              />
                      {/* <Field placeholder="Damak Nagarpalika" name={"localMunicipality"}></Field> */}
                      <ErrorMessage
                        name={"localMunicipality"}
                        render={(msg) => (
                          <div className="err-message">{msg}</div>
                        )}
                      ></ErrorMessage>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Ward</label>
                      </div>

                      <Field  name="permanentAddress.wardno"></Field>
                      {/* <Field placeholder="06" name={"wardNo"}></Field> */}
                      <ErrorMessage
                        name={"wardNo"}
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
                        name={"tole"}
                      ></Field>
                      <ErrorMessage
                        name={"tole"}
                        render={(msg) => (
                          <div className="err-message">{msg}</div>
                        )}
                      ></ErrorMessage>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            {/* )} */}
            {/* //////////////////////////////////////Temporary address start /////////////////////////////////////////////////////////*/}
            <div className="apply-share-form personal-info-form">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">Temporary address</p>
              </div>
              <Form>
                <div className="share-apply-form1">
                  <div className="form-input-share">
                    <div>
                    <label htmlFor="">Province</label>
                    <Select
                                options={tempProvince}
                                onChange={(value) =>
                                  handleprovincedata(value)
                                }
                              />
                    </div>

                    <ErrorMessage
                      name={"temporaryAddress.provience"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">District</label>
                    </div>
                    <Select
                    name="temporaryAddress.district"
                                options={tempdistrict}
                                onChange={(value) =>
                                  handledistrictdata(value)
                                }
                              />
                    
                    <ErrorMessage
                      name={"temporaryAddress.district"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Local municipality*</label>
                    </div>
                    <Select
                    name="temporaryAddress.municipality"
                                options={tempmunicipality}
                                onChange={(value) =>
                                  handletempmunivalue(value)
                                }
                              />
                    {/* {
                              municipalityAndWardNo.length? <input value={municipalityAndWardNo.municipilityname}></input>:<input placeholder="damak" ></input>
                            } */}

                    <ErrorMessage
                      name={"temporaryAddress.localMunicipality"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Ward</label>
                    </div>

                    <Field
                      
                      placeholder="Ward"
                      name={"temporaryAddress.wardno"}
                    ></Field>
                    {/* <Field placeholder="06" name={"temporaryAddress.wardNo"}></Field> */}
                    <ErrorMessage
                      name={"temporaryAddress.wardNo"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Tole*</label>
                    </div>
                    <Field
                      
                      placeholder="Mahabir tole"
                      name="temporaryAddress.tole"
                    ></Field>
                    <ErrorMessage
                      name={"temporaryAddress.tole"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>
                </div>

                {/* //////////////////////////////////////Temporary address ended /////////////////////////////////////////////////////////*/}
              </Form>
            </div>
            <div className="apply-share-form personal-info-form">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">Account Detail</p>
              </div>
              <div>
                <div className="share-apply-form1">
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Bank Name</label>
                    </div>

                    <Select
                    options={bank}
                    name="bankname"
                    onChange={(value,allvalues) =>
                     handleBankBranch(value,allvalues)
                    }
                    />

                    <ErrorMessage
                      name={"bankname"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Branch Name</label>
                    </div>

                    <Select
                    options={branch}
                    name="branchname"
                    onChange={(value) =>
                      handleBranch(value)
                     }
                    />
                    <ErrorMessage
                      name={"branchname"}
                      render={(msg) => <div className="err-message">{msg}</div>}
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
                    {/* <ErrorMessage name={"branchname"}render={(msg) => (
                                      <div className="err-message">
                                        {msg}
                                      </div>
                                    )}></ErrorMessage> */}
                    {/* <Field
                            options={district}
                            onChange={(value)=>handleDistrictChange(value,allvalues,"temporary")}
                            /> */}
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Account Type*</label>
                    </div>
                    <Select
                    options={accounttype}
                    name="accountType"
                    onChange={(value) =>
                      handleAccounttype(value)
                     }
                    />

                    <ErrorMessage
                      name={"accountType"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>

                    {/* <Field
                            as="select"
                            name="accountdetal.accountType"
                            class="form-input" required>
                            <option value="" style={{ display: "none" }}></option>
                            <option>Current</option><option>Saving</option>
                          </Field> */}
                    {/* <Field
                            options={municipality}
                            onChange={(value)=>handleMunicipalityChange(value,allvalues,"temporary")}
                            /> */}
                    {/* {
                              municipalityAndWardNo.length? <input value={municipalityAndWardNo.municipilityname}></input>:<input placeholder="damak" ></input>
                            } */}

                    {/* <ErrorMessage name={"accounttype"}render={(msg) => (
  
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
                      name={"accountno"}
                    ></Field>
                    <ErrorMessage
                      name={"accountNo"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>
                </div>
              </div>
            </div>
            <div className="apply-share-form personal-info-form ">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">Share Details</p>
              </div>
              <div>
                <div className="share-apply-form1">
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Applied Kitta</label>
                    </div>
                    <Field name="kitta">
                      {() => {
                        return <Field  name="kitta" value={right.kitta} disabled/>;
                      }}
                    </Field>
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Amount</label>
                    </div>
                    <Field  name={"amount"} value={right.total} disabled></Field>
                  </div>
                </div>
              </div>
            </div>
            <div className="apply-share-form personal-info-form ">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">Upload Files</p>
              </div>
              <div className="share-apply-form1">
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
                                  <label htmlFor="">voucher*</label>
                                </div>
                                <div className="upload-btn-wrapper">
                                  <button className="ctzn-up-fi-btn">
                                    <div>
                                      <span id="spa-fi-up-p">
                                        {vouchername}
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
                                      handleVoucher(
                                        event,
                                        allvalues
                                      ),
                                      setvouchername(event.target.files[0].name)
                                    )}
                                  />
                                </div>
                                {voucherimage != null ? (
                                  <div className="ctzenshp-img-frame">
                                    <img
                                      src={voucherimage}
                                      alt="voucher img"
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
              </div>
            </div>
            <button className="print-btn" 
        type="submit"
        // disabled={btndisable?true:false}
        
        >
          Print
        </button>
            
          </>
          </Form>
           )} 
        </Formik>
        
      </div>
    </div>
  );
}

export default Rightshare;
