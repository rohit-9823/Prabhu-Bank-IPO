import { React, useState,useEffect} from "react";
import Loginverify from "../validation/loginVerify";
import { Form, Field } from "formik";
import { Formik } from "formik";
import {Button} from "../Button-loader/Button-load"
import { toast } from "react-toastify";
import { httpClient } from "../../constants/httpClient";
import { useHistory } from "react-router-dom";
import "./login.css";
import Logo from "../../assests/images/logo.png"
function Login(props) {

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [showhide, setshowhide] = useState(false);

  const showhidePassword = () => {
    setshowhide(!showhide);
  };

  const history = useHistory();
  let cls = showhide ? "fas fa-eye" : "fas fa-eye-slash";
  useEffect(() => {
    localStorage.clear()
  }, []);

  return (
    <div className="body">
      {/* // Formik Started */}
      <Formik
        initialValues={{
          Username: "",
          password: "",
          state: true,
        }}
        validationSchema={Loginverify}
        onSubmit={async (values) => {
          
          let loginDetails = {
            username: values.Username,
            password: values.password,
            state: values.state,
          };
          httpClient
            .LOGIN("POST", "oauth/token", loginDetails, "password", null)
            .then((resp) => {
              let response = JSON.parse(resp);
              let { access_token, refresh_token, expires_in, status } =
                response;
              
              localStorage.setItem("dm-access_token", access_token);
              localStorage.setItem("dm-refresh_token", refresh_token);
              localStorage.setItem("timeout", expires_in);
              localStorage.setItem("status", status);
              localStorage.setItem("Logindata", JSON.stringify(values.state));
              setIsButtonLoading(false);
              {localStorage.getItem("status")=="MNOPQRSTUVW" ?
              props.history.push("/admindashboard")
              :
              props.history.push("/agentdashboard")
            
            }

              //window.location.reload()
              toast.success("Successfully Logged in", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
              });
            })
            .catch((err) => {
              setIsButtonLoading(false);
              toast.error("Bad Credential !!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
              });
            });
        }}
      >
        {({ errors, touched }) => (
          // Formik form started
          <Form autocomplete="off" novalidate>
            <div className="content">
              <div class="logo"><img src={Logo}/></div>

              <div class="login_content">
                {/* Upper Display Part */}
                <p class="login-login">Login</p>
                {/* Form Started */}
                {/* Username Form Started */}
                <Field
                  name="Username"
                  placeholder="Email Address"
                  className={`form-control shadow-none login-input ${
                    errors.Username && touched.Username && "is-invalid"
                  }`}
                />


                {errors.Username && touched.Username ? (
                  <div className="error-message">{errors.Username}</div>
                ) : null}

                {/* Username form ended */}
                {/* password form started */}

                <Field
                  name="password"
                  type={showhide ? "text" : "password"}
                  placeholder="Password"
                  className={`form-control shadow-none login-input ${
                    errors.password && touched.password && "is-invalid"
                      ? "redborder"
                      : null
                  } `}
                />
                <i class={cls} id="errspan" onClick={showhidePassword}></i>

                {errors.password && touched.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
                {/* password form ended */}
                <div className="login-line">
                  <input type="checkbox" class="check"/>
                  <div className="login-rememberme">Remember Me</div>
                  <div class="login-forgotpassword">Forgot Password?</div>
                </div>
                <Button
                  type="submit"
                  onClick={() => {
                    setIsButtonLoading(true);
                    setTimeout(() => {
                      setIsButtonLoading(false);
                    }, 1100);
                  }}
                  isLoading={isButtonLoading}
                  class="btn btn-primary login-button"
                >
                  Login
                </Button>
                {/* <div className="login-bottom-text">Don't have account yet? <div className="login-register">Register here</div></div> */}
                {/*Form ended */}
              </div>
              <div className="login-text-bottom">Use the application according to the policy rules. Any kind of violations will be subjected to sanctions.</div>
            </div>
          </Form>
          // Formik form ended
        )}
      </Formik>
      {/* Formik ended */}
    </div>
  );
}

export default Login;
