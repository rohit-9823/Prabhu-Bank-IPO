import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import ipoDetailVerify from "../../validation/ipoDetailVerify";
import { httpClient } from "../../../constants/httpClient";
import { Button } from "../../Button-loader/Button-load";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Select from "react-select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Editor from "../../../Editor";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./ipodetails.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
function Ipo(props) {
  const [editorLoadeds, setEditorLoadeds] = useState(false);
  const [editdata, seteditdata] = useState("");
  const [ipodata, setipodata] = useState("");
  const [provinces, setprovinces] = useState([]);
  const [finalvalues, setfinalvalues] = useState([]);
  const [muni, setmuni] = useState([]);
  const [demodate, setdemodate] = useState(new Date());
  const [demodate2, setdemodate2] = useState(new Date());
  const [districts, setdistricts] = useState([]);
  const [wardchange, setwardchange] = useState([]);
  const [municipalities, setmunicipality] = useState([]);
  const [districtid, setdistrictid] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [selectedImageOffer, setImageOffer] = useState("");
  const [selectedImageOffer2, setImageOffer2] = useState("");
  const [selectedImageOffer3, setImageOffer3] = useState("");
  const [imgname, setimgname] = useState("");
  const [errmessage, seterrmessage] = useState("");
  const [sharetypes, setsharetypes] = useState([]);
  const [propsavailable, setpropsavailable] = useState();
  const [selectedOption, setselectedOption] = useState("");
  const [selectedOption2, setselectedOption2] = useState("");
  
  const [updatedata, setupdatedata] = useState({
    arrData: [{ municipalityId: 0, ward: null }],
    companyName: "",
    ipoType: "",
    shareType: "",
    issueManager: "",
    startDate: "",
    endDate: "",
    maxkitta: "",
    minkitta: "",
    companycode: "",
    ipoDetails: "",
    priceforShare: "",
    numberofShare: "",
    selectedImageOffer: "",
    selectedImageOffer2: "",
    selectedImageOffer3: "",
  });

  let cls = () => {
    if (props.location.state) {
    let data=props.location.state.id
    httpClient.GET(`api/ipo/get/ipo/locations/${data}`,false,true)
    .then((res)=>{
      console.log(res);
      let ipoinfo=res.data.data.ipoInfo
      let ipoloc=res.data.data.location
      let newvalue=[...ipoinfo,...ipoloc]
      
      newvalue.map((value)=>{
        console.log(value);
        setupdatedata({
          companyName:value.companyName,
          // ipoType: value.ipoDetails,
          shareType: value.shareType,
          issueManager: value.issueManager,
          startDate: value.startDate,
          endDate: value.endDate,
          ipoDetails: value.ipoDetails,
          seteditdata: value.ipoDetails,
          priceforShare: value.pricePerShare,
          numberofShare: value.noOfShareIssued,
          arrData: [{ municipalityId:value.municipalityid, ward:value.wardno }],
        });
        setselectedOption2(value.stateid)
        setwardchange(value.wardno)
        
        
        
      })
        
      
  })
}

   else {
      setpropsavailable(false);
    }
  };

  const handleSave = (values) => {
    var test = null;
    
    {
      values.map((datas) => {
        if (
          datas.ward == null ||
          datas.ward == "" ||
          datas.municipalityId == 0
          // datas.District == ""
        ) {
          test = "false";
        } else {
          test = "true";
        }
      });
    }
    return test;
  };
  const districtapi = async () => {
    await httpClient
      .GET("api/district/get-all", false, true)
      .then((res) => setdistricts(res.data.data));
  };

  const getprovince = () => {
    httpClient
      .GET("api/state/get-all", false, true)
      .then((res) => {
        
        let data = res.data.data.map((value) => {
          return {
            value: value.id,
            label: value.name,
          };
        });
        setprovinces(data);
      })
      .catch((err) => {
        
      });
  };

const handlemunicipality = async (id) => {
  let values={
    districtId:id
  }
  
      await httpClient
        .POST("api/municipality/get-all", values, false, true, "values")
        .then(
          (res) => {
            let data = res.data.data;
            let finalvalue = data.map((value) => {
              return {
                value: value.id,
                label: value.name,
              };
            });
            setmuni(finalvalue);
          }
  
          // setmunicipality(res.data.data)
          // let finaldata=res.data.data.
        );
    };
  const handledistrict = async (id) => {
    let values = {
      stateId: id,
    };
    await httpClient
      .POST("api/district/state/get-all", values, false, true, "values")
      .then(
        (res) => {
          let data = res.data.data;
          let finalvalue = data.map((value) => {
            return {
              value: value.id,
              label: value.name,
            };
          });
          setfinalvalues(finalvalue);
        }

        // setmunicipality(res.data.data)
        // let finaldata=res.data.data.
      );
  };

  useEffect(() => {
    console.log(props);
    districtapi();
    getprovince();
    setEditorLoadeds(true);
    cls();

    
  }, []);

  const handleChangeIconImage = (e) => {
    let files = e.target.files[0];
    let reader = new FileReader();
    setimgname(files.name);
    
    setImageOffer(files);
    // reader.onloadend = () => {
    //     setImageOffer(files);
    // };
    // reader.readAsDataURL(files);
  };
  const handleChangeIconImage2 = (e) => {
    let files = e.target.files[0];
    let reader = new FileReader();
    setimgname(files.name);
    
    setImageOffer2(files);
    // reader.onloadend = () => {
    //     setImageOffer(files);
    // };
    // reader.readAsDataURL(files);
  };
  const handleChangeIconImage3 = (e) => {
    let files = e.target.files[0];
    let reader = new FileReader();
    setimgname(files.name);
    
    setImageOffer3(files);
    // reader.onloadend = () => {
    //     setImageOffer(files);
    // };
    // reader.readAsDataURL(files);
  };
  const handleDateChange = (date) => {
    const unixTimeZero = Date.parse(date);
    const milliseconds = unixTimeZero; // 1575909015000

    const dateObject = new Date(milliseconds);

    const humanDateFormat = dateObject.toLocaleString();
    let finaldate = humanDateFormat.replace(",", "");
    
    
    setdemodate(finaldate);
  };
const handlewardchange=(e)=>{
  console.log(e.target.value);
  let hawa=Array.from(data)
  let data=e.target.value;
  let trynew=data.split(',');
  console.log(trynew);
  // console.log(hawa);
  setwardchange(trynew)
  
}
  const handleDateChange2 = (date) => {
    const unixTimeZero = Date.parse(date);
    const milliseconds = unixTimeZero; // 1575909015000

    const dateObject = new Date(milliseconds);

    const humanDateFormat = dateObject.toLocaleString();
    let finaldate = humanDateFormat.replace(",", "");
    
    setdemodate2(finaldate);
  };
  const handleipodetail = (value) => {
    let data = value.replace("<p>", "").replace("</p>", "");
    
  };
  return (
    <>

      <div className="buttons-line">
        <button className="btn-details" id="btn-selected">
          IPO Detail
        </button>

        <Link to="../viewIpo">
          <button className="btn-details">View IPO</button>
        </Link>
      </div>
      <Formik
        enableReinitialize
        initialValues={updatedata}
        validationSchema={ipoDetailVerify}
        onSubmit={async (values, { resetForm }) => {
          
          //  let datas=demodate2.toString()
          
          // let now=''
          
          // if(datas.includes("Nepal Time")){
            
          //   now= datas.replace('GMT+0545 (Nepal Time)'," ");
          //   const unixTimeZero = Date.parse(now);
          //   const milliseconds = unixTimeZero; // 1575909015000
        
          //   const dateObject = new Date(milliseconds);
        
          //   const humanDateFormat = dateObject.toLocaleString();
          //   let finaldate = humanDateFormat.replace(",", "");

          //   setdemodate2(finaldate)
            
          // }
        
          
          let createUser = {
            companyName: values.companyName,
            ipoType: values.ipoType,
            shareType: values.shareType,
            issueManager: values.issueManager,
            maxKitta: values.maxkitta,
            minKitta: values.minkitta,
            startDate: demodate2,
            endDate: demodate,
            ipoDetails: editdata,
            pricePerShare: values.priceforShare,
            noOfShareIssued: values.numberofShare,
            companyCode: values.companycode,
          };
          httpClient
            .UPLOADFILE(
              "api/ipo/create",
              createUser,
              selectedImageOffer,
              selectedImageOffer2,
              selectedImageOffer3,
              values.arrData
            )

            .then((res) => {
              
              setIsButtonLoading(false);
              toast.success("IPO Added Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
              });
              resetForm({ values: "", editdata: "" });

              // props.history.push('/viewIpo')
            })
            .catch((err) => {
              
              setIsButtonLoading(false);
              toast.error("Bad Credential !!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
              });
            });
        }}
        render={({
          values,
          errors,
          touched,
          onBlur,
          onChange,
          setFieldValue,
        }) => (
          <Form autocomplete="off">
            <FieldArray
              name="arrData"
              render={({ push, remove }) => (
                <div className="IpoBody">
                  <div className="ipo-box">
                    <div className="ipo-field">
                      <label className="ipo-label">Company Name</label>
                      <Field
                        name="companyName"
                        className="ipo-input"
                        placeholder="Company Name"
                      />
                      {errors.companyName && touched.companyName ? (
                        <div className="error-message">
                          {errors.companyName}
                        </div>
                      ) : null}
                    </div>
                    <div className="ipo-field">
                      <label className="ipo-label">IPO Type</label>
                      <Field
                        name="ipoType"
                        className="ipo-input"
                        placeholder="IPO Type"
                        as="select"
                      >
                        <option style={{ display: "none" }}></option>
                        <option value='0'>Local Citizenship Application</option>
                        <option value='1'>RESERVED(RIGHT SHARE)</option>
                      </Field>
                      {errors.ipoType && touched.ipoType ? (
                        <div className="error-message">{errors.ipoType}</div>
                      ) : null}
                    </div>
                    <div className="ipo-field">
                      <label className="ipo-label">Share Type</label>
                      <Field
                        name="shareType"
                        className="ipo-input"
                        placeholder="Share Type"
                        as="select"
                      >
                        <option style={{ display: "none" }}></option>
                        <option value='0'>Ordinary Share</option>
                      </Field>

                      {/* {errors.shareType && touched.shareType ? (
                        <div className="error-message">{errors.shareType}</div>
                      ) : null} */}
                    </div>
                    <div className="ipo-field">
                      <label className="ipo-label">Issue Manager</label>
                      <Field
                        name="issueManager"
                        className="ipo-input"
                        placeholder="Issue Manager"
                      />
                      {errors.issueManager && touched.issueManager ? (
                        <div className="error-message">
                          {errors.issueManager}
                        </div>
                      ) : null}
                    </div>

                    <div className="ipo-field">
                      <div className="date-field">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} />}
                          label="Start Date"
                          value={demodate2}
                          name="startDate"
                          onChange={handleDateChange2}
                          // onChange={(newValue) => {
                          //   
                          //   let d = new Date(newValue)
                          //   d = ` ${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
                          //   // this.handleUserIDChange(d)
                          //   setstartdate(newValue);
                          // }}
                        />
                      </LocalizationProvider>
                      </div>
                      
                    </div>

                    <div className="ipo-field">
                      <div className="date-field">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} />}
                          label="End Date"
                          value={demodate}
                          name="endDate"
                          onChange={handleDateChange}
                        />
                      </LocalizationProvider>
                      </div>
                      
                    </div>
                    <div className="ipo-field">
                      <label className="ipo-label">Number of Shares Used</label>
                      <Field
                        name="numberofShare"
                        className="ipo-input"
                        placeholder="Number of Shares Used"
                      />
                      {errors.numberofShare && touched.numberofShare ? (
                        <div className="error-message">
                          {errors.numberofShare}
                        </div>
                      ) : null}
                    </div>
                    <div className="ipo-field">
                      <label className="ipo-label">Price for Share</label>
                      <Field
                        name="priceforShare"
                        className="ipo-input"
                        placeholder="Price for Share"
                      />
                      {errors.priceforShare && touched.priceforShare ? (
                        <div className="error-message">
                          {errors.priceforShare}
                        </div>
                      ) : null}
                    </div>
                    <div className="ipo-field">
                      <label className="ipo-label">Minimum Kitta</label>
                      <Field
                        name="minkitta"
                        className="ipo-input"
                        placeholder="Minimum Kitta"
                      />
                      {errors.minkitta && touched.minkitta ? (
                        <div className="error-message">{errors.minkitta}</div>
                      ) : null}
                    </div>
                    <div className="ipo-field">
                      <label className="ipo-label">Maximum Kitta</label>
                      <Field
                        name="maxkitta"
                        className="ipo-input"
                        placeholder="Maximum Kitta"
                      />
                      {errors.maxkitta && touched.maxkitta ? (
                        <div className="error-message">{errors.maxkitta}</div>
                      ) : null}
                    </div>

               
                    <div className="ipo-field">
                      <label className="ipo-label">Company Code</label>
                      <Field
                        name="companycode"
                        className="ipo-input"
                        placeholder="Company Code"
                      />
                      {errors.companycode && touched.companycode ? (
                        <div className="error-message">{errors.companycode}</div>
                      ) : null}
                    </div>






                  </div>

                  <div className="ipo-field-ckedit">
                      <label className="ipo-label">IPO Details</label>

                      <CKEditor
                        editor={ClassicEditor}
                        // data="<p>Hello from CKEditor 5!</p>"
                        onInit={(editor) => {
                          
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          seteditdata(data);
                        }}
                      />

                      {/* <Editor
                        name="ipoDetails"
                        onChange={handleipodetail}
                        editorLoaded={editorLoadeds}
                      /> */}

                      {errors.ipoDetails && touched.ipoDetails ? (
                        <div className="error-message">{errors.ipoDetails}</div>
                      ) : null}
                    </div>
                  {/* <hr className="sep-line"/> */}
                  <div className="ipo-box">
                    <div className="ipo-field">
                      <label for="file" className="ipo-label">
                        Offer Letter upload
                      </label>
                      {/* <br /> */}
                      <input
                        id="file"
                        name="selectedImageOffer"
                        type="file"
                        title=" "
                        onChange={(e) => {
                          handleChangeIconImage(e);
                        }}
                        // onChange={(e) => handleChangeIconImage(e,setFieldValue)}
                        className="form-control"
                      />

                      {/* <Thumb file={values.file} /> */}
                      {errors.offerFile && touched.offerFile ? (
                        <div className="error-message">{errors.offerFile}</div>
                      ) : null}
                    </div>
                    <div className="ipo-field">
                      <label for="file" className="ipo-label">
                        Forms upload
                      </label>
                      {/* <br /> */}
                      <input
                        id="file"
                        name="selectedImageOffer2"
                        type="file"
                        title=" "
                        // onChange={(e) => { handleChangeIconImage(e);setFieldValue("Forms",imgname); }}
                        onChange={(e) => handleChangeIconImage2(e)}
                        className="form-control"
                      />

                      {/* <Thumb file={values.file} /> */}
                      {errors.Forms && touched.Forms ? (
                        <div className="error-message">{errors.Forms}</div>
                      ) : null}
                    </div>
                    <div className="ipo-field">
                      <label for="file" className="ipo-label">
                        Prospectus upload
                      </label>
                      {/* <br /> */}
                      <input
                        id="file"
                        name="selectedImageOffer3"
                        type="file"
                        title=" "
                        // onChange={(e) => { handleChangeIconImage(e);setFieldValue("Forms",imgname); }}
                        onChange={(e) => handleChangeIconImage3(e)}
                        className="form-control"
                      />

                      {/* <Thumb file={values.file} /> */}
                      {errors.prospectus && touched.prospectus ? (
                        <div className="error-message">{errors.prospectus}</div>
                      ) : null}
                    </div>
                  </div>

                  {/* <hr className="sep-line" /> */}
                  {values.arrData.length > 0 &&
                    values.arrData.map((_, index) => (
                      <div key={index}>
                        <div className="ipo-box">
                          <div className="ipo-field">
                            <label className="ipo-label">Province</label>
                            <Select
                              defaultValue={selectedOption2}
                              // onChange={setSelectedOption}
                              options={provinces}
                              name="provinces"
                              onChange={(option) => (
                                setselectedOption2(option.value),
                                handledistrict(option.value),
                                setFieldValue(`provinces`, option.value)
                              )}
                            />
                            <div className="error-message">
                              <ErrorMessage
                                name={`arrData[${index}].district`}
                              />
                            </div>
                          </div>
                          <div className="ipo-field">
                            <label className="ipo-label">Issue District</label>
                            <Select
                              defaultValue={selectedOption2}
                              // onChange={setSelectedOption}
                              options={finalvalues}
                              name="district"
                              onChange={(option) =>(
                                // setselectedOption2(option.value),
                                handlemunicipality(option.value),
                                setFieldValue(`district`,option.value)
                                )}
                              />

                            <div className="error-message">
                              <ErrorMessage
                                name={`arrData[${index}].district`}
                              />
                            </div>
                          </div>

                          <div className="ipo-field">
                            <label className="ipo-label">Municipality</label>
                            <Select
                              defaultValue={selectedOption}
                              // onChange={setSelectedOption}
                              options={muni}
                              name="municipality"
                              onChange={(option) => (
                                // setselectedOption,
                                setFieldValue(
                                  `arrData[${index}].municipalityId`,
                                  option.value
                                )
                              )}
                            />

                            {/* <Field
                              name={`arrData[${index}].municipalityId`}
                              as="select"
                              className="ipo-input"
                              placeholder="Municipality"
                            >
                              <option style={{ display: "none" }}>
                                {municipalities.name}
                              </option>
                              {municipalities.map((values) => (
                                <option value={values.id} key={values.id}>{values.name}</option>
                              ))}
                            </Field> */}
                            <div className="error-message">
                              <ErrorMessage
                                name={`arrData[${index}].municipalityId`}
                              />
                            </div>
                          </div>
                          
                          <div className="ipo-field">
                            <label className="ipo-label">Ward</label>
                            
                            {/* <Select
    // defaultValue={[colourOptions[2], colourOptions[3]]}
    isMulti
    name={`arrData[${index}].ward`}
    options={provinces}
    placeholder="Ward"
    className="ipo-input ipo-input-ward"
    classNamePrefix="select"
    onChange={(option) => (
      setFieldValue(`arrData[${index}].ward`,option.value)
    )}
  /> */}
                            
                            <Field
                              name={`arrData[${index}].ward`}
                              className="ipo-input ipo-input-ward"
                              placeholder="Ward"
                              value={wardchange}
                              onChange={(e)=>{
                                let data=e.target.value;
                                let trynew=data.split(',');
                                setwardchange(trynew)
                                setFieldValue(`arrData[${index}].ward`,(trynew))
                              }}
                            />
                            <div className="error-message">
                              <ErrorMessage name={`arrData[${index}].ward`} />
                            </div>
                            <div className="button-div">
                            {index == 0 ? null : (
                              <button
                                onClick={() => {
                                  remove(index);
                                  seterrmessage("");
                                }}
                                type="button"
                                className="btn btn-danger add-btn float-right"
                              >
                                Remove
                              </button>
                            )}

                            <button
                              className="add-btn"
                              type="button"
                              onClick={(e) => {
                                let check = handleSave(values.arrData);
                                
                                if (check == "true") {
                                  push({
                                    // District: "",
                                    municipalityId: "",
                                    ward: "",
                                  });
                                  seterrmessage("");
                                } else {
                                  seterrmessage("* All field must be filled out");
                                }
                              }}
                            >
                              Add
                            </button>
                          </div>
                          </div>
                          
                        </div>
                      </div>
                    ))}
                 <span className="error-addbtn">{errmessage}</span> 

                  <div className="submit-div">
                    <Button
                      type="submit"
                      onClick={() => {
                        setIsButtonLoading(true);
                        setTimeout(() => {
                          setIsButtonLoading(false);
                        }, 1100);
                      }}
                      isLoading={isButtonLoading}
                      class="btn btn-primary  submit-btn"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            ></FieldArray>
          </Form>
        )}
      ></Formik>
    </>
  );
}

export default Ipo;
