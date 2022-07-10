import React, { useEffect, useState } from "react";
import Logo from "../../../assests/images/logo.png";
import { httpClient } from "../../../constants/httpClient";
import { notify } from "../../../constants/notify";
import { useHistory } from "react-router-dom";
import "./ipoIssued.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { setIpoDetails } from "../../../actions/userIpoActions";
export default function Agentipoissued(props) {
  let [ipoDescription,setIpoDescription]=useState([])
  let history=useHistory()
  useEffect(()=>{
    httpClient.GET("api/ipo/get-all/current")
    .then(resp=>{
      setIpoDescription(resp.data.data)
    })
    .catch(err=>{
      notify.error("Not found")
    })
  },[])
  // redux data and methods initialization
  let dispatch=useDispatch()
  let settingIpoDetails=bindActionCreators(setIpoDetails,dispatch)
  let userIpoData=useSelector((state)=>state.userIpoDetails)
  
  // end of redux data and methods initialization

  const ProceedToApply=(ipoDetails)=>{
    if(props.data!='agent'){
    settingIpoDetails(ipoDetails)
    history.push("/")
    }
    else{
      settingIpoDetails(ipoDetails)
    history.push("/agentapplyipo")
    }
  }
  useEffect(() => {
    
  }, [])
  
  return (
    <div className="ipoissued-body ipoissued-body-wh">
      <div className="ipoissued-body1">
        <div className="ipoissued-main-logo">
          <img src={Logo} alt="" />
        </div>
        <div className="apply-for-issue">
          <div className="apply-for-issue1">
            <p id="apply-for-issue">Apply for issue</p>
            {
              ipoDescription.length?
                ipoDescription.map((item,index)=>{
                    return <div className="apply-ipo-issued">
                    <div className="ipo-issued-brief">
                      <p id="ipo-issued-name">
                        {item.companyname}{" "}
                        <span id="ipoissued-p-ipo">{item.ipotype}</span>{" "}
                        <span id="ipoissued-share-type">{item.sharetype}</span>
                      </p>
                    </div>
                    <div className="apply-ipo-issued-btn" onClick={()=>ProceedToApply(item)}>
                      <button>Apply</button>
                    </div>
                  </div>
                })

            :<h3>No any ipos have been listed currently</h3>
            }

          </div>
        </div>
      </div>
    </div>
  );
}
