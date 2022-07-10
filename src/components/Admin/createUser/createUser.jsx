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

function Createuser(props) {
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


let cls = showhide ?  "fas fa-eye-slash":"fas fa-eye";
let cls2 = showhide2 ?  "fas fa-eye-slash":"fas fa-eye";
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
          validationSchema={Createagentverify}
          
          onSubmit={async (values) => {
            

           let createUser = {
              fullName: values.fullname,
              mobileNo: values.mobileno,
              email: values.email,
              password: values.password,
              confirmPassword: values.confirmPassword,
            };
            httpClient
            .POST("api/user/create/admin", createUser, false, true, "createUser")
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

        
         

          // let result = await AccountServices.verifyAccount(accountDetails,'POST','/verify-account');
          // if(result.data.parentrole){
          // localStorage.setItem('accountData', JSON.stringify(values));
          //   props.history.push('/cash-deposit-request');
          // }
        }}
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
              {propsavailable?null:
              <><div className="ipo-field">
                  <label className="ipo-label">Email</label>
                  <Field
                    name="email"
                    class="ipo-input"
                    placeholder="example@gmail.com"
                  ></Field>
                  {errors.email && touched.email ? (
                    <div className="error-message">{errors.email}</div>
                  ) : null}
                </div><div className="ipo-field">
                    <label className="ipo-label">Password</label>
                    <Field
                      name="password"
                      class="ipo-input"
                      type={showhide ? "password" : "text"}
                      placeholder="Password" />
                    <i class={cls} id="errspan" onClick={showhidePassword}></i>
                    {errors.password && touched.password ? (
                      <div className="error-message">{errors.password}</div>
                    ) : null}

                  </div><div className="ipo-field">
                    <label className="ipo-label">Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      class="ipo-input"
                      placeholder="Confirm Password"
                      type={showhide2 ? "password" : "text"} />
                    <i class={cls2} id="errspan" onClick={showhidePassword2}></i>
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="error-message">{errors.confirmPassword}</div>
                    ) : null}

                  </div></>
}
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

export default Createuser;


