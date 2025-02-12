import React from "react";
import { ChevronLeft, XCircle, XCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import SuccessUploadDocument from "../assets/KYC/success-upload-document-kyc.svg";
import KTPKycImg from "../assets/KYC/KTP-kyc.svg";
import SuccessUploadSelfieImg from "../assets/KYC/success-upload-selfie-kyc.svg";

function KYCPreviewPage() {
  const navigate = useNavigate();
  return (
    <div className="container text-roboto mb-3">
      <div className="d-flex pt-2">
        <p className="font-20" onClick={() => navigate("/kyc/identity-verification")}>
          <ChevronLeft />
        </p>
        <p className="font-20 fw-bold" style={{ marginLeft: "130px" }}>
          Preview
        </p>
      </div>

      <img src={SuccessUploadDocument} alt="" className="img-fluid mx-auto d-block mt-3" />
      <p className="font-17 fw-bold text-center mt-3 mb-0">
        Your file has been <br /> uploaded successfully
      </p>

      <img src={KTPKycImg} alt="" className="img-fluid mx-auto d-block" style={{ width: "200px", height: "200px" }} />
      <img src={SuccessUploadSelfieImg} alt="" className="img-fluid mx-auto d-block" />
      <p className="font-14 text-center font-red mt-4" onClick={() => navigate("/kyc/take-photo-document")}>
        <XCircle /> Remove Document
      </p>

      {/* button */}
      <div className="d-grid col-12">
        <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => navigate("/kyc/input-personal-information")}>
          Next
        </button>
      </div>
    </div>
  );
}

export default KYCPreviewPage;
