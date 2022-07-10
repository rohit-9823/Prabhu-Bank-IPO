import React from "react";
import { Formik } from "formik";
import Logo from "../../assests/images/logo.png";
import "./userform.css";

import { Form, Field } from "formik";

export default function IpoIssued() {
  return (
    <div className="ipoissued-body">
      <div className="ipoissued-body1">
        <div className="ipoissued-main-logo">
          <img src={Logo} alt="" />
        </div>
        <div className="apply-for-issue">
          <div className="apply-for-issue1">
            <p id="apply-for-issue">
              <span>
                <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
              </span>{" "}
              &nbsp; &nbsp;Apply for issue
            </p>
            <div className="apply-share-form">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">
                  Balephi Hydropower Limited. - General Public(BHL){" "}
                  <span id="ipoissued-p-ipo">IPO</span>{" "}
                  <span id="ipoissued-share-type">Ordinary Share</span>
                </p>
              </div>
              <div>
                <Formik>
                  <Form>
                    <div className="share-apply-form1">
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Issue Manager</label>
                        </div>
                        <Field></Field>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Issue open date</label>
                        </div>
                        <Field></Field>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Issue close date</label>
                        </div>
                        <Field></Field>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Number of share issued</label>
                        </div>
                        <Field></Field>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Price per share</label>
                        </div>
                        <Field></Field>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Prospectus</label>
                        </div>
                        <button>Download prospectus</button>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Offer letter</label>
                        </div>
                        <button>Download offer letter</button>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Forms</label>
                        </div>
                        <button>Download forms</button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>

            {/* p
                e
                r
                s
                o
                n
                a
                l Detal form here           */}
            <div className="apply-share-form personal-info-form">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">Bank Details</p>
              </div>
              <div>
                <Formik>
                  <Form>
                    <div className="share-apply-form1">
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Bank name</label>
                        </div>
                        <Field placeholder="Bank name"></Field>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Account number</label>
                        </div>
                        <Field placeholder="Account number"></Field>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Bank Branch</label>
                        </div>
                        <Field placeholder="Bank branch"></Field>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
            <div className="apply-share-form personal-info-form">
              <div className="ipo-issued-brief iib-border-bottom">
                <p id="ipo-issued-name">Share Details</p>
              </div>
              <div>
                <Formik>
                  <Form>
                    <div className="share-apply-form1">
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Applied Kitta</label>
                        </div>
                        <Field placeholder="Kitta in number"></Field>
                      </div>
                      <div className="form-input-share">
                        <div>
                          <label htmlFor="">Amount</label>
                        </div>
                        <Field placeholder="Amount in number"></Field>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
