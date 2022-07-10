import React, { useEffect, useRef, useState } from "react";
import { notify } from "../../../constants/notify";
import { httpClient } from "../../../constants/httpClient";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Edit, Add, Delete } from "@material-ui/icons";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ErrorMessage, Formik } from "formik";
import { Form, Field } from "formik";
import Checkbox from "@mui/material/Checkbox";
import Select from "react-select";
import "./summaryReport.css";
function Summarydetailreport(props) {
  const [userdata, setuserdata] = useState([]);
  const [showpic, setshowpic] = useState(false);
  const [titlename, settitlename] = useState("Report");
  const [details, setdetails] = useState({
    kitta: "",
    amount: "",
    
      isMinor: false,
      name: "",
      boid: "",
      name:"",
      phoneNumber: "",
      email: "",
      grandfatherName: "",
      fatherName: "",
      panNo: "",
    citizenshipDetails: {
      citizenshipFrontImage: "",
      citizenshipNo: "",
      citizenshipBackImage: "",
      citizenshipIssuedDistrictId: "",
      issudeDate: "",
    },
    mainorDetails:{
      mainorIdNumber:"",
      birthCertificateIssueDate: "",
      birthCertificateImage: "",
      guardianName:'',
      guardianRelationship:'',
      guardianCitizenshipNumber:'',
      guardianCitizenshipFrontImage: "",
      guardianCitizenshipBackImage: "",
      guardianCitizenshipIssuedDistrictId: "",
      guardianIssudeDate: "",
    },
    temporaryAddress: {
      provience: "",
      district: "",
      localMunicipality: "",
      wardNo: "",
      tole: ""
    },
    
      bankname: "",
      branchname: "",
      accountType: "",
      accountNo: "",
    
    
      provience: "",
      district: "",
      localMunicipality: "",
      wardNo: "",
      tole: ""
    
  })


  const handleswal=(e,datas)=>{
    
    let ids=datas.ipoapplyid;
    props.history.push('/approvereject', ids)

  }

  
  const agentapi = async () => {
      let values={
        pageNumber: 0,
        pageSize: 150,
        ipoId: props.history.location.state,
        status: 1
      }
      
    httpClient
      .POST("api/applicant/list-all/by-ipo", values,false, true,"values")
      .then((resp) => {
          
        setuserdata(resp.data.data.content);
      })
      .catch((err) => {
        
      });
  };

  const handlepending=()=>{
      settitlename("Pending Report")
    let values={
        pageNumber: 0,
        pageSize: 150,
        ipoId: props.history.location.state,
        status: 1
      }
      
    httpClient
      .POST("api/applicant/list-all/by-ipo", values,false, true,"values")
      .then((resp) => {
          
        setuserdata(resp.data.data.content);
      })
      .catch((err) => {
        
      });
  };
  const handleapproved=()=>{
    settitlename("Approved Report")
    let values={
        pageNumber: 0,
        pageSize: 150,
        ipoId: props.history.location.state,
        status: 2
      }
      
    httpClient
      .POST("api/applicant/list-all/by-ipo", values,false, true,"values")
      .then((resp) => {
          
        setuserdata(resp.data.data.content);
      })
      .catch((err) => {
        
      });
  };
  const handlerejected=()=>{
    settitlename("Rejected Report")
    let values={
        pageNumber: 0,
        pageSize: 150,
        ipoId: props.history.location.state,
        status: 3
      }
      
    httpClient
      .POST("api/applicant/list-all/by-ipo", values,false, true,"values")
      .then((resp) => {
          
        setuserdata(resp.data.data.content);
      })
      .catch((err) => {
        
      });
  };
  
  useEffect(() => {
    agentapi();
    
  }, []);


const handleshowpic=(value)=>{
  setshowpic(!showpic)
  
}


  const tableRef = React.createRef();
  return (
    <div className="create-user">
      {/* <p className="text04">Ipo Detail Report</p> */}
      <div className="btns-div">
        <div className="all-btn" >
          <button className="three-btn" onClick={handlepending}>Pending</button>
          <button className="three-btn" onClick={handleapproved}>Approved</button>
          <button className="three-btn" onClick={handlerejected}>Rejected</button>
        </div>
      </div>
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
              paging:true,
              paginationType:'stepped',
              showFirstLastPageButtons:false,
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
            title={titlename}
            columns={[
              // "id" : 31,
              { title: "S.N", render: (rowData) => rowData.tableData.id + 1 },
              { title: "Name", field: "fullname" },
              { title: "BOID", field: "boid" },
              { title: "Applied Quantity", field: "appliedkitta" },
              { title: "Mobile no", field: "mobileno" },
              { title: "Email", field: "email" },
            //   { title: "Applied From", field: "companyname" },
              { title: "Status", field: "status" }, //accepted rejeted
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
            components={{
              Action: props => (
                <button
                onClick={(event) => props.action.onClick(event, props.data)}
                  color="primary"
                  variant="contained"
                  className="view-btn"
                  style={{textTransform: 'none'}}
                  size="small"
                >
                  View Details
                </button>
              ),
            }}
            actions={[
              // {
              //   icon: Add,
              //   tooltip: "Add User",
              //   isFreeAction: true,
              // },
              // {
              //   icon: Edit,
              //   tooltip: "Edit User",
              //   onClick: (e, rowData) => {
              //     handleEdit(e, rowData);
              //   },
              // },
              
              {
                icon: () => (
                    <i class="fas fa-eye fa-xs"></i>
                ),
                onClick: (e, rowData) => {
                      handleswal(e, rowData);
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
  );
}

export default Summarydetailreport;
