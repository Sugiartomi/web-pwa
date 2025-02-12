import React, { useState } from "react";
import { ChevronLeft, ExclamationTriangleFill } from "react-bootstrap-icons";
import { AiFillLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import CountrySelect from "../components/global/CountrySelect";

function KYCPersonalInformation() {
  const navigate = useNavigate();
  const [value, setValue] = useState();

  return (
    <>
      <form action="">
        <div className="container text-roboto">
          <div className="d-flex pt-2">
            <p className="font-20" onClick={() => navigate("/kyc")}>
              <ChevronLeft />
            </p>
            <p className="font-20 fw-bold" style={{ marginLeft: "90px" }}>
              Informasi pribadi
            </p>
          </div>
          <CountrySelect />

          {/* select country */}
          <div className="mb-3">
            <label className="font-14 font-dark">Select Country</label>
            <select className="form-select font-16" aria-label="Default select example" style={{ height: "50px" }}>
              <option>Indonesia</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          {/* warning */}
          <div className="p-2 rounded text-center" style={{ backgroundColor: "#FCF4DD" }}>
            <p className="font-10 mb-0 font-dark">
              <span className="me-2 font-yellow">
                <ExclamationTriangleFill />
              </span>
              <span className="fw-bold">Warning !!!</span> Make sure the name you input matches your ID Card
            </p>
          </div>

          {/* first & last name */}
          <div className="row my-3 gx-2">
            <div className="col-6">
              <label className="font-14">First name</label>
              <input type="text" className="form-control" style={{ height: "45px" }} />
            </div>
            <div className="col-6">
              <label className="font-14">Last name</label>
              <input type="text" className="form-control" style={{ height: "45px" }} />
            </div>
          </div>

          {/* first & last name */}
          <div className="row mb-3 gx-2">
            <div className="mb-3 col-6">
              <label className="font-14">Middle name (Optional)</label>
              <input type="text" className="form-control" style={{ height: "45px" }} />
            </div>
            <div className="mb-3 col-6">
              <label className="font-14">Birth Date</label>
              <input type="date" className="form-control" style={{ height: "45px" }} />
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
            <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => navigate("/kyc/select-document-ktp")}>
              Continue
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default KYCPersonalInformation;
