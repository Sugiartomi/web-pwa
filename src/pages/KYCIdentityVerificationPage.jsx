import React from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import { AiFillLock } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import KTPImg from "../assets/KYC/KTP-kyc.svg";
import SIMImg from "../assets/KYC/SIM-kyc.svg";

function KYCIdentityVerificationPage() {
  const path = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="container text-roboto">
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/kyc/select-document-ktp")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "70px" }}>
            Identity Verification
          </p>
        </div>

        {path.state === "Identity Card" ? (
          <>
            <img src={KTPImg} alt="" className="img-fluid mx-auto d-block mt-5" />
            {/* step upload KTP */}
            <div className="mt-5">
              <p className="font-14 fw-bold mt-5">Please upload your ID Card. Please ensure that:</p>
              <ul className="font-14">
                <li>This is your own non-expired government-issued document</li>
                <li>This is an original document, not a scan or copy</li>
                <li>Remove any card holders or covers to avoid reflections or blur</li>
                <li>Place the document against a solid color background.</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <img src={SIMImg} alt="" className="img-fluid mx-auto d-block mt-5" />
            <p className="font-14 fw-bold mt-5">You will upload your Driver's License. Please ensure that:</p>
            <ul className="font-14">
              <li>This is your own non-expired government-issued document</li>
              <li>This is an original document, not a scan or copy</li>
              <li>Remove any card holders or covers to avoid reflections or blur</li>
              <li>Place the document against a solid color background.</li>
            </ul>
          </>
        )}
      </div>

      {/* fixed button */}
      <div className="fixed-button pb-2 px-2 col-12 width-breakpoint" style={{ maxWidth : "14cm"}}>
        {/* info */}
        <div className="d-flex p-2 mt-4 align-items-center" style={{ backgroundColor: "#E7E8F6" }}>
          <p className="font-dark mb-0">
            <AiFillLock />
          </p>
          <p className="font-10 ms-2 mb-0">Your data is fully protected in our system and will remain confidential.</p>
        </div>

        {/* button */}
        <div className="d-grid col-12">
          <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => navigate("/kyc/take-photo-document", { state: path.state })}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default KYCIdentityVerificationPage;
