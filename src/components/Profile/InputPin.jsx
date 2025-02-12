import React from "react";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

function InputPin() {
  return (
    <div>
      <mobiscroll.Numpad ref="numpad" theme="ios" themeVariant="light" template="dddd" allowLeadingZero={true} placeholder="-" mask="*" validate={this.validate}>
        <input placeholder="Please Select..." />
      </mobiscroll.Numpad>
    </div>
  );
}

export default InputPin;
