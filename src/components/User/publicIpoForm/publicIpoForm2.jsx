import React, { useEffect, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import Logo from "../../../assests/images/logo.png";
import "./publicIpoForm.css";
import * as yup from "yup"
import { useHistory } from "react-router-dom";
import { Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { httpClient } from "../../../constants/httpClient";
import { notify } from "../../../constants/notify";

export default function Publicipo2(props) {
  // declaration
    let [initialValues,setInitialValues]=useState({
      kitta:"",
      amount:""
    })
    let [amount,setAmount]=useState("0")
    // redux implementation
    let dispatch=useDispatch()
    // let personalDetails=useSelector((state)=>state.userIpoDetails.personalDetails)
    let userIpoDetails=useSelector((state)=>state.userIpoDetails)
    let ipoInfo=useSelector((state)=>state.userIpoDetails.ipoMetaDetails)
    
    // const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const [citizenshipFrontImage,setCitizenshipFrontImage]=useState(null)
    const [citizenshipBackImage,setCitizenshipBackImage]=useState(null)
    // end of redux implementation
    let history=useHistory()
    // end of declaration

    // validation
    let schema=yup.object().shape({
      kitta:yup.number().typeError("Kitta must be a number")
              .min(10)
              .required("Kitta quantity is required")
    })
    // end of validation

    // methods

    const handleSubmit=(values)=>{
      let finalValue={...values,
        ...userIpoDetails.personalDetails.citizenshipDetails,
        ...userIpoDetails.personalDetails.personalDetails
        ,...userIpoDetails.ipoDetails}

        finalValue.amount=amount
        finalValue.granFatherName= finalValue.grandfatherName
        finalValue.mobileNo=finalValue.phoneNumber
        finalValue.issueDate=finalValue.issudeDate
        finalValue.tempMunicipalityId=userIpoDetails.personalDetails.temporaryAddress.localMunicipality
        finalValue.tempWard=userIpoDetails.personalDetails.temporaryAddress.wardNo
        finalValue.tempTole=userIpoDetails.personalDetails.temporaryAddress.tole
        finalValue.perMunicipalityId=userIpoDetails.personalDetails.permanentAddress.localMunicipality
        finalValue.perWard=userIpoDetails.personalDetails.permanentAddress.wardNo
        finalValue.perTole=userIpoDetails.personalDetails.permanentAddress.tole
        finalValue.gender=1
        finalValue.ipoIssueId=finalValue.id
        finalValue.appliedQuantity=finalValue.kitta
        finalValue.price=finalValue.amount
        finalValue.isPermanent=false
        finalValue.isMinor=finalValue.isminor
// end of of mine
        
        httpClient.UPLOAD("POST","api/applicant/create",finalValue,finalValue.citizenshipFrontImage,finalValue.citizenshipBackImage)
        .then(resp=>{
          notify.success(finalValue.kitta+" no. of shares successfully applied")
          history.push("/")
          // finalValue.resetForm()
        })
        .catch(err=>{
          notify.error("Something went wrong")
        })
        // submittingKitta(finalValue)
      // 
    }
const handleChange=(event,allValues)=>{
  let {value}=event.target
  
  let finalAmount=value*userIpoDetails.ipoMetaDetails.pricepershare
  allValues.setFieldValue("kitta",value)
  setAmount(finalAmount)
}
useEffect(()=>{
  if(Object.keys(userIpoDetails.ipoDetails).length===0 || Object.keys(userIpoDetails.ipoMetaDetails).length===0 ||Object.keys(userIpoDetails.personalDetails).length===0){
    history.push("/")
  }
},[])
    // end of methods
  return (
    <div className="ipoissued-body">
      <div className="ipoissued-body1">
        <div className="ipoissued-main-logo">
          <img src={Logo} alt="" onClick={()=>props.history.push('/')}/>
        </div>
        <div className="apply-for-issue">
          <div className="apply-for-issue1">
            <p id="apply-for-issue">
              <span>
                <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
              </span>{" "}
              &nbsp; &nbsp;Apply for issue
            </p>
            <div className="apply-share-form">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">
                  {userIpoDetails.ipoDetails.companyname}{" "}
                  <span id="ipoissued-p-ipo">{userIpoDetails.ipoDetails.ipotype}</span>{" "}
                  <span id="ipoissued-share-type">{userIpoDetails.ipoDetails.sharetype}</span>
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
                            <label htmlFor="">Prospectus</label>
                          </div>
                          <button>Download prospectus</button>
                        </div>
                        <div className="form-input-share">
                          <div>
                            <label htmlFor="">Offer letter</label>
                          </div>
                          <button>Download offer letter</button>
                        </div>
                        <div className="form-input-share">
                          <div>
                            <label htmlFor="">Form</label>
                          </div>
                          <button>Download forms</button>
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
            <div className="apply-share-form personal-info-form">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">Share Details</p>
              </div>
              <div>
                <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
                  {
                    (allValues)=><Form>
                    <div className="share-apply-form1">
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Applied Kitta</label>
                        </div>
                        <Field name="kitta">
                          {
                            ()=>{
                              return <input placeholder="kitta" type={"number"} onChange={(event)=>handleChange(event,allValues)}></input>
                            }
                          }
                        </Field>
                        <ErrorMessage name={"kitta"} render={(msg)=><div className="err-message">{msg}</div>}></ErrorMessage>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Amount</label>
                        </div>
                        <Field placeholder="Amount in number" value={amount}></Field>
                      </div>
                    </div>
                    <div className="pubform-next-but">
                      <button className="next-but-pubform" type="submit">Submit</button>
                    </div>
                  </Form>
                  }

                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
