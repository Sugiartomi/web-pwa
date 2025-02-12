import axios from "axios";
import React from "react";
import { RGCaptcha, reset } from "react-geetest-captcha";

const CAPTCHA_NAME = "demoCaptcha";

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      captcha: false,
      geetestChallenge: "",
      geetestValidate: "",
      geetestSeccode: "",
    };
  }

  resetForm() {
    reset(CAPTCHA_NAME);
    this.setState({
      username: "",
      password: "",
      captcha: false,
      geetestChallenge: "",
      geetestValidate: "",
      geetestSeccode: "",
    });
  }

  handleFieldChange(e) {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  }

  handleSuccess(data) {
    this.setState({
      captcha: true,
      geetestChallenge: data.geetest_challenge,
      geetestValidate: data.geetest_validate,
      geetestSeccode: data.geetest_seccode,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, captcha, geetestChallenge, geetestValidate, geetestSeccode } = this.state;

    if (captcha) {
      axios({
        method: "POST",
      })
        .then((data) => {
          if (data.success) {
            //
          } else {
            this.resetForm();
          }
        })
        .catch(() => {
          this.resetForm();
        });
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleFieldChange}>
        <label>
          Username:
          <input name="username" value={username} type="text" />
        </label>
        <label>
          Password:
          <input name="password" value={password} type="password" />
        </label>
        <RGCaptcha
          name={CAPTCHA_NAME}
          width="100%"
          onSuccess={this.handleSuccess()}
          data={() =>
            axios("").then((resp) => {
              const { captcha } = (resp && resp.data) || {};
              // console.log(captcha);
              // {
              //   "gt": "e385d274eeedb650fa008875ff7b14a2",
              //   "challenge": "f4873d2af972a38811814f644920b8ab",
              //   "success": 1,
              // }
              return captcha;
            })
          }
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
