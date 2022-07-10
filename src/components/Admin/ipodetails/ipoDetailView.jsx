import React, { useEffect, useState } from "react";
import { notify } from "../../../constants/notify";
import { httpClient } from "../../../constants/httpClient";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Edit, Add, Delete } from "@material-ui/icons";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import "./ipodetails.css";

function Viewipodetail(props) {
  const [userdata, setuserdata] = useState([]);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    
    userapi();
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const userapi = async () => {
    httpClient
      .GET("api/ipo/get-all", false, true)
      .then((resp) => {
        let finaldata=resp.data.data.map((value)=>{
          if(value.shareType==0){
            value.shareType='Ordinary Share'
          }
          return value
        })
        setuserdata(finaldata);
      })
      .catch((err) => {
        
      });
  };

  const handleEdit = (e, rowData) => {
    props.history.push("/ipodetails",rowData)
  };

  const handleDelete = (e, rowData) => {
    
    let id = rowData.id;
    httpClient
      .DELETE(`api/ipo/${id}`, false, true)
      .then((resp) => {
        notify.success(resp.data.message);
        

        setTimeout(() => {
          userapi();
        }, 2000);
      })
      .catch((err) => {
        
      });
  };
  const tableRef = React.createRef();
  return (
    <div>
      <div className="buttons-line">
        <Link to="../ipodetails">
          <button className="btn-details">IPO Detail</button>
        </Link>
        <button className="btn-details" id="btn-selected">
          View IPO
        </button>
      </div>
      <div className="view-body">
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
              title="IPO"
              columns={[
                { title: "S.N", render: (rowData) => rowData.tableData.id + 1 },
                { title: "Company Name", field: "companyName" },
                { title: "Share Type", field: "shareType" },
                { title: "Issue Manager", field: "issueManager" },
                { title: "Start Date", field: "startDate" },
                { title: "End Date", field: "endDate" },
                { title: "No. of Shared Issues", field: "noOfShareIssued" },
                { title: "Price Per Share", field: "pricePerShare" },
                { title: "IPO Deatils", field: "ipoDetails" },
                  { title: "Status", field: "activeStatus"  ,  cellStyle: (e, rowData) => {
            
                    if (rowData.activeStatus==true) {
                      return { color:"#32CD32" };
                    }
                    else{
                      return{color:'red'}
                    }
                  },},
              ]}
              data={userdata}
              localization={{
                pagination: {
                  previousAriaLabel: "",
                  previousTooltip: "",
                  nextAriaLabel: "",
                  nextTooltip: "",
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
                {
                  icon: Edit,
                  tooltip: "Edit User",
                  onClick: (e, rowData) => {
                    handleEdit(e, rowData);
                  },
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
    </div>
  );
}

export default Viewipodetail;
