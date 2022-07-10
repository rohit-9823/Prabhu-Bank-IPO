import { httpClient } from "../../../constants/httpClient";
import React, { useEffect, useState } from "react";
import Logo from "../../../assests/images/logo.png";
import { notify } from "../../../constants/notify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { setIpoDetails } from "../../../actions/userIpoActions";
function Listingrightshare(props) {
  let [ipoDescription, setIpoDescription] = useState([]);
  let history = useHistory();
  useEffect(() => {
    let data = {
      pageNo: 0,
      pageSize: 2,
      ipoId: 1,
    };
    httpClient
      .POST("api/right-share/list-all", data, false, true, "data")
      .then((res) => {
        setIpoDescription(res.data.data.content);
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
    settingIpoDetails(ipoDetails);
  };
  const handletrack = () => {
    props.history.push("/track");
  };
  const handleviewresult = () => {
    props.history.push("/ipoAlloted");
  };
  return (
    <div className="ipoissued-body ipoissued-body-wh">
      <div className="ipoissued-body1">
        {props.value == "agent" ? null : (
          <div className="ipoissued-main-logo">
            <img src={Logo} alt="" />
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
            <p id="apply-for-issue">Apply for issue</p>
            {ipoDescription.length ? (
              ipoDescription.map((item, index) => {
                return (
                  <div className="apply-ipo-issued">
                    <div className="ipo-issued-brief">
                      <p id="ipo-issued-name">
                        {item.companyname}{" "}
                        <span id="ipoissued-p-ipo">{item.ipotype}</span>{" "}
                        <span id="ipoissued-share-type">
                          {item.issuemanager}
                        </span>
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

export default Listingrightshare;
