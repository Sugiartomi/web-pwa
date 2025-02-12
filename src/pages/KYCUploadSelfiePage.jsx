import React from "react";
import { ChevronLeft, ExclamationCircleFill, Upload } from "react-bootstrap-icons";
import { AiFillLock } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import ExampleUploadSelfie from "../assets/KYC/example-upload-selfie-kyc.svg";

function KYCUploadSelfiePage() {
  const navigate = useNavigate();
  const path = useLocation();

  return (
    <>
      <form action="">
        <div className="container text-roboto mb-3">
          <div className="d-flex pt-2">
            <p className="font-20" onClick={() => navigate("/kyc/identity-verification", { state: path.state })}>
              <ChevronLeft />
            </p>
            <p className="font-20 fw-bold" style={{ marginLeft: "70px" }}>
              Identity Verification
            </p>
          </div>

          {/* attention */}
          <div className="p-3 bg-warning-custom d-flex mt-4">
            <p className="font-yellow mb-0">
              <ExclamationCircleFill />
            </p>
            <div>
              <p className="font-16 fw-bold ms-2 mb-0">Attention</p>
              <ul className="font-11 mb-0">
                <li>ID card photo must be in colo</li>
                <li>All parts of the identity must be clearly visible</li>
                <li>ID card photo must not be slanted</li>
                <li>The text on the identity card must be clearly visible (not blurry)</li>
              </ul>
            </div>
          </div>

          {/* example upload selfie */}
          <img src={ExampleUploadSelfie} alt="" className="img-fluid mt-3 mx-auto d-block" />

          {/* upload ktp */}
          <div className="mt-4" style={{ color: "#8391A1" }}>
            <div className="border rounded p-4 position-relative" style={{ height: "168.23px" }}>
              <div className="position-absolute top-50 start-50 translate-middle">
                <p className="text-center mb-0 font-30 align-items-center">
                  <Upload />
                </p>
                <p className="text-center mb-0 font-14">Upload File</p>
                <input type="file" className="form-control" />
              </div>

              {/* <input type="file" className="form-control border-0 bg-white" /> */}
            </div>
            <p className="text-center font-12 mt-2">Maximum file 3mb dengan tipe JPG & PNG.</p>
          </div>
          {/* info */}
          <div className="d-flex p-2 mt-4 align-items-center" style={{ backgroundColor: "#E7E8F6" }}>
            <p className="font-dark mb-0">
              <AiFillLock />
            </p>
            <p className="font-10 ms-2 mb-0">Your data is fully protected in our system and will remain confidential.</p>
          </div>

          {/* button */}
          <div className="d-grid col-12">
            <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => navigate("/kyc/preview")}>
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default KYCUploadSelfiePage;
