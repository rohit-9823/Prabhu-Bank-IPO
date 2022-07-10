import React, { useEffect, useState } from "react";
import "./ipoAlloted.css";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import Logo from "../../../assests/images/logo.png";
function Ipoallocated() {
  const [show, setshow] = useState(false);
  const [dropdowns, setdropdowns] = useState([]);
  const [boidchange, setboidchange] = useState();
  const handlerejected = () => {
    
    setshow(true);
  };
  const handledropdown = () => {
    let data = {
      value: "ipo",
      label: "ipo",
    };
    setdropdowns(data);
  };
  useEffect(() => {
    handledropdown();
  }, []);

  return (
    <div>
      <div className="track-logo">
        <img src={Logo} alt="" />
      </div>
      <div className="btns-div">
        <div className="ipo-allot-main-input">
          {/* <Select
                              
                              options={dropdowns}
                              name="track-input"
                              onChange={(option) => (
                                // setselectedOption,
                                setFieldValue(
                                  `arrData[${index}].municipalityId`,
                                  option.value
                                )
                              )}
                            /> */}

          <select className="ipo-allot-select">
            <option>IPO</option>
          </select>
          <input
            className="ipo-allot-input"
            type="text"
            onChange={(e) => setboidchange(e.target.value)}
            value={boidchange}
            placeholder="BOID"
          />

          <button className="ipo-allo-check-btn" onClick={handlerejected}>
            Check
          </button>
        </div>
      </div>
      {show ? (
        <div className="create-user track-table">
          {/* <p className="text04">Summary Report</p> */}
          <Row className="rows-branch">
            <Col sm={12} className="cols">
              <Typography
                variant="h5"
                color="textSecondary"
                component="h2"
                gutterBottom
                style={{ padding: "20px 0px 10px 0px" }}
              ></Typography>
              <MaterialTable
                options={{
                  pageSize: 10,
                  search: true,
                  actionsColumnIndex: -1,
                  headerStyle: {
                    backgroundColor: "#cd171f",
                    color: "#FFF",
                    position: "sticky",
                    top: "0",
                  },
                  maxBodyHeight: "400px",
                }}
                title=""
                columns={[
                  // "id" : 31,
                  {
                    title: "S.N",
                    render: (rowData) => rowData.tableData.id + 1,
                  },
                  { title: "Ipo", field: "companyname" },
                  { title: "Issued Kitta", field: "noofshareissued" },
                  { title: "No of Applicant", field: "applicantsno" },
                  { title: "Applied Kitta", field: "appliedkitta" },
                  { title: "Subscribed", field: "suscribed" },

                  // {
                  //   title: "Status",
                  //   field: "activestatus",
                  //   cellStyle: (e, rowData) => {
                  //     if (rowData.activestatus == "Active") {
                  //       return { color: "#32CD32" };
                  //     } else {
                  //       return { color: "red" };
                  //     }
                  //   },
                  // },
                ]}
                // data={userdata}
                localization={{
                  pagination: {
                    previousAriaLabel: "",
                    previousTooltip: "",
                    nextAriaLabel: "",
                    nextTooltip: "Next page",
                    firstAriaLabel: "",
                    firstTooltip: "",
                    lastAriaLabel: "",
                    lastTooltip: "",
                  },
                }}
                components={{
                  Action: (props) => (
                    <button
                      onClick={(event) =>
                        props.action.onClick(event, props.data)
                      }
                      color="primary"
                      variant="contained"
                      className="view-btn"
                      style={{ textTransform: "none" }}
                      size="small"
                    >
                      View Details
                    </button>
                  ),
                }}
                actions={[
                  // {
                  //   icon: Edit,
                  //   tooltip: "Edit User",
                  //   onClick: (e, rowData) => {
                  //     handleEdit(e, rowData);
                  //   },
                  // },
                  {
                    icon: () => <i class="fas fa-eye fa-xs"></i>,
                    onClick: (e, rowData) => {
                      //   handleswal(e, rowData);
                    },
                    tooltip: "View User",
                  },

                  // {
                  //   icon: Delete,
                  //   tooltip: "Delete Record",
                  //   onClick: (e, rowData) => {
                  //     handleDelete(e, rowData);
                  //   },
                  // },
                ]}
              />
            </Col>
          </Row>
        </div>
      ) : null}
    </div>
  );
}

export default Ipoallocated;
