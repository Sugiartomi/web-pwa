import React, { useEffect, useState } from "react";
import {
	CheckCircleFill,
	ChevronDown,
	ChevronLeft,
	Clock,
	ExclamationCircleFill,
	PlusLg,
	PlusSquare
} from "react-bootstrap-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TimeIcon from "../assets/time.svg";
import DataEmpty from "../assets/DataEmpty.svg";
import SuccessImg from "../assets/success-order.svg";
import NoBankAccountImg from "../assets/no-bank-account.svg";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../config/axios";
import { ADD_BANK_ACCOUNT } from "../store/types/user";
import axios from "axios";
import { ALL_ASSETS } from "../store/types/market";
import { get_data_wallet } from "../store/actions/wallet";
import { get_data_ticker } from "../store/actions/market";
import { IDRFormater } from "../helpers/currencyFormater";
import { baseURLApi } from "../config/api";

function WithdrawPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ethNetwork, setEthNetwork] = useState("Ethereum (ERC20)");
	const { name } = useParams();
	const { pathname, state } = useLocation();
	const [showAddAddress, setShowAddAddress] = useState(false);
	const { dataBankAccount } = useSelector((store) => store.user);
	const { assets } = useSelector((store) => store.dataMarket);
	const userToken = localStorage.getItem("token");
	const [dataBankAcc, setDataBankAcc] = useState([]);
	const [selectedBank, setSelectedBank] = useState([]);
	const [amountWitdrawal, setAmountWithdrawal] = useState("");
	const { listDataWallet, totalAsset } = useSelector((store) => store.wallet);
	const [fixTax, setFixTax] = useState();
	const [wallet, setWallet] = useState();

	useEffect(() => {
		if (!listDataWallet || listDataWallet.length === 0) {
			setTimeout(() => {
				axiosConfig
					.post("/wallet", {
						token: userToken
					})
					.then(({ data }) => {
						if (data.status === "success") {
							setWallet(data.data);
							dispatch(get_data_wallet());
							dispatch(get_data_ticker());
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}, 200);
		} else {
			setWallet(listDataWallet);
		}
	}, [pathname, wallet]);

	const handleSelectBank = (e) => {
		let result = dataBankAccount.filter((el) => el.account_id == e.target.value);
		setSelectedBank([
			{
				bank: result[0].bank_name,
				rek: result[0].account_number,
				owner: result[0].bank_owner,
				id: result[0].account_id
			}
		]);
	};

	useEffect(() => {
		axiosConfig
			.post("/user-bank-acc", {
				token: userToken
			})
			.then(({ data }) => {
				if (data.status === "success") {
					setDataBankAcc(data.data);
					dispatch({ type: ADD_BANK_ACCOUNT, payload: data.data });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		axios
			.get(baseURLApi+"/assets")
			.then(({ data }) => {
				if (data.status === "success") {
					dispatch({ type: ALL_ASSETS, payload: data.data });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (name === "IDR") {
			let findAsset = assets.find((e) => e.symbol === "IDR");
			if (findAsset) {
				if (!findAsset.max_fee_type) {
					if (amountWitdrawal < 200000000) {
						setFixTax(findAsset.fee_withdrawal);
					} else {
						setFixTax(findAsset.max_fee);
					}
				} else {
					setFixTax((amountWitdrawal * findAsset.max_fee) / 100);
				}
			}
		}
	}, [amountWitdrawal]);

	const formaterFormInput = (e) => {
		setAmountWithdrawal(+e.target.value);
	};

	return (
		<>
			<div className="container text-roboto pt-3">
				{/* title */}
				<div className="d-flex align-items-center justify-content-between">
					<p className="fw-bold" onClick={() => navigate(`/list-assets/withdraw`)}>
						<ChevronLeft />
					</p>
					<p className="fw-bold mb-0">Withdrawal</p>
					<img src={TimeIcon} alt="" className="img-fluid" style={{ width: "25px", height: "25px" }} />
				</div>
			</div>









			
			{name === "BNB" ? (
				<div className="container text-roboto">
					{/* select asset */}
					<div className="mt-3">
						<p className="font-16 mb-1">Select Crypto Assets</p>
						<div className="px-2 py-3" style={{ backgroundColor: "#F4F8FC" }}>
							<div className="d-flex justify-content-between">
								<div className="d-flex">
									<img
										src="https://static.vecteezy.com/system/resources/previews/013/373/690/non_2x/binance-coin-bnb-3d-rendering-isometric-icon-free-png.png"
										alt=""
										className="img-fluid"
										style={{ width: "25px", height: "25px" }}
									/>
									<p className="font-16 ms-2 mb-0">
										<span className="fw-bold">BNB</span> Binance Coin
									</p>
								</div>
								<p
									className="font-16 mb-0"
									style={{ color: "#1B6AEA" }}
									onClick={() => navigate("/list-assets", { state: { pathname, status: "withdraw" } })}>
									Select
								</p>
							</div>
						</div>
					</div>

					{/* Select network */}
					<div className="mt-3">
						<p className="font-16 mb-1">Network</p>
						<select
							className="form-select border-0"
							aria-label="Default select example"
							style={{ height: "61px", backgroundColor: "#F4F8FC" }}>
							<option>Select The Network</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select>
					</div>

					{/* available balance */}
					<div className="mt-3">
						<p className="font-14" style={{ color: "#626262" }}>
							Available Balance : <span className="fw-bold">0.0396125 BNB</span>
						</p>
						<div className="d-flex align-items-center" style={{ backgroundColor: "#F4F8FC", height: "54px" }}>
							<div className="col-10">
								<input
									type="number"
									className="form-control shadow-none border-0"
									placeholder="Enter Amount"
									style={{ backgroundColor: "#F4F8FC" }}
								/>
							</div>
							<div className="col-2">
								<p className="font-primary mb-0 ms-2 font-16">MAX</p>
							</div>
						</div>
					</div>

					<div className="mt-3 px-3 py-2" style={{ backgroundColor: "#FCF4DD" }}>
						<p className="font-9 mb-0">
							Withdrawal your Asset BNB Daily Limit estimated worth: <span className="fw-bold">14 BNB</span> / 48 BNB
						</p>
					</div>

					{/* Select Address BNB */}
					<div className="mt-4">
						<p className="font-16 mb-1">Select Address BNB</p>
						<div
							className="rounded position-relative px-3"
							data-bs-toggle="modal"
							data-bs-target="#modal-add-address"
							style={{ height: "50px", backgroundColor: "#F4F8FC" }}>
							<div className="d-flex justify-content-between pt-3">
								<p className="mb-0">Select Address Wallet </p>
								<p className="mb-0">
									<ChevronDown />
								</p>
							</div>
						</div>
					</div>

					{/* Add address */}
					{showAddAddress ? (
						<>
							{/* label address */}
							<div className="mt-3">
								<p className="font-14" style={{ color: "#626262" }}>
									Available Balance : <span className="fw-bold">0.0396125 BNB</span>
								</p>
								<input
									type="text"
									className="form-control shadow-none border-0"
									placeholder="Enter 4-20 Characters. e.g : DEX_user1"
									style={{ backgroundColor: "#F4F8FC", height: "54px" }}
								/>
							</div>

							{/* available balance */}
							<div className="mt-3">
								<p className="font-14" style={{ color: "#626262" }}>
									Label Address
								</p>
								<div className="d-flex align-items-center" style={{ backgroundColor: "#F4F8FC", height: "54px" }}>
									<div className="col-10">
										<input
											type="number"
											className="form-control shadow-none border-0"
											placeholder="Enter Recipient Address"
											style={{ backgroundColor: "#F4F8FC" }}
										/>
									</div>
									<div className="col-2">
										<p className="font-primary mb-0 ms-2 font-16">Paste</p>
									</div>
								</div>
							</div>
						</>
					) : (
						""
					)}

					{/* fee withdraw */}
					<div className="mt-4">
						<div className="d-flex justify-content-between">
							<p className="font-14">Fee Withdrawal</p>
							<p className="font-14">0.005 BNB</p>
						</div>
						<div className="d-flex justify-content-between">
							<p className="font-14">Total Withdrawal</p>
							<p className="font-24 fw-bold">0.0143 BNB</p>
						</div>
					</div>

					{/* withdraw button */}
					<div className="d-grid col-12">
						<button
							type="button"
							className="btn font-16 text-white"
							style={{ backgroundColor: "#1B6AEA", height: "46px" }}
							data-bs-toggle="modal"
							data-bs-target="#modal-success-add-address">
							Withdrawal
						</button>
					</div>

					<div className="d-flex mt-4 slign-items-center font-red">
						<p>
							<Clock />
						</p>
						<p className="font-12 ms-2">
							For security, users cannot send or withdraw Rupiah/Assets for 48 hours after the 2FA reset process is
							approved
						</p>
					</div>

					<div className="font-red">
						<ol className="font-14">
							<li>Minimal Withdrawal: 0,01120000 BNB</li>
							<li>Maximum Withdrawal: 40,00000000 BNB per transaction</li>
							<li>
								All transactions are FINAL. After the transaction has been processed, your BNB transaction cannot be
								cancelled.
							</li>
							<li>Estimated asset withdrawal time: (sesuai per asset) X minute(s)</li>
						</ol>
					</div>

					{/* warning */}
					<div className="p-3 mt-4" style={{ backgroundColor: "#F5FCFF" }}>
						<p className="font-24 fw-bold text-center mb-2" style={{ color: "#0C6DB5" }}>
							Warning !
						</p>
						<p className="font-14" style={{ color: "#0C6DB5" }}>
							Please verify and make sure that your wiithdrawal wallet is correct. If you have withdrawn to an incorrect
							address, we will not be able to return your funds.
						</p>
						<p className="font-14" style={{ color: "#0C6DB5" }}>
							All transactions are FINAL. After the transaction has been processed, it cannot be cancelled. Any errors
							made when inputting the withdrawal address will be the individual's own responsibility. digitalexchange.id
							is not liable for such errors.
						</p>
					</div>
				</div>
			) : name === "IDR" ? (
				<>
					<div className="container text-roboto">
						<p className="font-14 text-center mt-4 mb-2">Balance</p>
						{listDataWallet ? (
							listDataWallet.length !== 0 ? (
								<p className="font-24 fw-bold text-center">
									Rp {IDRFormater(+listDataWallet.find((e) => e.symbol === name).amount)}
								</p>
							) : (
								""
							)
						) : (
							""
						)}

						{/* withdrawal amount */}
						<div className="mt-3">
							<label className="font-14" style={{ color: "#626262" }}>
								Enter Withdrawal Amount
							</label>
							<div className="d-flex align-items-center" style={{ backgroundColor: "#F4F8FC", height: "54px" }}>
								<div className="col-9">
									<input
										type="number"
										className="form-control shadow-none border-0"
										placeholder="0"
										style={{ backgroundColor: "#F4F8FC" }}
										onChange={formaterFormInput}
									/>
								</div>
								<div className="col-3">
									<p className="font-primary mb-0 ms-2 font-14">Maximum</p>
								</div>
							</div>
						</div>

						{/* info */}
						<p className="font-9 mt-3 bg-warning-custom p-2">
							Withdrawal your IDR Daily Limit estimated worth : <span className="fw-bold">75.000.000 IDR</span> /
							200,000,000 IDR
						</p>
						{dataBankAccount.length === 0 ? (
							<>
								{/* no bank account */}
								<div>
									<p className="font-14">Choose your Bank Account :</p>
									<img src={NoBankAccountImg} alt="" className="img-fluid mx-auto d-flex" />
									<p className="font-12 text-center">You don't have a bank account yet!</p>
								</div>
							</>
						) : (
							<>
								<select
									className="form-select form-select-lg mb-3 shadow-none"
									aria-label=".form-select-lg example"
									onChange={handleSelectBank}>
									<option selected disabled style={{ display: "none" }}>
										{" "}
										select account bank
									</option>
									{dataBankAccount.map((e) => {
										return (
											<>
												<option value={e.account_id}>
													{e.label} - {e.account_number}
												</option>
											</>
										);
									})}
								</select>
								{selectedBank.length === 1 ? (
									<>
										<div className="bg-blue-transparant d-flex mb-3 justify-content-between align-items-center p-3">
											<div>
												<p className="font-12 font-dark mb-0">{selectedBank[0].bank}</p>
												<p className="font-16 mb-0">
													{selectedBank[0].owner} - {selectedBank[0].rek}{" "}
												</p>
											</div>
											<p
												className="font-16 font-primary mb-0"
												onClick={() => {
													localStorage.setItem(
														"temp-edit-bank",
														`${selectedBank[0].id}-${selectedBank[0].bank}-${selectedBank[0].rek} `
													);
													navigate("/edit-bank-account");
												}}>
												Edit
											</p>
										</div>
									</>
								) : (
									""
								)}
							</>
						)}

						{/* add bank account */}
						<div
							className="py-4"
							style={{ backgroundColor: "#ECF9FF" }}
							onClick={() => navigate("/add-bank-account", { state: { pair: name, status: "add", state } })}>
							<p className="font-16 text-center font-primary mb-0">
								Add Acount Bank{" "}
								<span className="ms-4">
									<PlusSquare />
								</span>
							</p>
						</div>

						<div className="font-red font-12 mt-3 bg-red-transparant p-2 d-flex fw-bold">
							<p className="font-18">
								<Clock />
							</p>
							<p className="mb-0 ms-2">
								For security, users cannot send or withdraw Rupiah/Assets for 48 hours after the 2FA reset process is
								approved
							</p>
						</div>

						{/* warning */}
						<div className="bg-blue-transparant mt-3 p-2 font-blue-grey">
							<p className="font-15 fw-bold text-center">ATTENTION !</p>
							<ul className="font-10 mb-0">
								<li>Maximum withdrawal of 200,000,000 IDR /day to increase the limit, (click here)</li>
								<li>
									Make sure to transfer only from the bank account in your name otherwise the withdrawal will fail.
								</li>
								<li>Minimum withdrawal 100,000 IDR</li>
								<li>Withdrawals above 200,000,000 IDR will be charged IDR 120,000 IDR</li>
							</ul>
						</div>

						{/* button next */}
						{selectedBank.length !== 0 ? (
							<div className="d-grid col-12 my-3">
								<button
									type="button"
									className="btn text-white py-2"
									style={{ backgroundColor: "#1B6AEA" }}
									data-bs-toggle="modal"
									data-bs-target="#modal-withdrawal-confirm">
									Next
								</button>
							</div>
						) : (
							<div className="d-grid col-12 my-3">
								<button type="button" className="btn text-white py-2" style={{ backgroundColor: "#1B6AEA" }}>
									Next
								</button>
							</div>
						)}
					</div>
				</>
			) : name === "ETH" ? (
				<>
					<div className="container text-roboto">
						{/* select asset */}
						<div className="mt-3">
							<p className="font-16 mb-1">Select Crypto Assets</p>
							<div className="px-2 py-3" style={{ backgroundColor: "#F4F8FC" }}>
								<div className="d-flex justify-content-between">
									<div className="d-flex">
										<img
											src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
											alt=""
											className="img-fluid"
											style={{ width: "25px", height: "25px" }}
										/>
										<p className="font-16 ms-2 mb-0">
											<span className="fw-bold">ETH</span> Ethereum
										</p>
									</div>
									<p
										className="font-16 mb-0"
										style={{ color: "#1B6AEA" }}
										onClick={() => navigate("/list-assets", { state: { pathname, status: "withdraw" } })}>
										Select
									</p>
								</div>
							</div>
						</div>

						{/* Select network */}
						<div className="mt-3 d-flex">
							<div className="col-6">
								<p
									className="badge text-dark p-3 font-12 mb-2"
									style={{ border: "1px solid #1B6AEA" }}
									onClick={() => setEthNetwork("Ethereum (ERC20)")}>
									Ethereum (ERC20){" "}
									<span className="font-primary ms-2">
										<CheckCircleFill />
									</span>
								</p>
							</div>
							<div className="col-6">
								<p
									className="badge p-3 font-12 mb-2 font-input-column"
									style={{ backgroundColor: "#DDE4EA" }}
									onClick={() => setEthNetwork("BNB Smart Chain (BEP20)")}>
									BNB Smart Chain (BEP20)
								</p>
							</div>
						</div>
						<div className="col-6">
							<p
								className="badge text-dark p-3 font-12 mb-2"
								style={{ border: "1px solid #DDE4EA" }}
								onClick={() => setEthNetwork("BNB Beachon Chain (BEP2)")}>
								BNB Beachon Chain (BEP2)
							</p>
						</div>

						{/* perkondisian untuk render tampilan sesuai dengan network yg dipilih */}
						{ethNetwork !== "BNB Smart Chain (BEP20)" ? (
							<>
								{/* available balance */}
								<div className="mt-3">
									<p className="font-14" style={{ color: "#626262" }}>
										Available ETH Balance: <span className="fw-bold font-dark">0.0396125 ETH</span>
									</p>
									<div className="d-flex align-items-center" style={{ backgroundColor: "#F4F8FC", height: "54px" }}>
										<div className="col-10">
											<input
												type="number"
												className="form-control shadow-none border-0"
												placeholder="Enter Amount"
												style={{ backgroundColor: "#F4F8FC" }}
											/>
										</div>
										<div className="col-2">
											<p className="font-primary mb-0 ms-2 font-16">MAX</p>
										</div>
									</div>
								</div>
								{/* withdrawal asset */}
								<p className="bg-warning-custom font-8 p-2 mt-3">
									Withdrawal your Asset ETH Daily Limit estimated worth: <span className="fw-bold">8.025 ETH</span> / 10
									ETH
								</p>
								{/* Recipient Address */}
								<div className="mt-3">
									<label className="font-14" style={{ color: "#626262" }}>
										Recipient Address
									</label>
									<div className="d-flex align-items-center" style={{ backgroundColor: "#F4F8FC", height: "54px" }}>
										<div className="col-10">
											<input
												type="text"
												className="form-control shadow-none border-0"
												placeholder="Enter Recipient Address"
												style={{ backgroundColor: "#F4F8FC" }}
											/>
										</div>
										<div className="col-2">
											<p className="font-primary mb-0 ms-2 font-16">Paste</p>
										</div>
									</div>
								</div>
								{ethNetwork === "Ethereum (ERC20)" ? (
									<>
										{/* withdrawal to follow */}
										<p className="font-14 bg-green-transparant p-2 font-green mt-3">
											Withdrawals to fellow digitalexchange.id members, not charge FREE
										</p>

										{/* fee withdraw */}
										<div className="mt-4">
											<div className="d-flex justify-content-between">
												<p className="font-14">Fee Withdrawal</p>
												<p className="font-14 fw-bold">0.00143 ETH</p>
											</div>
											<div className="d-flex justify-content-between">
												<p className="font-14">Total Withdrawal</p>
												<p className="font-14 fw-bold">0.0143 ETH</p>
											</div>
										</div>
									</>
								) : ethNetwork === "BNB Beachon Chain (BEP2)" ? (
									<>
										{/* Memo */}
										<div className="mt-3">
											<label className="font-14" style={{ color: "#626262" }}>
												Memo
											</label>
											<div className="d-flex align-items-center" style={{ backgroundColor: "#F4F8FC", height: "54px" }}>
												<div className="col-10">
													<input
														type="text"
														className="form-control shadow-none border-0"
														placeholder="Enter Memo"
														style={{ backgroundColor: "#F4F8FC" }}
													/>
												</div>
												<div className="col-2">
													<p className="font-primary mb-0 ms-2 font-16">Paste</p>
												</div>
											</div>
										</div>

										{/* total withdrawal */}
										<div className="d-flex justify-content-between mt-3">
											<p className="font-14">Total Withdrawal</p>
											<p className="font-14 fw-bold">0.0143 ETH</p>
										</div>
									</>
								) : (
									""
								)}
								{/* button */}
								<div className="d-grid col-12 my-3">
									<button
										type="button"
										className="btn text-white mb-3"
										style={{ backgroundColor: "#1B6AEA", height: "46px" }}>
										Withdrawal
									</button>
								</div>
							</>
						) : (
							<>
								<p className="font-14 font-red bg-red-transparant p-3 mt-3 rounded">
									<ExclamationCircleFill className="me-2" /> System Maintenance, Withdrawal Suspended
								</p>
							</>
						)}
					</div>
				</>
			) : (
				""
			)}
			







				


			{/* modal select address */}
			<div
				className="modal modal-sm custom fade profile-info text-roboto rounded-0"
				id="modal-add-address"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered justify-content-center">
					<div className="modal-content rounded border-0" id="modal-addBankAccount" style={{ width: "350px" }}>
						<div className="modal-body">
							<p className="font-20 text-center fw-bold mt-3 mb-2">Choose Wallet Address</p>
							<img src={DataEmpty} alt="" className="img-fluid mx-auto d-block" />
							<p className="font-14 text-center my-3">No Wallet Address</p>
							{/* button ok */}
							<div className="d-grid col-12">
								<button
									type="button"
									className="btn text-white"
									style={{ backgroundColor: "#1B6AEA" }}
									data-bs-dismiss="modal"
									onClick={() => setShowAddAddress(true)}>
									<PlusLg /> Add new address
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* modal success add address */}
			<div
				className="modal modal-sm custom fade profile-info text-roboto rounded-0"
				id="modal-success-add-address"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered justify-content-center">
					<div className="modal-content rounded border-0" id="modal-addBankAccount" style={{ width: "350px" }}>
						<div className="modal-body">
							<p className="text-center fw-bold mb-0 font-green" style={{ fontSize: "50px" }}>
								<CheckCircleFill />
							</p>
							<div className=" row justify-content-center">
								<div className="col-11">
									<p className="font-20 text-center fw-bold mt-3 mb-2">Address Entered successfully</p>
									<p className="font-16 text-center my-3">
										Attention! Your wallet address will be saved when the withdrawal process has confirmed the email.
									</p>
								</div>
							</div>
							{/* button ok */}
							<div className="d-grid col-12">
								<button
									type="button"
									className="btn text-white"
									style={{ backgroundColor: "#1B6AEA" }}
									data-bs-dismiss="modal"
									data-bs-toggle="modal"
									data-bs-target="#modal-confirm-email">
									Understand
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* modal check confirm email */}
			<div
				className="modal modal-sm custom fade profile-info text-roboto rounded-0"
				id="modal-confirm-email"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered justify-content-center">
					<div className="modal-content rounded border-0" id="modal-addBankAccount" style={{ width: "350px" }}>
						<div className="modal-body">
							<div className=" row justify-content-center">
								<div className="">
									<p className="font-20 text-center fw-bold mt-3 mb-2">
										One More Stage ! <br /> Please check your email
									</p>
									<img src={SuccessImg} alt="" className="img-fluid mx-auto d-block" />
									<p className="font-14 text-center mb-3">Quantity : 0.003 BNB</p>
									<p className="font-14 text-center mb-0">Withdrawal Address :</p>
									<p className="font-14 text-center mb-0">0x3DGWYocR6aZ9pecoRFu9rtg6373hsjddhdyd</p>
									<p
										className="font-14 text-center my-3 p-2 rounded"
										style={{ backgroundColor: "#FCF4DD", color: "#A56D00" }}>
										If you don't find the email, please check the spam or promotion section.
									</p>
								</div>
							</div>
							{/* button ok */}
							<div className="d-grid col-12">
								<button
									type="button"
									className="btn text-white"
									style={{ backgroundColor: "#1B6AEA" }}
									data-bs-dismiss="modal">
									OK
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* modal Withdrawal Confirm */}
			<div
				className="modal modal-sm custom fade profile-info text-roboto rounded-0"
				id="modal-withdrawal-confirm"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered justify-content-center">
					<div className="modal-content rounded border-0" id="modal-addBankAccount" style={{ width: "350px" }}>
						<div className="modal-body">
							{selectedBank.length !== 0 && fixTax ? (
								<div className=" row justify-content-center">
									<p className="font-24 text-center fw-bold mt-3 mb-2">Withdrawal Confirm</p>
									<div className="d-flex justify-content-between">
										<p className="font-14 font-modal-withdrawal-confirm">Bank Name</p>
										<p className="font-14 fw-bold">{selectedBank[0].bank}</p>
									</div>
									<div className="d-flex justify-content-between">
										<p className="font-14 font-modal-withdrawal-confirm">Rekening Number</p>
										<p className="font-14 fw-bold">{selectedBank[0].rek}</p>
									</div>
									<div className="d-flex justify-content-between">
										<p className="font-14 font-modal-withdrawal-confirm">Withdraw Balance</p>
										<p className="font-14 fw-bold"> Rp {IDRFormater(+amountWitdrawal)}</p>
									</div>
									<div className="mb-3" style={{ border: "1px solid #DDE4EA" }}></div>
									<div className="d-flex justify-content-between">
										<p className="font-14 font-modal-withdrawal-confirm">Withdrawal Fee</p>
										<p className="font-14 fw-bold">Rp {IDRFormater(+fixTax)}</p>
									</div>
									<div className="d-flex justify-content-between">
										<p className="font-14 font-modal-withdrawal-confirm">Total Withdrawal</p>
										<p className="font-14 fw-bold">Rp {IDRFormater(amountWitdrawal - fixTax)}</p>
									</div>
								</div>
							) : (
								""
							)}

							{/* button ok */}
							<div className="row gx-2">
								<div className="d-grid col-6">
									<button
										type="button"
										className="btn font-primary"
										style={{ backgroundColor: "#F1F9FF" }}
										data-bs-dismiss="modal">
										Cancel
									</button>
								</div>
								<div className="d-grid col-6">
									<button
										type="button"
										className="btn text-white"
										style={{ backgroundColor: "#1B6AEA" }}
										data-bs-dismiss="modal"
										onClick={() => {
											navigate("/security-verification", {
												state: {
													name: "withdrawal",
													pair: name,
													withdrawal_amount: amountWitdrawal,
													withdrawal_account: selectedBank[0]
												}.rek
											});
											localStorage.setItem("wd_idr", `${amountWitdrawal}-${selectedBank[0].id}`);
										}}>
										OK
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default WithdrawPage;
