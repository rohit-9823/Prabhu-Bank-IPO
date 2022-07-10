import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Form, Field } from "formik";
import { toast } from "react-toastify";
import {Button} from "../../Button-loader/Button-load"
import { httpClient } from "../../../constants/httpClient";
import "./Createuser.css";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Createagentverify from "../../validation/createAgentVerify";
import Usereditverify from "../../validation/userEditVerify";

function Edituser(props) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [propsavailable, setpropsavailable] = useState();
  const [showhide, setshowhide] = useState(true);
  const [showhide2, setshowhide2] = useState(true);
  const [datas, setdatas] = useState({
    fullname: "",
    confirmPassword: "",
    password: "",
    email: "",
    mobileno: "",
  });

  const showhidePassword = () => {
    setshowhide(!showhide);
  };
  const showhidePassword2 = () => {
    setshowhide2(!showhide2);
  };
  useEffect(() => {
    clsfun();
    
  }, []);

  let clsfun = () => {
    if (props.history.location.state) {
      setpropsavailable(true)
      setdatas({
        fullname: props.history.location.state.fullname,
        mobileno: props.history.location.state.mobileno,
        
      });
    }
    else{
        setpropsavailable(false)
    }
};

  return (
    <div className="create-user">
      <p className="text04">User</p>
    <div>
      <button className="btn-details"  id="btn-selected">User Details</button>

      <Link to='../viewuser'>
        <button className="btn-details">
          User View
        </button>
      </Link>
    </div>
<Formik
enableReinitialize
          initialValues={datas}
          validationSchema={Usereditverify}
          
          onSubmit={async (values) => {
            
            let createUser = {
              fullName: values.fullname,
              mobileNo: values.mobileno,
              // id:props.history.location.state.id
            };
            httpClient
            .PUT("api/user/update", createUser, false, true, "createUser")
            .then((res) => {
              setIsButtonLoading(false);
              toast.success(res.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
              });
              props.history.push('/viewuser')
            })
            .catch((err) => {
              setIsButtonLoading(false);
              toast.error("Bad Credential !!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
              });
            });
          }}
          

          // let result = await AccountServices.verifyAccount(accountDetails,'POST','/verify-account');
          // if(result.data.parentrole){
          // localStorage.setItem('accountData', JSON.stringify(values));
          //   props.history.push('/cash-deposit-request');
          // }
      >
        {({ errors, touched }) => (
        
        
        //   {/* Form started */}
          <Form className="createBody">
            
            <div className="create-user-box">
              <div className="ipo-field">
                  <label className="ipo-label">Fullname</label>
                  <Field
                    name="fullname"
                    class="ipo-input"
                    placeholder="Full Name"
                  ></Field>
                  {errors.fullname && touched.fullname ? (
                    <div className="error-message">{errors.fullname}</div>
                  ) : null}
                
              </div>
              <div className="ipo-field">
                  <label className="ipo-label">Mobile Number</label>
                  <Field
                    name="mobileno"
                    class="ipo-input"
                    placeholder="98xxxxxxxx"
                  ></Field>
                  {errors.mobileno && touched.mobileno ? (
                    <div className="error-message">{errors.mobileno}</div>
                  ) : null}
                
              </div>
              <div>
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
                    className="btn btn-danger save-btn"
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

export default Edituser;


