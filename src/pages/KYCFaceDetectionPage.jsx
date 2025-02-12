import React, { useState } from "react";
import { ChevronLeft, ExclamationTriangleFill } from "react-bootstrap-icons";
import { AiFillLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import FaceDetectionSampleImg from "../assets/KYC/face-detection-kyc.svg";
import SampleFaceDetection2Img from "../assets/KYC/sample-face-detection-kyc.svg";
import FaceDetectImg from "../assets/KYC/face-detect-kyc.svg";
import KycBlinkImg from "../assets/KYC/kyc-blink.svg";
import SuccessFaceDetectionImg from "../assets/KYC/success-face-detection-kyc.svg";

function KYCFaceDetectionPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);

  return (
    <>
      <div className="container text-roboto mb-3">
        <div className="d-flex pt-2">
          <p className="font-20" onClick={() => navigate("/kyc/input-personal-information")}>
            <ChevronLeft />
          </p>
          <p className="font-20 fw-bold" style={{ marginLeft: "100px" }}>
            Face Detection
          </p>
        </div>
      </div>

      {current === 1 ? (
        <div className="container text-roboto mb-3">
          {/* sample image */}
          <img src={FaceDetectionSampleImg} alt="" className="img-fluid mx-auto d-block mt-4" />

          <div>
            <p className="font-18 fw-bold mt-4 ms-4">Read before recording :</p>
            <ul className="font-16">
              <li>For identity verification purposes, we will record your face</li>
              <li>Please remove any accessories (e.g. goggles, masks, etc.)</li>
              <li>Follow the instructions on the screen</li>
            </ul>
          </div>

          {/* info */}
          <div className="d-flex p-2 mt-4 align-items-center" style={{ backgroundColor: "#E7E8F6" }}>
            <p className="font-dark mb-0">
              <AiFillLock />
            </p>
            <p className="font-10 ms-2 mb-0">Your data is fully protected in our system and will remain confidential.</p>
          </div>

          {/* button */}
          <div className="d-grid col-12">
            <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => setCurrent(2)}>
              Continue
            </button>
          </div>
        </div>
      ) : current === 2 ? (
        <>
          <div className="container text-roboto">
            <div className="row justify-content-center">
              <div className="bg-warning-custom p-2 col-10">
                <p className="font-16 text-center fw-bold">
                  <span className="font-yellow font-25 me-2">
                    <ExclamationTriangleFill />
                  </span>{" "}
                  IMPORTANT!
                </p>
                <p className="font-14 text-center">Make sure your face fits within the white dotted-line, and follow the instructions.</p>
              </div>
            </div>
            <img src={SampleFaceDetection2Img} alt="" className="img-fluid mx-auto d-block mt-5" />
          </div>

          {/* fixed button */}
          <div className="fixed-button pb-2 px-2 col-12 width-breakpoint" style={{ maxWidth : "14cm"}}>
            {/* info */}
            <div className="d-flex p-2 mt-4 align-items-center" style={{ backgroundColor: "#E7E8F6" }}>
              <p className="font-dark mb-0">
                <AiFillLock />
              </p>
              <p className="font-10 ms-2 mb-0">Your data is fully protected in our system and will remain confidential.</p>
            </div>

            {/* button */}
            <div className="d-grid col-12">
              <button type="button" className="btn text-white mt-3" style={{ backgroundColor: "#1B6AEA", height: "41px" }} onClick={() => setCurrent(3)}>
                Continue
              </button>
            </div>
          </div>
        </>
      ) : current === 3 ? (
        <>
          <div className="container text-roboto">
            <div className="d-flex">
              <p className="badge border text-dark ms-auto p-2 font-14" style={{ borderRadius: "13.4737px" }}>
                5s
              </p>
            </div>
            <img src={FaceDetectImg} alt="" className="img-fluid" />
            <p className="font-18 fw-bold text-center mt-5">Please blink</p>
            <img src={KycBlinkImg} alt="" className="img-fluid mx-auto d-block" />

            <div className="d-flex">
              <button type="button" className="btn btn-primary btn-sm ms-auto" onClick={() => navigate("/kyc/success-face-detection")}>
                next
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default KYCFaceDetectionPage;
