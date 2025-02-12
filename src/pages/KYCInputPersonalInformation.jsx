import React from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import { AiFillLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function KYCInputPersonalInformation() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container text-roboto mb-3">
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/kyc/preview")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "70px" }}>
            Personal information
          </p>
        </div>

        <p className="font-18 fw-bold mt-3">Please fill in your identity</p>
        <form action="">
          {/* ID */}
          <div className="mb-3">
            <label className="font-14">ID No.</label>
            <input type="number" className="form-control kyc-form" placeholder="32710xxx" style={{ height: "45px" }} />
          </div>
          {/* Gender */}
          <div className="mb-3">
            <label className="font-14">Gender</label>
            <select className="form-select kyc-select" aria-label="Default select example" style={{ height: "45px", color: "#c7c8da" }}>
              <option value="5">Select Gender</option>
              <option value="1">Female</option>
              <option value="2">Male</option>
            </select>
          </div>
          {/* birth place */}
          <div className="mb-3">
            <label className="font-14">Birth Place</label>
            <input type="text" className="form-control kyc-form" placeholder="Type your birth place" style={{ height: "45px" }} />
          </div>
          {/* Occupation */}
          <div className="mb-3">
            <label className="font-14">Occupation</label>
            <select className="form-select kyc-select" aria-label="Default select example" style={{ height: "45px", color: "#c7c8da" }}>
              <option value="">Select occupation</option>
              <option value="1">Female</option>
              <option value="2">Male</option>
              <option value="2">Male</option>
            </select>
          </div>
          {/* Address */}
          <div className="mb-3">
            <label className="font-14">Address</label>
            <textarea className="form-control kyc-form" placeholder="Type your address" rows="3" style={{ height: "123px" }}></textarea>
          </div>
          {/* Province */}
          <div className="mb-3">
            <label className="font-14">Province</label>
            <select className="form-select kyc-select" aria-label="Default select example" style={{ height: "45px", color: "#c7c8da" }}>
              <option value="">Select Province</option>
              <option value="1">Female</option>
              <option value="2">Male</option>
              <option value="2">Male</option>
            </select>
          </div>
          {/* City */}
          <div className="mb-3">
            <label className="font-14">City</label>
            <select className="form-select kyc-select" aria-label="Default select example" style={{ height: "45px", color: "#c7c8da" }}>
              <option value="">Select City</option>
              <option value="1">Female</option>
              <option value="2">Male</option>
              <option value="2">Male</option>
            </select>
          </div>
          {/* Postal code */}
          <div className="mb-3">
            <label className="font-14">Postal code</label>
            <input type="text" className="form-control kyc-form" placeholder="Type your Postal code" style={{ height: "45px" }} />
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
            <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => navigate("/kyc/face-detection")}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default KYCInputPersonalInformation;
