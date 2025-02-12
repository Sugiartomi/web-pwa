import React from "react"
import axios from "axios"
import { RGCaptcha, reset } from "react-geetest-captcha"
import { apiDev } from "../../config/api"

export default function TestGeetest({
  setGeetest_challenge,
  setGeetest_seccode,
  setGeetest_validate,
  setInput,
  input,
}) {
  const CAPTCHA_NAME = "demoCaptcha"

  //   function resetForm() {
  //     reset(CAPTCHA_NAME);
  //     this.setState({
  //       geetestChallenge: "",
  //       geetestValidate: "",
  //       geetestSeccode: "",
  //     });
  //   }

  function handleSuccess(data) {
    setGeetest_challenge(data.geetest_challenge)
    setGeetest_validate(data.geetest_validate)
    setGeetest_seccode(data.geetest_seccode)
    setInput({
      ...input,
      geetest_challenge: data.geetest_challenge,
      geetest_validate: data.geetest_validate,
      geetest_seccode: data.geetest_seccode,
    })
  }

  return (
    <RGCaptcha
      name={CAPTCHA_NAME}
      width="100%"
      lang="en"
      onSuccess={handleSuccess}
      data={() =>
        axios
          .get(apiDev + "/v2/geetest/register?t=" + new Date().getTime())
          .then((resp) => {
            return resp.data
          })
      }
    />
  )
}
