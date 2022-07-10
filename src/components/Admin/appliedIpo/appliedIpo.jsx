import React, { useEffect, useRef, useState } from "react";
import { notify } from "../../../constants/notify";
import { httpClient } from "../../../constants/httpClient";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Edit, Add, Delete } from "@material-ui/icons";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../report/adminReport.css";
function Appliedipo(props) {
  const [userdata, setuserdata] = useState([]);
  const agentapi = async () => {
      let data={
          pageSize:5,
          pageNo:2,
      }
    httpClient
      .POST("api/applicant/get-all", data, false, true, "data")
      .then((resp) => {
        
        setuserdata(resp.data.data.content);
      })
      .catch((err) => {
        
      });
  };

  const handleEdit = (e, rowData) => {
    props.history.push("/policeunit", rowData);
  };

  const handleDelete = (e, rowData) => {

    let id = rowData.ID;
    httpClient
      .DELETE(`api/company/change-status/true/${id}`, false, true)
      .then((resp) => {
        notify.success(resp.data.message);
        setTimeout(() => {
          agentapi();
        }, 2000);
      })
      .catch((err) => {
        
      });
  };
  useEffect(() => {
    agentapi();
  }, []);
  const tableRef = React.createRef();
  return (
    <div className="create-user">
      <p className="text04">Applied Ipo</p>

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
            tableRef={tableRef}
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
            title="Applied Ipo"
            columns={[
              { title: "S.N", render: (rowData) => rowData.tableData.id + 1 },
              { title: "Minor", field: "isminor" },
              { title: "Gender", field: "gender" },
              { title: "Tole", field: "tole" },
              { title: "State", field: "statename" },
              { title: "District", field: "districtname" },
              { title: "Mobileno", field: "mobileno" },
              { title: "Municipality", field: "municipalityname" },
              { title: "Father Name", field: "fathername" },  
              { title: "Grandfather Name", field: "granfathername" },
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
            data={userdata}
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
            actions={[
              {
                icon: Add,
                tooltip: "Add User",
                isFreeAction: true,
              },
              // {
              //   icon: Edit,
              //   tooltip: "Edit User",
              //   onClick: (e, rowData) => {
              //     handleEdit(e, rowData);
              //   },
              // },

              {
                icon: () => <i class="fas fa-eye fa-xs"></i>,
                tooltip: "View User",
                onClick: (event, rowdata) =>
                  

                  Swal.fire({
                    showConfirmButton: false,
                    showCloseButton: true,
                    allowOutsideClick: false,
                    html: `
                <div class="right">
                
                
                <p style="margin: 2px 0px">Detail Information</p>
                
                </div><br>
                
                <table id="table" class="table2">
                <tbody>
                      <tr>
                        <td class="topic">Name :</td>
                        <td>${rowdata.name}</td>
                        <td></td>
                        <td class="topic">Phone No :</td>
                        <td>${rowdata.mobileno}</td>
  
                      </tr>
                      <tr>
                        <td class="topic">Father Name :</td>
                        <td>${rowdata.fathername}</td>
                        <td></td>
                        <td class="topic">Grand Father Name :</td>
                        <td>${rowdata.granfathername}</td>
  
                      </tr>
                      <tr>
                        <td class="topic">Citizenship No :</td>
                        <td>${rowdata.citizenshipno}</td>
                        <td></td>
                        <td class="topic">Issued Date :</td>
                        <td>${rowdata.issuedatenp}</td>
                      </tr>
                      <tr>
                        <td class="topic">BOID :</td>
                        <td>${rowdata.boid}</td>
                        <td></td>
                        <td class="topic">State :</td>
                        <td>${rowdata.statename}</td>
                      </tr>
                      <tr>
                        <td class="topic">District :</td>
                        <td>${rowdata.districtname}</td>
                        <td></td>
                        <td class="topic">Municipality :</td>
                        <td>${rowdata.municipalityname}</td>
                      </tr>
                      <tr>
                        <td class="topic">Tole :</td>
                        <td>${rowdata.tole}</td>
                        <td></td>
                        <td class="topic">Ward :</td>
                        <td>${rowdata.ward}</td>
                      </tr>
                
                </tbody>
        </table>`,
                  }),
              },

              {
                icon: Delete,
                tooltip: "Delete Record",
                onClick: (e, rowData) => {
                  handleDelete(e, rowData);
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Appliedipo;
