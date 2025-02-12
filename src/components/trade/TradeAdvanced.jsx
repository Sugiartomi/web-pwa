import React, { useState } from "react";
import { InfoCircleFill } from "react-bootstrap-icons";
import { TbFileDescription } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessOrderImg from "../../assets/success-order.svg";

function TradeAdvanced() {
  const navigate = useNavigate();
  const path = useLocation();
  const pair = path.pathname.split("/");

  const ask = [
    {
      id: 1,
      price: "4.254.025",
      IDR: "8.117.420",
    },
    {
      id: 2,
      price: "4.254.025",
      IDR: "7.472.000",
    },
    {
      id: 3,
      price: "4.254.025",
      IDR: "63.669",
    },
    {
      id: 4,
      price: "4.254.025",
      IDR: "1.749.900",
    },
    {
      id: 5,
      price: "4.254.025",
      IDR: "1.749.900",
    },
  ];
  const bid = [
    {
      id: 1,
      price: "4.254.025",
      IDR: "8.117.420",
    },
    {
      id: 2,
      price: "4.254.025",
      IDR: "7.472.000",
    },
    {
      id: 3,
      price: "4.254.025",
      IDR: "63.669",
    },
    {
      id: 4,
      price: "4.254.025",
      IDR: "1.749.900",
    },
    {
      id: 5,
      price: "4.254.025",
      IDR: "1.749.900",
    },
  ];

  const [buySellCurrent, setBuySellCurrent] = useState("buy");
  return (
    <>
      <div className="mt-3">
        <div className="d-flex">
          {/* left */}
          <div className="col-6">
            <div style={{ height: "370px" }}>
              {/* title */}
              <div className="d-flex">
                {buySellCurrent === "buy" ? (
                  <div className="d-grid col-6 align-items-center" style={{ backgroundColor: "#20CB6F" }}>
                    <button type="button" className="btn py-1" style={{ color: "white" }} onClick={() => setBuySellCurrent("buy")}>
                      BUY
                    </button>
                  </div>
                ) : (
                  <div className="d-grid col-6 align-items-center" style={{ backgroundColor: "#F2F2F2" }}>
                    <button type="button" className="btn py-1" style={{ color: "#8D93A6" }} onClick={() => setBuySellCurrent("buy")}>
                      BUY
                    </button>
                  </div>
                )}
                {buySellCurrent === "sell" ? (
                  <div className="d-grid col-6 align-items-center" style={{ backgroundColor: "#F4465E" }}>
                    <button type="button" className="btn py-1" style={{ color: "white" }} onClick={() => setBuySellCurrent("sell")}>
                      SELL
                    </button>
                  </div>
                ) : (
                  <div className="d-grid col-6 align-items-center" style={{ backgroundColor: "#F2F2F2" }}>
                    <button type="button" className="btn py-1" style={{ color: "#8D93A6" }} onClick={() => setBuySellCurrent("sell")}>
                      SELL
                    </button>
                  </div>
                )}
              </div>
              <div className="d-flex mt-2 justify-content-between mb-2">
                <p className="font-12 mb-0" style={{ color: "#565D73" }}>
                  Balance
                </p>
                <p className="font-12 fw-bold mb-0">7.500.000 IDR</p>
              </div>
              {/* limit order */}
              <div>
                <select className="form-select border-0 font-12" aria-label="Default select example" style={{ backgroundColor: "#F2F2F2" }}>
                  <option>Limit Order</option>
                  <option value="1">Market Order</option>
                </select>
              </div>
              {/* harga */}
              <div className="mt-2 d-flex p-2 rounded justify-content-between" style={{ backgroundColor: "#F2F2F2" }}>
                <p className="font-12 mb-0">Harga</p>
                <p className="font-12 mb-0 fw-bold">4.254.045 IDR</p>
              </div>
              {/* amount */}
              <div className="mt-2 d-flex p-2 rounded justify-content-between" style={{ backgroundColor: "#F2F2F2" }}>
                <p className="font-12 mb-0">Amount</p>
                <p className="font-12 mb-0 fw-bold">BNB</p>
              </div>
              {/* percent */}
              <div className="d-flex mt-3 justify-content-between">
                <div className="justify-content-center">
                  <div style={{ backgroundColor: "#F2F2F2", width: "28px", height: "5px" }}></div>
                  <p className="font-12 text-center">10%</p>
                </div>
                <div className="justify-content-center">
                  <div style={{ backgroundColor: "#F2F2F2", width: "28px", height: "5px" }}></div>
                  <p className="font-12 text-center">25%</p>
                </div>
                <div className="justify-content-center">
                  <div style={{ backgroundColor: "#F2F2F2", width: "28px", height: "5px" }}></div>
                  <p className="font-12 text-center">50%</p>
                </div>
                <div className="justify-content-center">
                  <div style={{ backgroundColor: "#F2F2F2", width: "28px", height: "5px" }}></div>
                  <p className="font-12 text-center">75%</p>
                </div>
                <div className="justify-content-center">
                  <div style={{ backgroundColor: "#F2F2F2", width: "28px", height: "5px" }}></div>
                  <p className="font-12 text-center">100%</p>
                </div>
              </div>
              {/* total */}
              <div className="d-flex p-2 rounded justify-content-between" style={{ backgroundColor: "#F2F2F2" }}>
                <p className="font-12 mb-0">Total</p>
                <p className="font-12 mb-0 fw-bold">IDR</p>
              </div>
              <p className="font-9 mt-2 text-center">
                Fee Maker 0.36% - Taker 0.36% <InfoCircleFill className="font-primary ms-1" />
              </p>
              {/* button sell */}
              <div className="d-grid col-12">
                {buySellCurrent === "buy" ? (
                  <button type="button" className="btn text-white" style={{ backgroundColor: "#20CB6F", height: "42px" }} data-bs-toggle="modal" data-bs-target="#buy-modal">
                    BUY BNB
                  </button>
                ) : (
                  <button type="button" className="btn text-white" style={{ backgroundColor: "#F4465E", height: "42px" }} data-bs-toggle="modal" data-bs-target="#sell-modal">
                    SELL BNB
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* right */}
          <div className="col-6 ps-2">
            <div style={{ height: "370px" }}>
              <div className="d-flex justify-content-between font-11 py-1">
                <p className="mb-0">Harga</p>
                <p className="mb-0">IDR</p>
              </div>

              {/* list ask */}
              {ask.map((el) => {
                return (
                  <div className="d-flex justify-content-between" key={el.id}>
                    <p className="font-12 fw-bold font-red mb-2">4.254.025</p>
                    <p className="font-12 fw-bold mb-2">4.254.025</p>
                  </div>
                );
              })}
              {/* rata-rata */}
              <p className="font-14 text-center fw-bold font-red">4.587.214</p>

              {/* list bid */}
              {bid.map((el) => {
                return (
                  <div className="d-flex justify-content-between" key={el.id}>
                    <p className="font-12 fw-bold font-green mb-2">4.254.025</p>
                    <p className="font-12 fw-bold mb-2">4.254.025</p>
                  </div>
                );
              })}

              {/* filter ask bid */}
              <div>
                <select className="form-select border-0 font-12" aria-label="Default select example" style={{ backgroundColor: "#F2F2F2" }}>
                  <option value="1">Default</option>
                  <option value="2">Sell Order</option>
                  <option value="3">Buy Order</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* line */}
        <div style={{ backgroundColor: "#F5F6FA", height: "9px" }}></div>

        {/* pending order & history */}
        <div className="mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <p className="font-16 fw-bold">Pending Order (5)</p>
            <p className="font-20 fw-bold font-primary" onClick={() => navigate(`/trade-transaction/${pair[2]}`, { state: "More transaction" })}>
              <TbFileDescription />
            </p>
          </div>
        </div>

        {/* list pending order */}
        <div className="row font-12 font-dark mb-3" style={{ borderBottom: "0.5px solid #DDE4EA" }}>
          <div className="col-5">
            <div className="d-flex justify-content-between">
              <p className="font-14 fw-bold badge font-red px-2 mb-2" style={{ backgroundColor: "#FEF1F2" }}>
                Sell
              </p>
              <p className="font-14 fw-bold mb-2">BNB/IDR</p>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="font-12 text-dark mb-2">Price</p>
              <p className="font-12 fw-bold mb-2">8.992.245 </p>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="font-12 text-dark mb-2">Total IDR</p>
              <p className="font-12 fw-bold mb-2">4.251.877</p>
            </div>
          </div>
          <div className="col-4">
            <p className="mb-2">22-05-23 08:57:21</p>
            <div className="d-flex">
              <p className="mb-2">Qty</p>
              <p className="mb-2 ms-3">0.0254 BNB</p>
            </div>
          </div>
          <div className="col-3 ps-0">
            <div className="d-flex">
              <p className="font-12 font-red mb-0 ms-auto badge px-2 py-1" style={{ border: "1px solid #F4465E" }}>
                Cancel
              </p>
            </div>
          </div>
        </div>
        <div className="row font-12 font-dark mb-3" style={{ borderBottom: "0.5px solid #DDE4EA" }}>
          <div className="col-5">
            <div className="d-flex justify-content-between">
              <p className="font-14 fw-bold badge font-red px-2 mb-2" style={{ backgroundColor: "#FEF1F2" }}>
                Sell
              </p>
              <p className="font-14 fw-bold mb-2">BNB/IDR</p>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="font-12 text-dark mb-2">Price</p>
              <p className="font-12 fw-bold mb-2">8.992.245 </p>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="font-12 text-dark mb-2">Total IDR</p>
              <p className="font-12 fw-bold mb-2">4.251.877</p>
            </div>
          </div>
          <div className="col-4">
            <p className="mb-2">22-05-23 08:57:21</p>
            <div className="d-flex">
              <p className="mb-2">Qty</p>
              <p className="mb-2 ms-3">0.0254 BNB</p>
            </div>
          </div>
          <div className="col-3 ps-0">
            <div className="d-flex">
              <p className="font-12 font-red mb-0 ms-auto badge px-2 py-1" style={{ border: "1px solid #F4465E" }}>
                Cancel
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* modal buy */}
      <div className="modal modal-sm custom fade profile-info text-roboto rounded-0" id="buy-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div className="modal-content rounded border-0 py-2" id="modal-addBankAccount" style={{ width: "350px" }}>
            <div className="modal-body py-4">
              <p className="font-18 fw-bold text-center">Are you sure to Buy 0.934 BNB ?</p>
              {/* at price */}
              <div className="d-flex justify-content-between">
                <p className="font-14">At Price</p>
                <p className="font-14 fw-bold">4.254.325/BNB</p>
              </div>
              {/* at price */}
              <div className="d-flex justify-content-between">
                <p className="font-14">Estimation</p>
                <p className="font-14 fw-bold">0.254 BNB</p>
              </div>
              <div className="mb-3" style={{ border: "1px solid #DDE4EA" }}></div>
              {/* Fee Taker Maker */}
              <div className="d-flex justify-content-between">
                <p className="font-14">Fee Taker Maker</p>
                <p className="font-14 fw-bold font-red">0.36% - 0.36%</p>
              </div>
              {/* button cancel buy */}
              <div className="d-flex">
                <button type="button" className="btn" style={{ backgroundColor: "#F2F2F2", width: "163px", height: "43px" }} data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn text-white ms-2" style={{ backgroundColor: "#20CB6F", width: "163px", height: "43px" }} data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#modal-success-order">
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal success order */}
      <div className="modal modal-sm custom fade profile-info text-roboto rounded-0" id="modal-success-order" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div className="modal-content rounded border-0 py-2" id="modal-addBankAccount" style={{ width: "350px" }}>
            <div className="modal-body py-4">
              <img src={SuccessOrderImg} alt="" className="img-fluid mx-auto d-block" />
              <p className="font-18 fw-bold text-center mt-2">You Order Submitted Succes</p>
              {/* button ok */}
              <div className="d-grid col-12">
                <button type="button" className="btn text-white" style={{ backgroundColor: "#1B6AEA" }} data-bs-dismiss="modal">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal sell */}
      <div className="modal modal-sm custom fade profile-info text-roboto rounded-0" id="sell-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div className="modal-content rounded border-0 py-2" id="modal-addBankAccount" style={{ width: "350px" }}>
            <div className="modal-body py-4">
              <p className="font-18 fw-bold text-center">Are you sure to Sell 0.934 BNB ?</p>
              {/* at price */}
              <div className="d-flex justify-content-between">
                <p className="font-14">At Price</p>
                <p className="font-14 fw-bold">4.254.325/BNB</p>
              </div>
              {/* at price */}
              <div className="d-flex justify-content-between">
                <p className="font-14">Estimation</p>
                <p className="font-14 fw-bold">0.254 BNB</p>
              </div>
              <div className="mb-3" style={{ border: "1px solid #DDE4EA" }}></div>
              {/* Fee Taker Maker */}
              <div className="d-flex justify-content-between">
                <p className="font-14">Fee Taker Maker</p>
                <p className="font-14 fw-bold font-red">0.36% - 0.36%</p>
              </div>
              {/* button cancel buy */}
              <div className="d-flex">
                <button type="button" className="btn" style={{ backgroundColor: "#F2F2F2", width: "163px", height: "43px" }} data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn text-white ms-2" style={{ backgroundColor: "#F4465E", width: "163px", height: "43px" }} data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#modal-success-order">
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TradeAdvanced;
