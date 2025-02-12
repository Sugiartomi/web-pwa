import React, { useState } from "react";
import { CheckCircleFill, ChevronLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { BsPersonVcard } from "react-icons/bs";
import { AiFillCar, AiFillLock } from "react-icons/ai";

function KYCSelectKtpPage() {
  const navigate = useNavigate();
  const [document, setDocument] = useState("Identity Card");
  return (
    <>
      <div className="container text-roboto">
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/kyc/personal-information")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "90px" }}>
            Select Document
          </p>
        </div>

        <div className="mt-4">
          <p className="font-18 fw-bold mb-2">Use official government-issued documents</p>
          <p className="font-14 font-dark">Only the following documents listed below will be accepted; All other documents will be rejected</p>
        </div>

        {/* select document */}
        <div className="mt-3">
          {/* Identity Card */}
          <div className="rounded px-3 py-3 mb-3" style={document === "Identity Card" ? { border: "1px solid #1B6AEA", height: "59px" } : {}} onClick={() => setDocument("Identity Card")}>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <p className="font-20 mb-0">
                  <BsPersonVcard />
                </p>
                <p className="font-15 fw-bold ms-2 mb-0">Identity Card</p>
              </div>
              <p className="font-18 ms-auto mb-0" style={document === "Identity Card" ? { color: "#1B6AEA" } : { color: "#BFC3CC" }}>
                <CheckCircleFill />
              </p>
            </div>
          </div>
          {/* Driver’s License */}
          <div className="rounded px-3 py-3 mb-3" style={document === "Driver’s License" ? { border: "1px solid #1B6AEA", height: "59px" } : {}} onClick={() => setDocument("Driver’s License")}>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <p className="font-20 mb-0">
                  <AiFillCar />
                </p>
                <p className="font-15 fw-bold ms-2 mb-0">Driver’s License</p>
              </div>
              <p className="font-18 ms-auto mb-0" style={document === "Driver’s License" ? { color: "#1B6AEA" } : { color: "#BFC3CC" }}>
                <CheckCircleFill />
              </p>
            </div>
          </div>
        </div>
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
          <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => navigate("/kyc/identity-verification", { state: document })}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default KYCSelectKtpPage;
