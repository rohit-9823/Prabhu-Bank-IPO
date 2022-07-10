import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Form, Field } from "formik";
import { toast } from "react-toastify";
import { Button } from "../../Button-loader/Button-load";
import { httpClient } from "../../../constants/httpClient";
import { useEffect, useState } from "react";
import './voucherstyle.css'
import axios from "axios";
// import Policeunitverify from "../validation/Policeunitverify";
function Voucherupload(props) {
  const [title, settitle] = useState('Police Unit');
  const [time, setTime] = useState(new Date());
  const [displaybranch, setdisplaybranch] = useState("");
  const [banklists,setbanklists]=useState([])
  const [branchnames,setbranchnames]=useState([])
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [propsavailable, setpropsavailable] = useState();
  const [valuebranch, setvaluebranch] = useState("");
  const [selectedImageOffer3, setImageOffer3] = useState();
  const [voucherdata, setvoucherdata] = useState({
    status: "",
              trans: "",
              cashvoucher: "",
              chequevoucher: "",
              bankname: "",
              branchname: "",
              chequeno: "",
  });
  const [paytype, setpaytype] = useState()

  useEffect(() => {
    cls();
    
  }, []);

  let cls = () => {
    if (props.history.location.state) {
      setpropsavailable(true)
      setvoucherdata({
        name: props.history.location.state.NAME,
        description: props.history.location.state.DESCRIPTION,
        
      });
    }
    else{
      setpropsavailable(false)
    }
  };
  const handlebranchname=(name)=>{
    let data=name.target.value;
    setdisplaybranch(data)
    axios.get(`https://backend.prabhucapital.com/api/v1/public/bank-data?bank=${data}&sort=false`)
    .then((res)=>{
      setbranchnames(res.data.data.list)
    })
  }
  const banklist=()=>{
    axios.get("https://backend.prabhucapital.com/api/v1/public/bank-data")
    .then((res)=>{
      setbanklists(res.data.data.list)
    })
  }
  const handletype=(e)=>{
      let id=parseInt(e.target.value,10);
      setpaytype(id)
  }
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
  useEffect(() => {
    banklist()
  }, [])
  
  const token = localStorage.getItem("dm-access_token");
  return (
    <div className="details">
    <div className="heading_line">
      <p className="text04">Voucher</p>
     
    </div>

<Formik
enableReinitialize
          initialValues={voucherdata}
        //   validationSchema={Policeunitverify}
          onSubmit={async (values) => {
              
            let createUser = {
                agentPaymentType:values.status,
                transactionId: values.trans,
              bankName: values.bankname,
              branchName: values.branchname,
              chequeNo: values.chequeno,
              token:props.history.location.state,
            };
            
            httpClient.UPLOAD("POST","api/agent-payment/create",createUser,null,null,selectedImageOffer3,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
              setIsButtonLoading(false);
              toast.success("Payment Is Successfully Done", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
              });
            })
            .catch((err) => {
              setIsButtonLoading(false);
              toast.error("Bad Credential !!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
              });
            });
        }}
      >
        {({ errors, touched }) => (
        
        
        //   {/* Form started */}
          <Form className="unit-form">
            
            <div className="cols">
            <div className="form-elements">
                <label className="form-label">Type</label>
                <Field
                  as="select"
                  placeholder="Vehicle Status"
                  name="status"
                  class="form-input"
                  onClick={(e)=>handletype(e)}
                //   value={voucherdata.status}
                >
                  <option value="" style={{ display: "none" }}>
                    {/* {vehicledata.name} */}
                  </option>
                  <option value='0'>Cash</option>
                  <option value="1">Cheque</option>
                </Field>
                {errors.status && touched.status ? (
                  <div className="error-message">{errors.status}</div>
                ) : null}
              </div> 
            </div>

            {paytype=="0"? 
            <><div className="form-elements">
                              <label className="form-label">Transaction id</label>
                              <Field
                                  name="trans"
                                  class="form-input"
                                  placeholder="Name"
                              ></Field>
                              {errors.trans && touched.trans ? (
                                  <div className="error-message">{errors.trans}</div>
                              ) : null}

                          </div>

                          <div className="ipo-fields">
                      <label for="file" className="ipo-label">
                        Voucher upload
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
                      {errors.voucher && touched.voucher ? (
                        <div className="error-message">{errors.voucher}</div>
                      ) : null}
                    </div>
                              
                              </>
              :
              <><div className="form-elements">
                              <label className="form-label">Bank name</label>
                              <Field placeholder="bankname" 
                          as="select"
                          name="bankname"
                          class="form-input"
                          onChange={(e)=>handlebranchname(e)}
                          value={displaybranch}
                          >
                            <option value="" style={{ display: "none" }}></option>
                            {banklists.map((value)=>(
                              <option>{value.bank}</option>
                            ))}


                              </Field>
                              {errors.bankname && touched.bankname ? (
                                  <div className="error-message">{errors.bankname}</div>
                              ) : null}

                          </div><div className="form-elements">
                                  <label className="form-label">Branch name</label>
                                  <Field
                          as="select"
                          name="branchname"
                          class="form-input"
                          onChange={(e)=>setvaluebranch(e.target.value)}
                          value={valuebranch}
                          >
                            
                             <option value="" style={{ display: "none" }}></option>
                            {branchnames.map((value)=>(
                              <option>{value.branchName}</option>
                            ))}
                                  </Field>
                                  {errors.branchname && touched.branchname ? (
                                      <div className="error-message">{errors.branchname}</div>
                                  ) : null}

                              </div><div className="form-elements">
                                  <label className="form-label">Cheque no</label>
                                  <Field
                                      name="chequeno"
                                      class="form-input"
                                      placeholder="chequeno"
                                  ></Field>
                                  {errors.chequeno && touched.chequeno ? (
                                      <div className="error-message">{errors.chequeno}</div>
                                  ) : null}

                              </div>
                              <div className="ipo-fields">
                      <label for="file" className="ipo-label">
                        Voucher upload
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
                      {errors.voucher && touched.voucher ? (
                        <div className="error-message">{errors.voucher}</div>
                      ) : null}
                    </div>
                              </>
          
          }



            <div className="cols" id="btn-cols">
            
            
              <div className="vehform-save-cancel-col responsive-save-cancel">
                {/* <button  type="button" className="veh-btn-cancel-save">Cancel</button> */}
                <Button
                    disabled={Object.values(errors).length > 0 ? true : false}
                    onClick={() => {
                      setIsButtonLoading(true);
                      setTimeout(() => {
                        setIsButtonLoading(false);
                      }, 1000);
                    }}
                    isLoading={isButtonLoading}
                    type="submit"
                    className="btn btn-danger btn-cancel-save"
                    id="save-button"
                  >
                    <span>Save</span>
                  </Button>
              </div>
            </div>
          </Form>
         
         )}
        </Formik>
         </div>
    
  );
}

export default Voucherupload;

