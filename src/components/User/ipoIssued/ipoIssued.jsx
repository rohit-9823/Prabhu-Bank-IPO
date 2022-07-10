import React, { useEffect, useState } from "react";
import Logo from "../../../assests/images/logo.png";
import { httpClient } from "../../../constants/httpClient";
import { notify } from "../../../constants/notify";
import { useHistory } from "react-router-dom";
import "./ipoIssued.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { setIpoDetails } from "../../../actions/userIpoActions";

export default function UseripoIssue(props) {
  let [ipoDescription, setIpoDescription] = useState([]);
  let history = useHistory();
  useEffect(() => {
    httpClient
      .GET("api/ipo/get-all/current")
      .then((resp) => {
        let data = resp.data.data.map((item) => {
          if (item.sharetype == "0" && item.ipotype == "1") {
            item.sharetype = "Ordinary Share";
            item.ipotype = "Right Share";
          } else if (item.sharetype == "0" && item.ipotype == "0") {
            item.ipotype = "Local Citizenship Application";
            item.sharetype = "Ordinary Share";
          }

          return item;
        });
        setIpoDescription(data);
      })
      .catch((err) => {
        notify.error("Not found");
      });
  }, []);
  // redux data and methods initialization
  let dispatch = useDispatch();
  let settingIpoDetails = bindActionCreators(setIpoDetails, dispatch);
  let userIpoData = useSelector((state) => state.userIpoDetails);

  // end of redux data and methods initialization

  const ProceedToApply = (ipoDetails) => {
    if (props.value != "agent") {
      settingIpoDetails(ipoDetails);
      history.push("/publicipo1");
    } else if (
      props.value == "agent" &&
      ipoDetails.ipotype == "Local Citizenship Application"
    ) {
      settingIpoDetails(ipoDetails);
      history.push("/agentapplyipo", ipoDetails.id);
    } else if (props.value == "agent" && ipoDetails.ipotype == "Right Share") {
      settingIpoDetails(ipoDetails);
      history.push("/rightshareform", ipoDetails.id);
    } else if (props.value != "agent" && ipoDetails.ipotype == "Right Share") {
      settingIpoDetails(ipoDetails);
      history.push("/rightshareform", ipoDetails.id);
    }
  };
  const handletrack = () => {
    props.history.push("/tracking");
  };
  const handleviewresult = () => {
    props.history.push("/ipoAlloted");
  };
  return (
    <div className="ipoissued-body ipoissued-body-wh">
      <div className="ipoissued-body1">
        {props.value == "agent" ? null : (
          <div className="ipoissued-main-logo">
            <img src={Logo} alt="" onClick={() => props.history.push("/")} />
            <div className="ipoissued-ml-buttons">
              <button
                className="btn-track-my-application"
                onClick={handletrack}
              >
                View Results
              </button>
              <button className="btn-view-result" onClick={handleviewresult}>
                Track My Application
              </button>
            </div>
          </div>
        )}
        <div className="apply-for-issue">
          <div className="apply-for-issue1">
            {props.value == "track" ? (
              <p id="apply-for-issue">IPO</p>
            ) : (
              <p id="apply-for-issue">Apply for issue</p>
            )}
            {ipoDescription.length ? (
              ipoDescription.map((item, index) => {
                return (
                  <div className="apply-ipo-issued">
                    <div className="ipo-issued-brief">
                      <p id="ipo-issued-name">
                        {item.companyname}{" "}
                        <span id="ipoissued-p-ipo">{item.ipotype}</span>{" "}
                        <span id="ipoissued-share-type">{item.sharetype}</span>
                      </p>
                    </div>

                    <div
                      className="apply-ipo-issued-btn"
                      onClick={() => ProceedToApply(item)}
                    >
                      <button>Apply</button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3>No any ipos have been listed currently</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
