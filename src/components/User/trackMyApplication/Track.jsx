import React, { useEffect, useState } from "react";
import "./track.css";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import Logo from "../../../assests/images/logo.png";
import Trackerverify from "../../validation/trackerVerify";
import * as XLSX from "xlsx";
import { httpClient } from "../../../constants/httpClient";
import Swal from "sweetalert2";

function Track(props) {
  const [show, setshow] = useState(false);
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
  const [handleboid, sethandleboid] = useState(true);
  const [dropdowns, setdropdowns] = useState([]);
  const [optiontype, setoptiontype] = useState();
  const EXTENSIONS = ["xlsx", "xls", "csv"];

  const handlerejected = () => {
    
    setshow(true);
  };
  const handletype = (e) => {
    
    let id = e.target.value;

    setoptiontype(id);
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

  const importExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      // 
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);

      //removing header
      fileData.splice(0, 1);

      setData(convertToJson(headers, fileData));
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file input, Select Excel, CSV file");
      }
    } else {
      setData([]);
      setColDefs([]);
    }
  };

  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  return (
    <div>
      <div className="track-logo">
        <img src={Logo} alt="" onClick={()=>props.history.push('/')}/>
      </div>
      <div className="btns-div">
        <Formik
          initialValues={{
            formNumber: "",
            shareholderNumber: "",
            boid: "",
            Name: "",
            Name: "",
            grandfatherName: "",
          }}
          // validationSchema={Trackerverify}
          onSubmit={async (values) => {
            let userdata = "";
            if (optiontype == "0") {
              userdata = {
                ipoId: 1,
                boidOrToken: values.boid,
              };
              httpClient
                .POST(
                  "api/get-result/boid-refs",
                  userdata,
                  false,
                  true,
                  "userdata"
                )
                .then((res) => {
                  let data = res.data.data.map((value) => {
                    
                    Swal.fire({
                      showConfirmButton: false,
                      showCloseButton: true,
                      allowOutsideClick: false,
                      html: `
                  <div class="track-ipo-result">
                    <p class="track-ipo-result-p">IPO Result</p>
                  </div>

                  <div class="track-pop-contrags">
                    <p class="track-congrats-p">Congratulation you have been allotted ${value.allottedkitta} kitta</p>
                  </div>

                  <div id="table" class="track-pop-table2">
                   <div class="track-pop-sub-table">
                     <div class="track-table-col">
                         <div>
                           <p class="track-pop-table-topic">Name :</p>
                           <p class="track-pop-table-topic">Company Name :</p>
                         </div>
                         <div>
                           <p class="track-pop-table-subtopic">${value.applicantname}</p>
                           <p class="track-pop-table-subtopic">${value.companyname}</p>
                         </div>
                     </div>
                     <div class="track-table-col">
                         <div>
                           <p class="track-pop-table-topic">Applied Kitta :</p>
                           <p class="track-pop-table-topic">Allotted Kitta :</p>
                         </div>
                         <div>
                           <p class="track-pop-table-subtopic">${value.appliedkitta}</p>
                           <p class="track-pop-table-subtopic">${value.allottedkitta}</p>
                         </div>
                     </div>
                   </div>
                  </div>`,
                    });
                  });
                })
                
                  .catch((res)=>{
                  
                    Swal.fire({
                      title: 'Sorry not Allotted !',
                      // text: "Sorry not Allotted !",
                      icon: 'warning',
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'OK'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        props.history.push('/tracking')
                      }
                    })
                });
            } else if (optiontype == "1") {
              userdata = {
                name: values.Name,
                fatherName: values.fatherName,
                ipoId: 1,
              };
              httpClient
                .POST("api/get-result/names", userdata, false, true, "userdata")
                .then((res) => {
                  
                  let data = res.data.data.map((value) => {
                    
                    
                    Swal.fire({
                      showConfirmButton: false,
                      showCloseButton: true,
                      allowOutsideClick: false,
                      html: `
                      <div class="track-ipo-result">
                        <p class="track-ipo-result-p">IPO Result</p>
                      </div>

                      <div class="track-pop-contrags">
                        <p class="track-congrats-p">Congratulation allotted !! Allotted Quantity ${value.allottedkitta} kitta</p>
                      </div>

                     <div id="table" class="track-pop-table2">
                      <div class="track-pop-sub-table">
                          <div class="track-table-col">
                              <div>
                                <p class="track-pop-table-topic">Name :</p>
                                <p class="track-pop-table-topic">Company Name :</p>
                              </div>
                              <div>
                                <p class="track-pop-table-subtopic">${value.applicantname}</p>
                                <p class="track-pop-table-subtopic">${value.companyname}</p>
                              </div>
                          </div>
                          <div class="track-table-col">
                              <div>
                                <p class="track-pop-table-topic">Applied Kitta :</p>
                                <p class="track-pop-table-topic">Allotted Kitta :</p>
                              </div>
                              <div>
                                <p class="track-pop-table-subtopic">${value.appliedkitta}</p>
                                <p class="track-pop-table-subtopic">${value.allottedkitta}</p>
                              </div>
                          </div>
                        </div>
                     </div>
              
                `,
                    });
                    
                  });
                })
                .catch((res)=>{
                  
                  Swal.fire({
                    title: 'Sorry not Allotted !',
                    // text: "Sorry not Allotted !",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      props.history.push('/tracking')
                    }
                  })

             
              
                })
                
            }
          }}
        >
          {({ errors, touched }) => (
            <Form autocomplete="off" novalidate>
              <div className="track-grid">
                <div className="track-field">
                  <label className="track-label">Option</label>
                  <Field
                    as="select"
                    name="option"
                    className="track-form-select"
                    placeholder="Select"
                    onClick={(e) => handletype(e)}
                  >
                    <option style={{ display: "none" }}></option>
                    <option value="0">Boid/Reference Id</option>
                    <option value="1">Name</option>
                    <option value="2">Token</option>
                  </Field>
                </div>

                {optiontype == "1" ? (
                  <>
                    <div className="track-field">
                      <label className="track-label">Name</label>
                      <Field
                        name="Name"
                        className="track-form-input"
                        placeholder="Name"
                      />
                      {errors.Name && touched.Name ? (
                        <div className="error-message">{errors.Name}</div>
                      ) : null}
                    </div>
                    <div className="track-field">
                      <label className="track-label">Father Name</label>
                      <Field
                        name="fatherName"
                        className="track-form-input"
                        placeholder="Father Name"
                      />
                      {errors.fatherName && touched.fatherName ? (
                        <div className="error-message">{errors.fatherName}</div>
                      ) : null}
                    </div>
                  </>
                ) : null}
                {optiontype == "2" ? (
                  <div className="track-field">
                    <label className="track-label">Form Number</label>
                    <Field
                      name="formNumber"
                      className="track-form-input"
                      placeholder="Form Number"
                    />
                    {errors.formNumber && touched.formNumber ? (
                      <div className="error-message">{errors.formNumber}</div>
                    ) : null}
                  </div>
                ) : null}
                {optiontype == "0" ? (
                  <div className="track-field">
                    <label className="track-label">BOID/Reference ID</label>
                    <Field
                      name="boid"
                      className="track-form-input"
                      placeholder="BOID/Reference ID"
                    ></Field>

                    {errors.boid && touched.boid ? (
                      <div className="error-message">{errors.boid}</div>
                    ) : null}
                  </div>
                ) : null}
                <div className="track-check-btn-main-div">
                  <button
                    className="ipo-allo-check-btn"
                    // onClick={handlerejected}
                    type="submit"
                  >
                    Check
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

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

        {/* <select className='track-select'>
              <option>IPO</option>
          </select>
          <input 
            className='track-input'
            type='text'
            onChange={(e)=>setboidchange(e.target.value)}
            value={boidchange}
            placeholder={handleboid?'BOID':'Reference Id'}
          />
          
          <button className="track-btn" onClick={handlerejected}>Check</button>
          <div className='checkboxbox'>
            {handleboid?
            <><input className='checkbox' onClick={() => sethandleboid(!handleboid)} type='checkbox' /><span className='noboid'>No BOID</span></>
            :
            <><input className='checkbox' onClick={() => sethandleboid(!handleboid)} type='checkbox' unChecked /><span className='noboid'>Reference</span></>
            }
            
          </div> */}
      </div>

      {/* <div className="create-user track-table">
        <div className="track-file-upload1">
          <p className="text04">Report</p>
          <div className="track-f-u-sub">
            <button className="ctzn-up-fi-btn">
              <div>
                <span id="spa-fi-up-p">Upload File</span>
              </div>
              <div>
                {" "}
                <span>
                  <i className="fas fa-upload"></i>
                </span>
              </div>
            </button>
            <input type="file" name="image" onChange={importExcel} />
          </div>
        </div>

        <Row className="rows-branch table-track">
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
              title="Data"
              data={data}
              columns={colDefs}
            />
          </Col>
        </Row>
      </div> */}
    </div>
  );
}

export default Track;
