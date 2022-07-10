import { useState } from "react";
import { Redirect } from "react-router";
import { Route } from "react-router";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import "./routing.css";
import { useHistory } from "react-router-dom";
import { httpClient } from "../constants/httpClient";
const AgentprotectedRoute = ({ component: Component, ...rest }) => {
  const history=useHistory()
  
    const expiry_time = localStorage.getItem("timeout");
  
    setTimeout(() => {
      localStorage.removeItem("access-token");
      const refresh_token = localStorage.getItem("refresh_token");
      const data = {};
      data.refresh_token = refresh_token;
      if (refresh_token) {
        httpClient
          .UPLOAD("POST", "oauth/token", data, "refresh_token", null)
          .then((resp) => {
            let response = JSON.parse(resp);
            localStorage.setItem("dm-access_token", response.access_token);
            localStorage.setItem("dm-refresh_token", response.refresh_token);
            localStorage.setItem("timeout", response.expires_in);
            localStorage.setItem("status", response.status);
          })
          .catch((err) => {
            // notify.error(err);
            history.push('/login')
          });
      } else {
        history.push('/login')
      }
    }, expiry_time);
    return (
        <Route
          {...rest}
          render={(routeProps) => {
            return (localStorage.getItem("status")=="klmnopqrs") ? (
              <div  className="grid-body">                
                <Sidebar />
                <div className="grid-side">
                  <Navbar />
                  <Component {...routeProps}></Component>
                </div>                
              </div>
            ) : (
              <Redirect
                to={{
                  pathname: "/admindashboard",
                  timeoutMsg: "session expired please Login again",
                }}
              ></Redirect>
            );
          }}
        ></Route>
      );
}
export default AgentprotectedRoute