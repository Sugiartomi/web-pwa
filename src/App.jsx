import "./App.css"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import WalletPage from "./pages/WalletPage"
import AssetDetailPage from "./pages/AssetDetailPage"
import DepositPage from "./pages/DepositPage"
import WithdrawPage from "./pages/WithdrawPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import NotificationPage from "./pages/NotificationPage"
import MarketPage from "./pages/MarketPage"
import MarketSearchPage from "./pages/MarketSearchPage"
import MarketDetailPage from "./pages/MarketDetailPage"
import BasicTradingPage from "./pages/BasicTradingPage"
import TradeTransactionPage from "./pages/TradeTransactionPage"
import PointCenterPage from "./pages/PointCenterPage"
import VoucherPage from "./pages/VoucherPage"
import SecurityVerificationPage from "./pages/SecurityVerificationPage"
import PriceAlertPage from "./pages/PriceAlertPage"
import MyProfilePage from "./pages/MyProfilePage"
import ProfilePage from "./pages/ProfilePage"
import SecurityPage from "./pages/SecurityPage"
import ChangePasswordPage from "./pages/ChangePasswordPage"
import DeleteAccountPage from "./pages/DeleteAccountPage"
import PhoneVerificationPage from "./pages/PhoneVerificationPage"
import CreatePinPage from "./pages/CreatePinPage"
import ConfirmPinPage from "./pages/ConfirmPinPage"
import InputOtpPage from "./pages/InputOtpPage"
import ActivePinPage from "./pages/ActivePinPage"
import Google2FAPage from "./pages/Google2FAPage"
import SettingPage from "./pages/SettingPage"
import ChangeLanguagePage from "./pages/ChangeLanguagePage"
import HelpPage from "./pages/HelpPage"
import KYCPage from "./pages/KYCPage"
import KYCPersonalInformationPage from "./pages/KYCPersonalInformationPage"
import KYCSelectKtpPage from "./pages/KYCSelectKtpPage"
import KYCIdentityVerificationPage from "./pages/KYCIdentityVerificationPage"
import KYCUploadSelfiePage from "./pages/KYCUploadSelfiePage"
import KYCTakePhotoDocument from "./pages/KYCTakePhotoDocument"
import KYCPreviewPage from "./pages/KYCPreviewPage"
import KYCInputPersonalInformation from "./pages/KYCInputPersonalInformation"
import KYCFaceDetectionPage from "./pages/KYCFaceDetectionPage"
import KYCSFaceDetectionSuccessPage from "./pages/KYCSFaceDetectionSuccessPage"
import KYCVerivicationProcess from "./pages/KYCVerivicationProcess"
import Authenticator2FAPage from "./pages/Authenticator2FAPage"
import AddBankAccountPage from "./pages/AddBankAccountPage"
import ListAssetsPage from "./pages/ListAssetsPage"
import Tes from "./pages/Tes"
import PortofolioAssetPage from "./pages/PortofolioAssetPage"
import ReactiveAccount from "./pages/ReactiveAccount"
import ReOrderPage from "./pages/ReOrderPage"
import TesLogin from "./pages/TesLogin"
import TestWallet from "./pages/TestWallet"
import LoginPinPage from "./pages/LoginPinPage"
import ProtectRouter from "./pages/ProtectRouter"
import LatestPinPage from "./pages/LatestPinPage"
import ChatRoom from "./pages/ChatRoom"
import Disable2FA from "./pages/Disable2FA"
import EditBankAccountPage from "./pages/EditBankAccount"
import ProtectAllRouter from "./pages/ProtectAllRouter"
import TransactionBuySell from "./pages/TransactionBuySell"
import { useRecoilState } from "recoil"
import { getTheme } from "./recoil/theme.State"
import { useEffect } from "react"

function App() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      let theme = JSON.parse(localStorage.getItem("theme"))
      if (theme) {
        setDarkMode(true)
      } else {
        setDarkMode(false)
      }
    } else {
      localStorage.setItem("theme", false)
      setDarkMode(false)
    }
  }, [])
  return (
    <div className="App">
      <div
        className={
          darkMode
            ? "d-flex justify-content-center bg-dark-mode"
            : "d-flex justify-content-center"
        }
      >
        {/* <div className={ "d-flex justify-content-center"}> */}
        <div className="w-100" style={{ maxWidth: 480 }}>
          <Routes>
            {/* DONE */}
            <Route path="/login" element={<LoginPage />} />
            {/* DONE */}
            <Route
              path="/2FA-authenticator"
              element={<Authenticator2FAPage />}
            />
            {/* DONE */}
            <Route path="/login-pin" element={<LoginPinPage />} />
            {/* DONE */}
            <Route path="/register" element={<RegisterPage />} />
            {/* DONE */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* DONE */}
            <Route path="/reactive-account" element={<ReactiveAccount />} />
            {/* DONE - landing*/}
            <Route path="/" element={<HomePage />} />
            {/* DONE - market*/}
            <Route path="/market" element={<MarketPage />} />
            {/* DONE - market detail */}
            <Route path="/market/:name" element={<MarketDetailPage />} />
            {/* {protection()} */}
            <Route element={<ProtectRouter />}>
              {/* DONE - profile*/}
              <Route path="/profile" element={<ProfilePage />} />
              {/* DONE- Security */}
              <Route path="/security" element={<SecurityPage />} />
              {/* DONE- change pass */}
              <Route path="/change-password" element={<ChangePasswordPage />} />
              {/* DONE - delete acc */}
              <Route path="/delete-account" element={<DeleteAccountPage />} />
              {/* DONE-disable 2FA */}
              <Route path="/disable-2fa" element={<Disable2FA />} />
              {/* DONE - phone-verf */}
              <Route
                path="/phone-verification"
                element={<PhoneVerificationPage />}
              />
              {/* DONE -ALL pin */}
              <Route path="/change-pin" element={<LatestPinPage />} />
              <Route path="/create-pin" element={<CreatePinPage />} />
              <Route path="/confirm-pin" element={<ConfirmPinPage />} />
              <Route path="/input-otp" element={<InputOtpPage />} />
              <Route path="/active-pin" element={<ActivePinPage />} />
              <Route path="/google-2FA" element={<Google2FAPage />} />
              {/* DONE ALL - KYC */}
              {/* kyc */}
              <Route path="/kyc" element={<KYCPage />} />
              <Route
                path="/kyc/personal-information"
                element={<KYCPersonalInformationPage />}
              />
              <Route
                path="/kyc/select-document-ktp"
                element={<KYCSelectKtpPage />}
              />
              <Route
                path="/kyc/identity-verification"
                element={<KYCIdentityVerificationPage />}
              />
              <Route
                path="/kyc/take-photo-document"
                element={<KYCTakePhotoDocument />}
              />
              <Route
                path="/kyc/upload-selfie"
                element={<KYCUploadSelfiePage />}
              />
              <Route path="/kyc/preview" element={<KYCPreviewPage />} />
              <Route
                path="/kyc/input-personal-information"
                element={<KYCInputPersonalInformation />}
              />
              <Route
                path="/kyc/face-detection"
                element={<KYCFaceDetectionPage />}
              />
              <Route
                path="/kyc/success-face-detection"
                element={<KYCSFaceDetectionSuccessPage />}
              />
              <Route
                path="/kyc/verification-process"
                element={<KYCVerivicationProcess />}
              />
              {/* dashboard */}
              {/* Done */}
              <Route path="/point-center" element={<PointCenterPage />} />{" "}
              {/* Done */}
              <Route path="/voucher" element={<VoucherPage />} />
              {/* Done */}
              <Route
                path="/security-verification"
                element={<SecurityVerificationPage />}
              />
              {/* Done */}
              <Route path="/price-alert" element={<PriceAlertPage />} />
              {/* Done */}
              <Route path="/notification" element={<NotificationPage />} />
              {/* wallet */}
              {/* Done */}
              <Route path="/wallet" element={<WalletPage />} />
              {/* Done */}
              <Route path="/asset-detail/:name" element={<AssetDetailPage />} />
              {/* Done */}
              <Route path="/deposit/:name" element={<DepositPage />} />
              {/* Done */}
              <Route path="/withdraw/:name" element={<WithdrawPage />} />
              {/* Done */}
              <Route
                path="/add-bank-account"
                element={<AddBankAccountPage />}
                />
                {/* Done */}
              <Route
                path="/edit-bank-account"
                element={<EditBankAccountPage />}
                />
                {/* Done */}
              <Route
                path="/list-assets/withdraw"
                element={<ListAssetsPage />}
                />
                {/* Done */}
              <Route path="/list-assets/deposit" element={<ListAssetsPage />} />
                {/* Done */}
              <Route
                path="/portofolio-assets"
                element={<PortofolioAssetPage />}
                />
              {/* trading */}
                {/* Done */}
              <Route path="/trade/:name" element={<BasicTradingPage />} />
              {/* Done */}
              <Route
                path="/trade-transaction/:name"
                element={<TradeTransactionPage />}
                />
                {/* Done */}
              <Route
                path="/transaction/:name"
                element={<TransactionBuySell />}
                />
              {/* reactive account */}
              {/* re order */}
                {/* Done */}
              <Route path="/re-order" element={<ReOrderPage />} />
              {/* My Profile */}
                {/* Done */}
              <Route path="/my-profile" element={<MyProfilePage />} />
                {/* Done */}
              <Route path="/chat-room" element={<ChatRoom />} />
                {/* Done */}
              <Route path="/setting" element={<SettingPage />} />
                {/* Done */}
              <Route path="/change-language" element={<ChangeLanguagePage />} />
                {/* Done */}
              <Route path="/help" element={<HelpPage />} />
            </Route>
            <Route path="/test" element={<Tes />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
