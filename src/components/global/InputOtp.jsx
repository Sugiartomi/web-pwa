import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const InputOtp = ({ fnHandle }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (otp.length >= 4) {
  //     navigate(navigation);
  //   }
  // }, [otp]);

  return <OtpInput value={otp} onChange={setOtp} numInputs={6} renderInput={(props) => <input {...props} />} separator={<span></span>} inputStyle="inputStyle mb-4 mx-auto d-block" shouldAutoFocus="false" />;
};

export default InputOtp;
