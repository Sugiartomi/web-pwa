import React from "react";
import { useNavigate } from "react-router-dom";
import VerificationProcessImg from "../assets/KYC/verification-kyc.svg";

function KYCVerivicationProcess() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container text-roboto">
        <div className="col-11 text-center center-page-success-kyc">
          <img src={VerificationProcessImg} alt="" className="img-fluid mx-auto d-block" />
          <p className="font-24 fw-bold">Your verification is being processed</p>
          <p className="font-14">We'll get back to you within 1×24 hours, so just relax. We'll let you know once the process is complete.</p>
        </div>
      </div>

      {/* fixed button */}
      <div className="fixed-button pb-2 px-2 col-12 width-breakpoint" style={{ maxWidth : "14cm"}}>
        {/* button */}
        <div className="d-grid col-12">
          <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => navigate("/my-profile")}>
            OK
          </button>
        </div>
      </div>
    </>
  );
}

export default KYCVerivicationProcess;
