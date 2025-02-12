import React from "react"
import { useRecoilState } from "recoil"
import { getTheme } from "../../recoil/theme.State"

function Warning() {
  const [darkMode, setDarkMode] = useRecoilState(getTheme)
  return (
    <>
      {/* warning */}
      <div
        className=" mt-4"
        style={{ backgroundColor: " rgb(128,128,128,0.05)" }}
      >
        <div className="d-flex">
          <div className="bg-danger" style={{ width: 3 }}></div>
          <div className="p-3" style={{ color: darkMode ? "white": "#667085" }}>
            <p className="font-24 fw-bold text-center mb-2">Warning</p>
            <ul className="font-12">
              <li>
                Make sure before transferring, the name in the Virtual Account
                (VA) matches the name on your digitalexchange.id account
              </li>
              <li>
                If within 1x24 hours your IDR has not been received, please
                contact our Live Chat at help.digitalexchange.id
              </li>
            </ul>
            <p
              className="font-10 font-red ps-3"
              style={{ textTransform: "uppercase" }}
            >
              Failure to follow the instructions above may cause your deposit to
              be delayed or even the loss of your funds
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Warning
