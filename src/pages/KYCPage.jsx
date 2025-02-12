import React from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import { AiFillLock } from "react-icons/ai";
import KYCProfileImg from "../assets/KYC/kyc-profile-identification.svg";
import Step1Img from "../assets/KYC/prepare-identity.svg";
import Step2Img from "../assets/KYC/fill-personal-information.svg";
import Step3Img from "../assets/KYC/carbon_gift.svg";
import { useNavigate } from "react-router-dom";

function KYCPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container text-roboto mb-3">
        <p className="font-20 pt-2" onClick={() => navigate("/profile")}>
          <ChevronLeft />
        </p>

        <img src={KYCProfileImg} alt="" className="img-fluid mx-auto d-block" />
        <p className="fw-bold text-center font-30">Identity Verification</p>
        <p className="font-16 text-center font-dark" style={{ fontWeight: 300 }}>
          Identity verification is required to ensure the security of your account.
        </p>

        {/* step */}
        <div className="mt-3">
          {/* step 1 */}
          <div className="d-flex">
            <img src={Step1Img} alt="" className="img-fluid" />
            <div className="ms-3">
              <p className="font-16 fw-bold mb-0">Prepare Identity Documents (KTP, SIM)</p>
              <p className="font-12 font-dark">The name must be the same as the one on the KTP/Passport and bank accounts</p>
            </div>
          </div>
          {/* step 2 */}
          <div className="d-flex">
            <img src={Step2Img} alt="" className="img-fluid" />
            <div className="ms-3">
              <p className="font-16 fw-bold mb-0">Fill in your personal information data</p>
              <p className="font-12 font-dark mb-0">Please fill in vour personal data and make sure the information is correct according to your identity document</p>
            </div>
          </div>
          {/* step 3 */}
          <div className="d-flex">
            <img src={Step3Img} alt="" className="img-fluid" style={{ marginTop: "-30px" }} />
            <div className="ms-3">
              <p className="font-16 fw-bold mb-0">Get rewards from digitalexchange.id</p>
              <p className="font-12 font-dark">Redeem your points for rewards at the point center</p>
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
          <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => navigate("/kyc/personal-information")}>
            Verify now
          </button>
          <button type="button" className="btn font-primary mt-2" style={{ border: "1px solid #1B6AEA", height: "41px" }} onClick={() => navigate("/profile")}>
            Next time
          </button>
        </div>
      </div>
    </>
  );
}

export default KYCPage;
