import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import { RecoilRoot, useRecoilState } from "recoil"
import img_loading from "./assets/loading.gif"
import { getTheme } from "./recoil/theme.State"

const root = ReactDOM.createRoot(document.getElementById("root"))

function Loading() {
  const [ darkMode, setDarkMode] = useRecoilState(getTheme)
  return (
    <div className={darkMode ? "d-flex justify-content-center bg-dark-mode2" : "d-flex justify-content-center"}>
      <div style={{ maxWidth: "512px", height: "100vh" }}>
        <div className="d-flex justify-content-center align-items-center h-100" style={{ flexDirection : "column"}}>
          <div>
            <div
              className="fw-bold text-secondary text-center"
              style={{ zIndex: 3 }}
            >
              Loading...
            </div>
            <div className="d-flex justify-content-center">
              <img
                src={img_loading}
                className="img-fluid w-50"
                alt=""
                style={{ marginTop: "-50px", zIndex: -1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RecoilRoot>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </RecoilRoot>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  // <Provider store={store}>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
