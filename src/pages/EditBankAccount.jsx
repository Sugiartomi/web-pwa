import React, { useState } from "react"
import { ChevronLeft } from "react-bootstrap-icons"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { FaRegClock } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { add_bank_account } from "../store/actions/user"
import axiosConfig from "../config/axios"
import { useRecoilState } from "recoil"
import { getTheme } from "../recoil/theme.State"

function EditBankAccountPage() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [bankAccountName, setBankAccountName] = useState()
  const [bankCode, setBankCode] = useState()
  const [accountNumber, setAccountNumber] = useState()
  const userToken = localStorage.getItem("token")
  const fullName = JSON.parse(localStorage.getItem("data_user")).user.fullname
  const bankId = localStorage.getItem("temp-edit-bank").split("-")[0]
  const bankName = localStorage.getItem("temp-edit-bank").split("-")[1]
  const bankNumber = localStorage.getItem("temp-edit-bank").split("-")[2]

  const handleSubmit = () => {

  }

  const handleDelete = () => {

  }

  return (
    <>
      <div
        action=""
        className={darkMode ? "mt-2 text-white" : "mt-2"}
        style={{ minHeight: "100vh" }}
      >
        <div
          className="container text-roboto d-flex justify-content-between  "
          style={{ flexDirection: "column" , minHeight : "97vh"}}
        >
          <div>
            {/* title */}
            <div className="d-flex align-items-center">
              <p
                className="fw-bold"
                onClick={() => {
                  localStorage.removeItem("temp-edit-bank")
                  navigate(`/withdraw/IDR`)
                }}
              >
                <ChevronLeft />
              </p>
              <p className="fw-bold font-20" style={{ marginLeft: "90px" }}>
                Edit Account Bank
              </p>
            </div>

            <p className="font-14 mt-4">Please Check all data before submit</p>
            {/* bank account name */}
            <div className="mb-3">
              <label className="font-14">Bank Account Name</label>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className={ darkMode ? "form-control shadow-none border-0 bg-dark-mode2 text-white" : "form-control shadow-none border-0"}
                  value={fullName}
                  style={{ backgroundColor: "#DDE4EA", height: "54px" }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="font-14">Bank Name</label>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className={ darkMode ? "form-control shadow-none border-0 bg-dark-mode2 text-white" : "form-control shadow-none border-0"}
                  value={bankName}
                  style={{ backgroundColor: "#DDE4EA", height: "54px" }}
                />
              </div>
            </div>

            {/* bank name */}
            {/* <div className="mb-3">
						<label className="font-14">Bank name</label>
						<select className="form-select font-16" aria-label="Default select example" onChange={(e) => setBankCode(e.target.value)} style={{ height: "54px", border: "1px solid #DDE4EA" }}>
						<option value="000" selected disabled>
						Choose the bank that suits your account
						</option>
						<option label="" value="009">
						Bank BNI 46
						</option>
						<option label="Bank BCA" value="014" />
						<option label="BII Maybank" value="016" />
						<option label="Bank Mandiri Tbk" value="008" />
						<option value="002" label="Bank BRI" />
						<option value="008" label="Bank Mandiri Tbk" />
						<option value="009" label="Bank BNI 46" />
						<option value="011" label="Bank Danamon" />
						<option value="013" label="Permata Bank" />
						<option value="014" label="Bank BCA" />
						<option value="016" label="BII Maybank" />
						<option value="019" label="Bank Panin" />
						<option value="022" label="Bank CIMB Niaga" />
						<option value="023" label="UOB Indonesia" />
							<option value="028" label="Bank OCBC NISP" />
							<option value="031" label="Citibank" />
							<option value="036" label="Bank Windu" />
							<option value="037" label="Bank Artha Graha" />
							<option value="042" label="The Bank of Tokyo-Mitsubishi UFJ" />
							<option value="046" label="DBS" />
							<option value="050" label="Standard Chartered Bank" />
							<option value="054" label="Bank Capital" />
							<option value="061" label="ANZ-Panin Bank" />
							<option value="076" label="Bank Bumi Arta" />
							<option value="084" label="Bank HSBC Indonesia" />
							<option value="088" label="Bank Antar Daerah" />
							<option value="089" label="Robobank" />
							<option value="095" label="Mutiara Bank" />
							<option value="097" label="Bank Mayapada Internasional" />
							<option value="110" label="Bank BJB" />
							<option value="111" label="Bank DKI" />
							<option value="112" label="BPD DIY" />
							<option value="113" label="Bank Jateng" />
							<option value="114" label="Bank Jatim" />
							<option value="115" label="Bank Jambi" />
							<option value="116" label="Bank BPD Aceh" />
							<option value="117" label="Bank Sumut" />
							<option value="118" label="Bank Nagari" />
							<option value="119" label="Bank Kepulauan Riau" />
							<option value="120" label="Bank Sumsel Babel" />
							<option value="121" label="Bank Lampung" />
							<option value="122" label="Bank BPD Kalsel" />
							<option value="123" label="Bank Kalbar" />
							<option value="124" label="Bank BPD Kaltim" />
							<option value="125" label="BPD Kalteng" />
							<option value="126" label="Bank Sulsel" />
							<option value="127" label="Bank Sulut" />
							<option value="128" label="Bank NTB" />
							<option value="129" label="BPD Bali" />
							<option value="130" label="Bank NTT" />
							<option value="131" label="Bank Maluku" />
							<option value="132" label="Bank Papua" />
							<option value="133" label="Bank Bengkulu" />
							<option value="134" label="Bank Sulteng" />
							<option value="135" label="Bank Sultra" />
							<option value="145" label="Bank BNP" />
							<option value="146" label="Bank Swadesi" />
							<option value="147" label="Bank Muamalat" />
							<option value="151" label="Bank Mestika" />
							<option value="153" label="Bank Sinarmas" />
							<option value="157" label="Bank Maspion" />
							<option value="161" label="Bank Ganesha" />
							<option value="167" label="Bank Kesawan" />
							<option value="200" label="Bank Tabungan Negara" />
							<option value="212" label="Bank Saudara" />
							<option value="213" label="BTPN" />
							<option value="422" label="Bank BRI Syariah" />
							<option value="451" label="Bank Syariah Indonesia" />
							<option value="425" label="Bank Jabar Banten Syariah" />
							<option value="426" label="Bank Mega" />
							<option value="441" label="Bank Bukopin" />
							<option value="451" label="Bank Syariah Mandiri" />
							<option value="472" label="Bank Jasa Jakarta" />
							<option value="484" label="Bank Hana" />
							<option value="485" label="Bank ICB Bumiputera" />
							<option value="494" label="PT Bank Rakyat Indonesia AGRONIAGA" />
							<option value="498" label="SBI" />
							<option value="501" label="Bank Royal" />
							<option value="503" label="Bank Nobu" />
							<option value="506" label="Bank Syariah Mega Indonesia" />
							<option value="513" label="Bank Ina Perdana" />
							<option value="523" label="Bank Sahabat Sampoerna" />
							<option value="535" label="Bank Kesejahteraan" />
							<option value="536" label="Bank BCA Syariah" />
							<option value="542" label="Bank Artos Indonesia" />
							<option value="553" label="Bank Mayora" />
							<option value="555" label="Bank Index" />
							<option value="558" label="Bank Pundi" />
							<option value="566" label="Bank Victoria" />
							<option value="688" label="BPR Karyajatnika Sadaya (BPRKS)" />
							<option value="911" label="TCASH" />
							<option value="945" label="PT. Bank Agris" />
							<option value="949" label="Bank Chinatrust Indonesia" />
							<option value="950" label="Bank Commonwealth" />
							</select>
						</div> */}

            {/* account number */}
            <div className="mb-3">
              <label className="font-14">Account number</label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  className={ darkMode ? "form-control shadow-none border-0 bg-dark-mode2 text-white" : "form-control shadow-none"}
                  placeholder={bankNumber}
                  style={{ border: "1px solid #DDE4EA", height: "54px" }}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* button delete dan done hanya akan muncul jika state.status adalah edit. fungsinya adalah untuk submit edit bank acount */}

          <div className="row gx-2">
            <div className="d-grid col-6">
              <button
                type="submit"
                className="btn font-red"
                style={{ border: "1px solid #F4465E" }}
                onClick={() => handleDelete()}
              >
                Delete Account Bank
              </button>
            </div>
            <div className="d-grid col-6">
              <button
                type="submit"
                className="btn text-white"
                style={{ backgroundColor: "#1B6AEA" }}
                onClick={() => handleSubmit()}
              >
                Save Change
              </button>
            </div>
          </div>
        </div>

        {/* button next hanya akan muncul jika state.status adalah add. fungsinya untuk submit add bank account */}
      </div>

      {/* modal verified account */}
      <div
        className="modal modal-sm custom fade profile-info text-roboto rounded-0"
        id="modal-account-verification"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div
            className="modal-content rounded border-0"
            id="modal-addBankAccount"
            style={{ width: "350px" }}
          >
            <div className="modal-body">
              <p className="font-22 fw-bold text-center mb-0">
                Account Verification <br /> Bank Processed
              </p>
              <p
                className="text-center font-yellow fw-bolder mb-0"
                style={{ fontSize: "50px" }}
              >
                <FaRegClock />
              </p>
              <p className="font-14 text-center font-grey2">
                We will verify your bank account account within 1x24 hours.
              </p>
              {/* button ok */}
              <div className="d-grid col-12">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B6AEA" }}
                  data-bs-dismiss="modal"
                  onClick={() => navigate(`/withdraw/IDR`)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditBankAccountPage
