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
import * as XLSX from "xlsx"
import "./adminReport.css";
function Adminreport(props) {
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
    props.history.push('/approvereject', ids)

  }

  
  const agentapi = async () => {
    httpClient
      .GET("api/applicant/get-admin/1", false, true)
      .then((resp) => {
        setuserdata(resp.data.data);
      })
      .catch((err) => {
        
      });
  };

  const handlepending=()=>{
    settitlename("Pending Report")
    httpClient
    .GET(`api/applicant/get-admin/1`,false, true)
    .then((resp) => {     
      let finalData = resp.data.data.map((item) => {
        return item;
      });
      setuserdata(finalData);
    })
    .catch((err) => {
      
    });
  }
  const handleapproved=()=>{
    settitlename("Approved Report")
    httpClient
    .GET(`api/applicant/get-admin/2`,false, true)
    .then((resp) => {     
      let finalData = resp.data.data.map((item) => {
        return item;
      });
      setuserdata(finalData);
    })
    .catch((err) => {
      
    });
  }
  const handlerejected=()=>{
    settitlename("Rejected Report")
    httpClient
    .GET(`api/applicant/get-admin/3`,false, true)
    .then((resp) => {     
      let finalData = resp.data.data.map((item) => {
        return item;
      });
      setuserdata(finalData);
    })
    .catch((err) => {
      
    });
  }
  
  useEffect(() => {
    agentapi();
  }, []);


const handleshowpic=(value)=>{
  setshowpic(!showpic)
  
}
const downloadExcel=()=>{
  const workSheet=XLSX.utils.json_to_sheet(userdata)
  const workBook=XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workBook,workSheet,"Record")
  //Buffer
  let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
  //Binary string
  XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
  //Download
  XLSX.writeFile(workBook,"RecordData.xlsx")
}


  const tableRef = React.createRef();
  return (
    <div className="create-user">
      {/* <p className="text04">Report</p> */}
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
              filtering:true,
              paging:true,
              pageSizeOptions:[5,10,15,20,25,50,100],
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
              { title: "Name", field: "applicantname" },
              { title: "BOID", field: "boid" },
              { title: "Applied Quantity", field: "appliedquantity" },
              { title: "Ipo", field: "companyname" },
              { title: "Email", field: "email" },
              { title: "Mobile no", field: "mobileno" },
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
                icon: () => (
                    <i class="fas fa-eye fa-xs"></i>
                ),
                onClick: (e, rowData) => {
                      handleswal(e, rowData);
                    },
                tooltip: "View User",
              },
              {
                  
                icon:()=>(<i class="fa-solid fa-file-excel"></i>),
                tooltip: "Download Record",
                onClick: (e, rowData) => {
                  downloadExcel();
                },
                isFreeAction:true,
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

export default Adminreport;
