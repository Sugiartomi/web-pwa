import React from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";

function KYCTakePhotoDocument() {
  const navigate = useNavigate();
  const path = useLocation();

  return (
    <>
      <div className="container text-roboto">
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/kyc/identity-verification", { state: path.state })}>
            <ChevronLeft />
          </p>
        </div>

        <button type="button" className="btn btn-success mt-5 mx-auto d-block" onClick={() => navigate("/kyc/upload-selfie")}>
          Take Photo
        </button>
      </div>
    </>
  );
}

export default KYCTakePhotoDocument;
