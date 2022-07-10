import React, { useEffect, useRef, useState } from "react";
import { notify } from "../../../constants/notify";
import { httpClient } from "../../../constants/httpClient";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Edit, Add, Delete } from "@material-ui/icons";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

function Viewuser(props) {
  const [userdata, setuserdata] = useState([]);
  const agentapi = async () => {
    httpClient
      .GET("api/user/get-admins", false, true)
      .then((resp) => {
        
        let finalData = resp.data.data.map((item) => {
          if (item.activestatus == 0) {
            item.activestatus = "Inactive";
          } else {
            item.activestatus = "Active";
          }
          return item;
        });
        setuserdata(finalData);
      })
      .catch((err) => {
        
      });
  };

  const handleEdit = (e, rowData) => {
    props.history.push("/edituser", rowData);
  };

  const handleDelete = (e, rowData) => {
    
    let value=rowData.id
    let data={
     id:value,
    }
    httpClient
      .PUT(`api/user/change-status`,data, false, true,'data')
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
      <p className="text04">User</p>

      <div>
        <Link to="../createuser">
          <button className="btn-details">User Details</button>
        </Link>

        <button className="btn-details" id="btn-selected">
          User View
        </button>
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
            title="User"
            columns={[
              { title: "S.N", render: (rowData) => rowData.tableData.id + 1 },
              { title: "FullName", field: "fullname" },
              { title: "Username", field: "username" },
              { title: "Mobileno", field: "mobileno" },
              {
                title: "Status",
                field: "activestatus",
                cellStyle: (e, rowData) => {
                  if (rowData.activestatus == "Active") {
                    return { color: "#32CD32" };
                  } else {
                    return { color: "red" };
                  }
                },
              },
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
  );
}

export default Viewuser;
