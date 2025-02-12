import React, { useState } from "react";
import { ChevronDoubleDown, ChevronDoubleUp, ChevronLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function PriceAlertPage() {
  const navigate = useNavigate();
  const [reminder, setReminder] = useState([]);
  const [autoId, setAutoId] = useState(1);

  const addReminder = () => {
    setAutoId(autoId + 1);
    setReminder([...reminder, { id: autoId, pair: "ADA/IDR", reminder: "5.450" }]);
  };

  return (
    <>
      <div className="container text-roboto">
        <div className="d-flex align-items-center">
          <div style={{ width: "41px", height: "41px", border: "1.5px solid #E8ECF4", borderRadius: "12px" }} onClick={() => navigate("/")}>
            <p className="font-16 fw-bolder mb-0" style={{ marginTop: "6px", marginLeft: "8px" }}>
              <ChevronLeft />
            </p>
          </div>
          {/* title */}
          <p className="font-18 text-center mt-3" style={{ fontWeight: "600", marginLeft: "100px" }}>
            ADA/IDR
          </p>
        </div>
        <p className="text-center fw-bold font-25 mb-2">5.110</p>
        <p className="text-center fw-bold font-15 font-red">(-1.73%)</p>

        {/* pengingat */}
        <div>
          <label className="font-14">Setel Pengingat</label>
          <div className="border rounded align-items-center px-4 py-2 position-relative" style={{ height: "48px", backgroundColor: "#F2F2F2" }}>
            <div className="d-flex position-absolute top-50 translate-middle-y align-items-center">
              <p className="mb-0 font-green">
                <ChevronDoubleUp />
              </p>
              <p className="fw-bold font-15 mb-0" style={{ marginLeft: "120px" }}>
                5.450
              </p>
            </div>
          </div>
        </div>
        {/* button setel pengingat */}
        <div className="d-grid col-12 mt-3">
          <button type="button" className="btn text-white" style={{ backgroundColor: "#1B6AEA", height: "47px" }} onClick={() => addReminder()}>
            Buat Pengingat
          </button>
        </div>
      </div>
      <div className="mt-3" style={{ height: "9px", backgroundColor: "#F2F2F2" }}></div>
      <div className="container text-roboto mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" />
            <label className="form-check-label font-14">Sembunyikan lainnya</label>
          </div>
          <p className="badge font-red mb-0" style={{ border: "0.81982px solid #F4465E", fontWeight: 400 }}>
            Hapus semua
          </p>
        </div>

        {/* title */}
        <div className="row mt-3">
          <div className="col-5">
            <p className="font-12 mb-2">Pair</p>
          </div>
          <div className="col-7">
            <p className="font-12 mb-2">Pengingat</p>
          </div>
        </div>
        <div style={{ border: "1px solid #F2F2F2" }}></div>
        {/* list */}
        <div className="mt-3">
          {reminder.length !== 0
            ? reminder.map((el) => {
                return (
                  <div className="row mb-3" key={el.id}>
                    <div className="col-5">
                      <p className="font-15 fw-bold mb-0">ADA/IDR</p>
                    </div>
                    <div className="col-7 d-flex align-items-center justify-content-between">
                      <p className="font-15 fw-bold mb-0">
                        <span className="font-12 me-2 font-green">
                          <ChevronDoubleUp />
                        </span>
                        5.450
                      </p>
                      <div>
                        <p className="badge font-red mb-0" style={{ border: "0.81982px solid #F4465E", fontWeight: 400 }}>
                          Hapus
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
}

export default PriceAlertPage;
