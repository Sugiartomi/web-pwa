import React, { useState } from "react";
import { ChevronLeft, X } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import ReactiveIcon from "../assets/ReactiveAccount/reactive-account.svg";
import { MdOutlineDeleteForever } from "react-icons/md";
import EmailImg from "../assets/email-modal.svg";
import SuccessReactiveImg from "../assets/success-reactive.svg";
import axiosConfig from "../config/axios"
import { useRecoilState } from "recoil";
import { getTheme } from "../recoil/theme.State";

function ReactiveAccount() {
	const [ darkMode , setDarkMode] = useRecoilState(getTheme)
	const navigate = useNavigate();
	const [current, setCurrent] = useState(1);
	const userToken = localStorage.getItem("token");

	const handleRecoverAccount = () => {
		console.log("masuk");
		axiosConfig
			.post("/recover-account", {
				token: userToken
			})
			.then(({ data }) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div className="container text-roboto mb-3" style={{ height : "100vh"}}>
				<div className={darkMode ? "d-flex pt-2 text-white" : "d-flex pt-2"}>
					<p className="font-20" onClick={() => navigate("/my-profile")}>
						<ChevronLeft />
					</p>
					<p className="font-20 fw-bold" style={{ marginLeft: "80px" }}>
						Reactive Account
					</p>
				</div>

				{/* info */}
				<div className="mt-4">
					<img src={ReactiveIcon} alt="" className="img-fluid mx-auto d-block" />
					<p className="font-15 text-center font-red mt-3  fw-bold">Your account will be permanently deleted 30 days from submission approved, if you want to recover the account please log back in before the time limit expires</p>
				</div>
				<p className="font-14 text-center bg-yellow-transparant p-2 rounded" style={{ color: "#96660A" }}>
					For Security purposes, please update your password and ensure that your email, phone verification or Google Authenticator can only be accessed by you.
				</p>

				{/* buttom reactive account */}
				{current === 1 ? (
					<div className="d-grid col-12">
						<button type="button" className="btn text-white" style={{ backgroundColor: "#1B6AEA", height: "41px" }} data-bs-toggle="modal" data-bs-target="#modal-reactive-account" onClick={() => handleRecoverAccount()}>
							Recover Account
						</button>
						<button type="button" className="btn mt-2 font-primary" style={{ border: "1px solid #1B6AEA", height: "41px" }}>
							Cancel
						</button>
					</div>
				) : current === 2 ? (
					<div className="d-grid col-12">
						<button type="button" className="btn text-white" style={{ backgroundColor: "#1B6AEA", height: "41px" }} data-bs-toggle="modal" data-bs-target="#modal-success-reactive">
							Update Status
						</button>
						<button type="button" className="btn mt-2 font-primary" style={{ border: "1px solid #1B6AEA", height: "41px" }}>
							Resend Email
						</button>
					</div>
				) : (
					""
				)}
			</div>

			{/* modal reactive account */}
			<div className="modal modal-sm custom fade profile-info text-roboto rounded-0" id="modal-reactive-account" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered justify-content-center">
					<div className="modal-content rounded border-0 py-2" id="modal-addBankAccount" style={{ width: "350px" }}>
						<div className="modal-body">
							<p className="font-20 fw-bold text-center mb-0">One More Stage ! Please check your email</p>
							<img src={EmailImg} alt="" className="mx-auto d-block" />
							<div className="p-2 rounded" style={{ backgroundColor: "#FEF1F2" }}>
								<p className="font-14 text-center mb-0 font-red bg-yellow-transparant" style={{ color: "#A56D00" }}>
									If you don't find the email, please check the spam or promotion section.
								</p>
							</div>
							{/* button ok */}
							<div className="d-grid col-12 mt-3">
								<button type="button" className="btn text-white" style={{ backgroundColor: "#1B6AEA", height: "39.25px" }} data-bs-dismiss="modal" onClick={() => setCurrent(2)}>
									OK
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* modal success restored account */}
			<div className="modal modal-sm custom fade profile-info text-roboto rounded-0" id="modal-success-reactive" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered justify-content-center">
					<div className="modal-content rounded border-0 py-2" id="modal-addBankAccount" style={{ width: "350px" }}>
						<div className="modal-body">
							<p className="font-20 fw-bold text-center mb-0">One More Stage ! Please check your email</p>
							<img src={SuccessReactiveImg} alt="" className="mx-auto d-block" />
							<p className="font-14 text-center mb-0">
								Please create a PIN & <br /> Activate your Google 2FA
							</p>
							{/* button ok */}
							<div className="d-grid col-12 mt-3">
								<button type="button" className="btn text-white" style={{ backgroundColor: "#1B6AEA", height: "39.25px" }} data-bs-dismiss="modal" onClick={() => navigate("/login")}>
									Ok
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ReactiveAccount;
