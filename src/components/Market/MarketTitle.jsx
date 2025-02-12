import React from "react";
import { CaretUpFill } from "react-bootstrap-icons";

function MarketTitle() {
  return (
    <>
      <div className="row mt-3 py-2" style={{ backgroundColor: "#F4F8FC" }}>
        <div className="col-4">
          <p className="mb-0 font-10 fw-bold">
            Name / Vol{" "}
            <span className="font-9 ms-2 font-primary">
              <CaretUpFill />
            </span>
          </p>
        </div>
        <div className="col-4">
          <p className="mb-0 font-10 fw-bold ms-3">
            Last Price{" "}
            <span className="font-9 ms-2 font-primary">
              <CaretUpFill />
            </span>
          </p>
        </div>
        <div className="col-4 text-end">
          <p className="mb-0 font-10 fw-bold">
            24h Chg%{" "}
            <span className="font-9 ms-2 font-primary">
              <CaretUpFill />
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default MarketTitle;
