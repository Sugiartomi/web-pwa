import React from "react";
import { useNavigate } from "react-router-dom";
import SuccessFaceDetectionImg from "../assets/KYC/success-face-detection-kyc.svg";

function KYCSFaceDetectionSuccessPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container text-roboto">
        <div className="center-page-success-kyc col-12">
          <img src={SuccessFaceDetectionImg} alt="" className="img-fluid mx-auto d-block" />
          <p className="font-18 fw-bold text-center">Face Detection Success</p>
          <p className="text-center font-14">
            You have successfully <br /> passed liveness detection test
          </p>
        </div>
      </div>

      {/* fixed button */}
      <div className="fixed-button pb-2 px-2 col-12 width-breakpoint" style={{ maxWidth : "14cm"}}>
        {/* button */}
        <div className="d-grid col-12">
          <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => navigate("/kyc/verification-process")}>
            Done
          </button>
        </div>
      </div>
    </>
  );
}

export default KYCSFaceDetectionSuccessPage;
