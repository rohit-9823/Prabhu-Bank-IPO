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
function Summaryreport(props) {
  const [userdata, setuserdata] = useState([]);
  const [showpic, setshowpic] = useState(false);
  const [titlename, settitlename] = useState("Pending Report");
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
    

    let ids=datas.id;

    // httpClient.GET(`api/applicant/get-all-by-id/${ids}`,false,true)
    // .then((res)=>{
    //   let datas=res.data.data
    //   setdetails({
    //     kitta: datas.kitta,
    // amount: datas.price,
    //   isMinor: false,
    //   name: "",
    //   boid: datas.boid,
    //   name:datas.name,
    //   phoneNumber: datas.mobileno,
    //   email: datas.email,
    //   grandfatherName: datas.granfathername,
    //   fatherName: datas.fathername,
    //   panNo: datas.panno,
    //   citizenshipNo: datas.citizenshipDetails.citizenshipnumber,
    //   citizenshipFrontImage: datas.citizenshipDetails.citizenshipfrontimage,
    //   citizenshipBackImage: datas.citizenshipDetails.      citizenshipbackimage,
    //   citizenshipIssuedDistrictId: datas.citizenshipDetails.citizenshipissuedistrict,
    //   issudeDate: datas.citizenshipDetails.citizenshipissuedate,

    //   mainorDetails:{
    //   mainorIdNumber:"",
    //   birthCertificateIssueDate: "",
    //   birthCertificateImage: "",
    //   guardianName:'',
    //   guardianRelationship:'',
    //   guardianCitizenshipNumber:'',
    //   guardianCitizenshipFrontImage: "",
    //   guardianCitizenshipBackImage: "",
    //   guardianCitizenshipIssuedDistrictId: "",
    //   guardianIssudeDate: "",
    //   },

    
    //   provience: datas.permanentAddress.state,
    //   district:  datas.permanentAddress.district,
    //   localMunicipality:  datas.permanentAddress.municipility,
    //   wardNo: datas.permanentAddress.ward,
    //   tole: datas.permanentAddress.tole,


    //   bankname: datas.bankname,
    //   branchname: datas.branchname,
    //   accountType: datas.accounttype,
    //   accountNo: datas.accountno,

    //   temporaryAddress: {
    //   provience: datas.temporaryAddress.state,
    //   district:  datas.temporaryAddress.district,
    //   localMunicipality:  datas.temporaryAddress.municipility,
    //   wardNo: datas.temporaryAddress.ward,
    //   tole: datas.temporaryAddress.tole,
    // },

    //   });
    // })
    // props.history.push('/viewapplyipo',datas.id)
    props.history.push('/summarydetailreport', ids)

  }

  
  const agentapi = async () => {
    httpClient
      .GET("api/ipo/get/ipo/summary", false, true)
      .then((resp) => {
        setuserdata(resp.data.data);
        
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
            title="Summary Report"
            columns={[
              // "id" : 31,
              { title: "S.N", render: (rowData) => rowData.tableData.id + 1 },
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

export default Summaryreport;
