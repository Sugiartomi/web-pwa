import React, { useState } from "react";
import VoucherImg from "../assets/voucher.svg";
import PieChartImg from "../assets/pie-chart.svg";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { get_total_wallet_asset } from "../store/actions/user";
import NavigationButton from "../components/global/NavigationButton";
import { baseURLApi, baseURLPrivateApi } from "../config/api";

function WalletPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [showAsset, setShowAsset] = useState(true);
  const [listWallet, setListWallet] = useState();
  const [dataTicker, setDataTicker] = useState();
  const [totalWalletAsset, setTotalWalletAsset] = useState();
  const dataUser = JSON.parse(localStorage.getItem("user_profile")).token;

  // Get data wallet asset
  useEffect(() => {
    setTimeout(() => {
      axios
        .post(baseURLPrivateApi+"/wallet", {
          token: dataUser,
        })
        .then(({ data }) => {
          setListWallet(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 300);
  }, []);

  // GET data all ticker
  useEffect(() => {
    axios
      .get(baseURLApi+"/allticker")
      .then(({ data }) => {
        setDataTicker(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // funtion count estimasi IDR
  const handleAddIdrEstimation = (symbol, amount) => {
    let allData = dataTicker && dataTicker.filter((el) => el.symbol.slice(0, -3) === symbol)[0]?.last_price * +amount;

    if (!isNaN(allData)) {
      return allData;
    } else {
      return 0;
    }
  };

  // function count total asset
  useEffect(() => {
    let totalAsset = 0;
    listWallet?.map((el) => {
      totalAsset = totalAsset + handleAddIdrEstimation(el.symbol, el.amount);
      return totalAsset;
    });
    setTotalWalletAsset(totalAsset);
    dispatch(get_total_wallet_asset(totalAsset));
  }, [listWallet]);

  return (
    <>
      <div className="container text-roboto">
        {/* header nav */}
        <div className="d-flex justify-content-between pt-2">
          <p className="font-20 fw-bold">Wallet</p>
          <div>
            <img src={VoucherImg} alt="" className="img-fluid" onClick={() => navigate("/voucher")} />
            <img src={PieChartImg} alt="" className="img-fluid ms-3" onClick={() => navigate("/portofolio-assets")} />
          </div>
        </div>

        {/* total asset */}
        <div className="mt-3">
          <p className="font-15 mb-0">
            Total Asset Value (IDR) <span className="ms-1 font-18">{showAsset ? <Eye onClick={() => setShowAsset(!showAsset)} /> : <EyeSlash onClick={() => setShowAsset(!showAsset)} />}</span>
          </p>
          <p className="fw-bold" style={{ fontSize: "28.45px" }}>
            {showAsset ? `Rp ${totalWalletAsset}` : "*********"}
          </p>
        </div>

        {/* button deposit & penrikan */}
        <div className="d-flex justify-content-between">
          <button type="button" className="btn text-white" style={{ backgroundColor: "#1B6AEA", width: "179px" }} onClick={() => navigate("/list-assets", { state: { pathname, status: "deposit" } })}>
            Deposit
          </button>
          <button type="button" className="btn font-primary ms-2" style={{ border: "1px solid #1B6AEA", width: "179px" }} onClick={() => navigate("/list-assets", { state: { pathname, status: "withdraw" } })}>
            Penarikan
          </button>
        </div>

        {/* show ballance & search */}
        <div className="mt-4 d-flex justify-content-between align-items-center">
          <p className="font-14 mb-0">Hide Zero Balance</p>
          <input type="search" className="form-control search-wallet border-0 rounded-pill" placeholder="&#xF002;&nbsp;Search" style={{ backgroundColor: "#F4F8FC", height: "32px", fontFamily: "Arial, FontAwesome", width: "188px" }} />
        </div>

        {/* list wallet */}
        <div className="mt-4">
          {listWallet &&
            listWallet.map((el, index) => {
              return (
                <div className="row mb-4" key={index} onClick={() => navigate(`/asset-detail/${el.symbol}`)}>
                  <div className="col-8">
                    <div className="d-flex align-items-center">
                      <img src={el.img_url} alt="" className="img-fluid" style={{ width: "25px", height: "25px" }} />
                      <div className="ms-2">
                        <p className="font-14 fw-bold mb-0">{el.symbol}</p>
                        <p className="font-14 mb-0" style={{ color: "#4C5058" }}>
                          {el.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <p className="font-14 mb-0 fw-bold">{showAsset ? +el.amount + +el.amount_frozen : "*************"}</p>
                    <p className="font-14 mb-0" style={{ color: "#4C5058" }}>
                      {showAsset ? "= Rp " + handleAddIdrEstimation(el.symbol, el.amount) : "******"}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* fixed navbar */}
      <NavigationButton pathDestination={"/wallet"} />
    </>
  );
}

export default WalletPage;
