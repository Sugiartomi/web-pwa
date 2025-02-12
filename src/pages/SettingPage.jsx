import React from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function SettingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container text-roboto">
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/my-profile")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "130px" }}>
            Setting
          </p>
        </div>
        {/* setting list */}
        <div className="mt-4">
          {/* dark mode */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="font-14 mb-0 fw-bold" style={{ fontWeight: "500" }}>
              Enable Dark Mode
            </p>
            <div className="form-check form-switch">
              <input className="form-check-input font-20" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            </div>
          </div>
          {/* change language */}
          <div className="d-flex justify-content-between align-items-center mb-3" onClick={() => navigate("/change-language")}>
            <p className="font-14 mb-0 fw-bold" style={{ fontWeight: "500" }}>
              Change Language
            </p>
            <p className="mb-0">
              <ChevronRight />
            </p>
          </div>
          {/* version */}
          <div className="d-flex justify-content-between align-items-center mb-3" onClick={() => navigate("/change-language")}>
            <p className="font-14 mb-0 fw-bold" style={{ fontWeight: "500" }}>
              About
            </p>
            <p className="font-14 mb-0 fw-bold" style={{ fontWeight: "500" }}>
              Version 1.0.47
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingPage;
