import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Field } from "formik";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Add, Delete } from "@material-ui/icons";
import Changepasswordverify from "../../validation/changePasswordVerify";
import { Button } from "../../Button-loader/Button-load";
import MaterialTable from "material-table";
import { notify } from "../../../constants/notify";
import { toast } from "react-toastify";
import { httpClient } from "../../../constants/httpClient";
import "./ChangePassword.css";
function ChangePassword(props) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [color, setcolor] = useState(true);
  const [showhide, setshowhide] = useState(true);
  const [showhide2, setshowhide2] = useState(true);
  const [showhide1, setshowhide1] = useState(true);
  const [userdata, setuserdata] = useState([]);
  const [updatedata, setupdatedata] = useState([]);


  const showhidePassword = () => {
    setshowhide(!showhide);
  };
  const showhidePassword2 = () => {
    setshowhide2(!showhide2);
  };
  const showhidePassword1 = () => {
    setshowhide1(!showhide1);
  };
  
let cls = showhide ?  "fas fa-eye-slash":"fas fa-eye";
let cls1 = showhide ?  "fas fa-eye-slash":"fas fa-eye";
let cls2 = showhide2 ? "fas fa-eye-slash":"fas fa-eye";
  
  return (

    <div className="create-user">
        <p className="text04">Change Password</p>
      

  <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
            oldPassword: "",
          }}
          validationSchema={Changepasswordverify}
          onSubmit={async (values) => {
            
            let changepass = {
              
              newPassword: values.newPassword,
              confirmPassword: values.confirmPassword,
              oldPassword: values.oldPassword,
              
            };

        
          httpClient
            .PUT("api/update-user", changepass, false, true, "changepass")
            .then((res) => {
              setIsButtonLoading(false);
              toast.success(res.data.message, {
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
       <Form autocomplete="off" novalidate className="changepasswordBody">
         <div className="create-user-box">   
                <div className="ipo-field">
                  <label className="ipo-label">Old Password</label>

                  <Field
                    name="oldPassword"
                    type={showhide ? "password" : "text" }
                    class="ipo-input"
                    placeholder="New Password"
                  />
                  <i class={cls} id="errspan" onClick={showhidePassword}></i>
                  </div>
                  {errors.oldPassword && touched.oldPassword ? (
                    <div className="error-message">{errors.oldPassword}</div>
                  ) : null}
                <div className="ipo-field">
                  <label className="ipo-label">New Password</label>
                  
                  <Field
                    name="newPassword"
                    type={showhide1 ? "password" : "text" }
                    class="ipo-input"
                    placeholder="New Password"
                  />
                  <i class={cls1} id="errspan" onClick={showhidePassword1}></i>
                  
                  </div>
                  {errors.newPassword && touched.newPassword ? (
                    <div className="error-message">{errors.newPassword}</div>
                  ) : null}
                <div className="ipo-field">
                  <label className="ipo-label">Confirm New Password</label>
                  
                  <Field
                    name="confirmPassword"
                    type={showhide2 ? "password" : "text" }
                    class="ipo-input"
                    placeholder="Confirm New Password"
                  />
                  <i class={cls2} id="errspan" onClick={showhidePassword2}></i>
                              
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="error-message">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
                
              </div>
              <div className="buttons-save">

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
                    className="btn btn-danger save-changepassword-btn"
                  >
                    <span>Save</span>
                  </Button>
                </div>
            </Form>
        )}
      </Formik>
    </div>
    /* </div>
    </div> */
  );
}

export default ChangePassword;
