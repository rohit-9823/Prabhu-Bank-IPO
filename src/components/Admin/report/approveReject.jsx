import React, { useEffect, useState } from "react";
import { notify } from "../../../constants/notify";
import { ErrorMessage, Formik } from "formik";
import { Form, Field } from "formik";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import Select from "react-select";
import { red } from "@mui/material/colors";
import { httpClient } from "../../../constants/httpClient";
import "./style.css";
import { baseUrl } from "../../Base_api/baseapi";
function Approvereject(props) {
  const baseurl = baseUrl;
  const [frontimagename,setfrontimagename] = useState("")
  const [imagefront,setimagefront] = useState("")
  let ids = props.history.location.state;
  let value = '';

  const [details, setdetails] = useState({
    kitta: "",
    amount: "",

    isMinor: "",
    name: "",
    boid: "",
    ipoapplyid:"",
    phoneNumber: "",
    email: "",
    name: "",
    grandfatherName: "",
    fatherName: "",
    panNo: "",
    
      citizenshipFrontImage: "",
      citizenshipNo: "",
      citizenshipBackImage: "",
      citizenshipIssuedDistrictId: "",
      issudeDate: "",
    
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

    bankname: "",
    branchname: "",
    accountType: "",
    accountNo: "",

    provience: "",
    district: "",
    localMunicipality: "",
    wardNo: "",
    tole: "",
  });
  useEffect(() => {
    handleswal();
    handleimage();
  }, []);

  const handlefrontimage = (e, value, type) => {
    
    new Swal({
      title: "Citizenship Back Image!",
      imageUrl:`http://202.51.74.219:8093/api/applicant/download/${value}/${details.citizenshipFrontImage}`,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      animation: false,
    });
    
  };
  const handlebackimage = (e, value, type) => {
    
    new Swal({
      title: "Citizenship Back Image!",
      imageUrl:`http://202.51.74.219:8093/api/applicant/download/${value}/${details.citizenshipBackImage}`,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      animation: false,
    });
    
  };

  const handleapprove=()=>{
Swal.fire({
    title: 'Approve',
    title: `Are you sure you want to approve?`,
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
  }).then((result) => {
    if (result.isConfirmed) {
    let id={
        type:'approved',
        id:details.ipoapplyid,
    }
    httpClient.POST("api/applicant/change/ipo-apply/status",id,false,true,"id")
    .then((res)=>{
    
    Swal.fire(
        'SuccessFull',
        `${res.data.message}`
      )
    })
    props.history.push('/summaryreport')
    }
  })
  }
  const handlereject=()=>{
      
    Swal.fire({
        title: 'Reject',
        title: `Are you sure you want to Reject?`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
        let id={
            type:'rejected',
            id:details.ipoapplyid,
        }
        httpClient.POST("api/applicant/change/ipo-apply/status",id,false,true,"id")
        .then((res)=>{
        Swal.fire(
            'SuccessFull',
            `${res.data.message}`
          )
        })
        props.history.push('/summaryreport')
        }
      })
    
  }
  let name=""
  const handleswal = () => {
    httpClient
      .GET(`api/applicant/get-all-by-id/${ids}`, false, true)
      .then((res) => {
        
        let datas = res.data.data;
        value=res.data.data.citizenshipDetails.citizenshipfrontimage;
        httpClient.GET(`api/applicant/download/CF/${value}`,false,true)
        .then((res)=>{
          setimagefront(res)

        })
        name=(res.data.data.citizenshipDetails.citizenshipfrontimage)

        setdetails({
          kitta: datas.kitta,
          amount: datas.price,
          isMinor: datas.isminor,
          name: "",
          boid: datas.boid,
          phoneNumber: datas.mobileno,
          ipoapplyid: datas.ipoapplyid,
          email: datas.email,
          name: datas.name,
          grandfatherName: datas.granfathername,
          fatherName: datas.fathername,
          panNo: datas.panno,

          citizenshipNo: datas.citizenshipDetails.citizenshipnumber,
          citizenshipFrontImage: datas.citizenshipDetails.citizenshipfrontimage,
          citizenshipBackImage: datas.citizenshipDetails.citizenshipbackimage,        
          citizenshipIssuedDistrictId: datas.citizenshipDetails.citizenshipissuedistrict,
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
    // props.history.push("/viewapplyipo", details);
  };


  const handleimage=()=>{
    
      
      
  }


  return (
    <div className="container printable-area" style={{ margin: "10px" }}>
      <div className="apply-for-issue1-1">
        {/* <div className="apply-share-form">
                  <div className="ipo-issued-brief iib-border-bottom">
                    <p id="ipo-issued-name">
                      IPO comp
                      <span id="ipoissued-p-ipo">ipo</span>
                      <span id="ipoissued-share-type">ipotype</span>
                    </p>
                  </div>
                  <div>
                    <form>
                      <div className="share-apply-form1">
                        <div className="form-input-share">
                          <div>
                            <label htmlFor="">Issue Manager</label>
                          </div>
                          <input disabled ></input>
                        </div>
                        <div className="form-input-share">
                          <div>
                            <label htmlFor="">Issue open date</label>
                          </div>
                          <input disabled></input>
                        </div>
                        <div className="form-input-share">
                          <div>
                            <label htmlFor="">Issue close date</label>
                          </div>
                          <input disabled ></input>
                        </div>
                        <div className="form-input-share">
                          <div>
                            <label htmlFor="">Number of share issued</label>
                          </div>
                          <input disabled ></input>
                        </div>
                        <div className="form-input-share">
                          <div>
                            <label htmlFor="">Price per share</label>
                          </div>
                          <input disabled ></input>
                        </div>
                        <div className="form-input-share">
                          <div>
                            <label htmlFor="">Prospectus</label>
                          </div>
                          <button
                            disabled
                            // onClick={(e) =>
                            //   handleDownload(e, ipoInfo.prospectus, "prospectus")
                            // }
                          >
                            View prospectus
                          </button>
                        </div>
                        <div className="form-input-share">
                          <div>
                            <label htmlFor="">Offer letter</label>
                          </div>
                          <button
                            disabled
                            // onClick={(e) =>
                            //   handleDownload(
                            //     e,
                            //     ipoInfo.offerletter,
                            //     "offerLetter"
                            //   )
                            // }
                          >
                            View offer letter
                          </button>{" "}
                        </div>
                        <div className="form-input-share">
                          <div>
                            <label htmlFor="">Form</label>
                          </div>
                          <button
                            disabled
                            // onClick={(e) =>
                            //   handleDownload(e, ipoInfo.form, "form")
                            // }
                          >
                            View forms
                          </button>{" "}
                        </div>
                      </div>
                    </form>
                  </div>
                </div> */}

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
          // onSubmit={handleSubmit1}
          // validationSchema={schema}
        >
          {/* {(allvalues, setFieldValue) => ( */}
          <>
            <div className="apply-share-form personal-info-form">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">Personal Details</p>
              </div>
              <div>
                <Form>
                    {details.isMinor?
                  <div className="isminor-checkbox">
                    {/* <input type="checkbox" /> */}
                    <Checkbox
                    // onChange={(event) =>
                    //   handleMinorChange(event, allvalues)
                    // }
                    // {...label}
                    checked
                    sx={{
                      color: red[800],
                      "&.Mui-checked": {
                      color: red[600],
                      },
                    }}
                    />
                    <label>Is minor?</label>
                  </div>:null
}
                  <div className="share-apply-form1">
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Applicant name*</label>
                      </div>
                      <Field
                        disabled
                        // value={popupdata.}
                        name="name"
                      ></Field>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">BOID</label>
                      </div>
                      <Field
                        disabled
                        placeholder="Your boid"
                        name="boid"
                      ></Field>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Phone number*</label>
                      </div>
                      <Field
                        disabled
                        placeholder="Mobile number"
                        name={"phoneNumber"}
                      ></Field>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Email address</label>
                      </div>
                      <Field
                        disabled
                        placeholder="mail@gmail.com"
                        name={"email"}
                      ></Field>
                    </div>
                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Grandfather name*</label>
                      </div>
                      <Field
                        disabled
                        placeholder="Full name"
                        name={"grandfatherName"}
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
                        disabled
                        placeholder="Full name"
                        name={"fatherName"}
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
                        disabled
                        placeholder="pan no."
                        name={"panNo"}
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
                      disabled
                      placeholder="Citizenship number"
                      name={"citizenshipNo"}
                    ></Field>
                    <ErrorMessage
                      name={"citizenshipNo"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>

                  {/* <div className="form-input-share">
                    <div>
                      <label htmlFor="">Citizenship Front*</label>
                    </div>

                    <div className="upload-btn-wrapper">
                      <button
                        
                        onClick={(e) => {
                          handlefrontimage(e,'CF',"back")
                          
                        }}
                        // onClick={(e) =>
                        //   handleDownload(e, ipoInfo.prospectus, "prospectus")
                        // }
                      >
                        View Image
                      </button>
                    </div>
                  </div>

                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Citizenship Back*</label>
                    </div>
                    <div className="upload-btn-wrapper">
                      <button
                        // onClick={handleshowpic("CB")}
                        onClick={(e) => {
                          
                          handlebackimage(e,'CB',"back")
                          
                        }}
                      >
                        //<img src={details.citizenshipFrontImage} alt="" />
                        View Image
                      </button>
                    </div>
                  </div> */}

                  <div className="form-input-share">
                    {/* <Field
                            options={district}
                            onChange={(value)=>handleDistrictChange(value,allvalues)}
                            /> */}

                    <div className="form-input-share">
                      <div>
                        <label htmlFor="">Citizenship Issue district*</label>
                      </div>
                      <Field
                        disabled
                        // options={issuedistrict}
                        name="citizenshipIssuedDistrictId"
                        // onChange={(value) =>
                        //   handleDistrictchange(
                        //     value,
                        //     allvalues,
                        //     "citizen"
                        //   )
                        // }
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
                      disabled
                      placeholder="yyyy/mm/dd"
                      name="issudeDate"
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

                      <Field
                        disabled
                        // options={province}
                        // onChange={(value) =>
                        //   handleprovincedata(value, allvalues)
                        // }
                        name={"provience"}
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
                      <Field
                        disabled
                        // options={district}
                        // onChange={(value) =>
                        name={"district"}
                        //   handleDistrictChange(value, allvalues)
                        // }
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
                      <Field
                        disabled
                        name={"localMunicipality"}
                        // options={municipality}
                        // onChange={(value) =>
                        //   handleMunicipalityChange(value, allvalues)
                        // }
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

                      <Field disabled name="wardNo"></Field>
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
                        disabled
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
                <p id="ipo-issued-name">Correspondence address</p>
              </div>
              <Form>
                <div className="share-apply-form1">
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Province*</label>
                    </div>
                    <Field
                      disabled
                      name={"temporaryAddress.provience"}
                      // options={province}
                      // onChange={(value) =>
                      //   handleprovincedata(value, allvalues)
                      // }
                    />
                    <ErrorMessage
                      name={"temporaryAddress.provience"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">District</label>
                    </div>
                    <Field
                      disabled
                      // options={district}
                      // onChange={(value) =>
                      //   handleDistrictChange(
                      //     value,
                      //     allvalues,
                      //     "temporary"
                      name={"temporaryAddress.district"}
                      //   )
                      // }
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
                    <Field
                      disabled
                      name={"temporaryAddress.localMunicipality"}
                      // options={municipality}
                      // onChange={(value) =>
                      //   handleMunicipalityChange(
                      //     value,
                      //     allvalues,
                      //     "temporary"
                      //   )
                      // }
                    />
                    {/* {
                              municipalityAndWardNo.length? <input value={municipalityAndWardNo.municipilityname}></input>:<input placeholder="damak" disabled></input>
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
                      disabled
                      placeholder="Ward"
                      name={"temporaryAddress.wardNo"}
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
                      disabled
                      placeholder="Mahabir tole"
                      name={"temporaryAddress.tole"}
                    ></Field>
                    <ErrorMessage
                      name={"temporaryAddress.tole"}
                      render={(msg) => <div className="err-message">{msg}</div>}
                    ></ErrorMessage>
                  </div>
                </div>

                {/* //////////////////////////////////////Temporary address ended /////////////////////////////////////////////////////////*/}
                {/* //////////////////////////////////////permanent address start /////////////////////////////////////////////////////////*/}

                {/* //////////////////////////////////////permanent address ended /////////////////////////////////////////////////////////*/}
                {/* //////////////////////////////////////Account detail start /////////////////////////////////////////////////////////*/}

                {/* //////////////////////////////////////Account detail Ended /////////////////////////////////////////////////////////*/}
                {/* //////////////////////////////////////Share detail started /////////////////////////////////////////////////////////*/}

                {/* //////////////////////////////////////Share detail ended /////////////////////////////////////////////////////////*/}
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

                    <Field
                      disabled
                      // options={banklists}
                      // name="accountdetail.bankname"
                      // onChange={(value) =>
                      //   handleBankName(value, allvalues)
                      // }
                      name={"bankname"}
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

                    <Field
                      disabled
                      // options={branchnames}
                      // name="branchname"
                      // onChange={(value) =>
                      //   handleBankBranch(value, allvalues)
                      name={"branchname"}
                      // }
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
                    <Field
                      disabled
                      name="accountType"
                      // options={accountTypeOption}
                      // name="accountType"
                      // onChange={(value) =>
                      //   handleAccountType(value, allvalues)
                      // }
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
                              municipalityAndWardNo.length? <input value={municipalityAndWardNo.municipilityname}></input>:<input placeholder="damak" disabled></input>
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
                      disabled
                      placeholder="Account No"
                      name={"accountNo"}
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
                        return <Field disabled name="kitta" />;
                      }}
                    </Field>
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Amount</label>
                    </div>
                    <Field disabled name={"amount"}></Field>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="apply-share-form personal-info-form">
                <div className="view-uploaded-file grid">
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Citizenship Front*</label>
                    </div>
                    <div className="ctzenshp-img-frame2">
                      <img src={`${baseurl}api/applicant/download/CF/${details.citizenshipFrontImage}`} alt="citizenship img" />
                    </div>
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Citizenship Back*</label>
                    </div>
                    <div className="ctzenshp-img-frame2">
                      <img src={`${baseurl}api/applicant/download/CB/${details.citizenshipBackImage}`} alt="citizenship img" />
                    </div>
                  </div>
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Voucher Image*</label>
                    </div>
                    <div className="ctzenshp-img-frame2">
                      <img src={`${baseurl}api/applicant/download/CB/${details.citizenshipBackImage}`} alt="citizenship img" />
                    </div>
                  </div>
                  {details.isMinor?
                  <div className="form-input-share">
                    <div>
                      <label htmlFor="">Birth Certificate*</label>
                    </div>
                    <div className="ctzenshp-img-frame2">
                      <img src={`http://202.51.74.219:8093/api/applicant/download/BC/${details.birthCertificateImage}`} alt="citizenship img" />
                    </div>
                  </div>
                  :null}
                </div>
              </div>
          </>
          {/* )} */}
        </Formik>
        <button className="print-btn" id="printbtn" onClick={window.print}>
          Print
        </button>
        <button className="print-btn" id="rejectbtn" onClick={handlereject}>
            Reject
        </button>
        <button className="print-btn" id="approvebtn" onClick={handleapprove}>
          Approve
        </button>
        
        
      </div>
    </div>
  );
}

export default Approvereject;
