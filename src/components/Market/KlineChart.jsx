import React, { useEffect, useRef, useState } from "react";
import { init, dispose } from "klinecharts";
import { io } from "socket.io-client";
import generatedKLineDataList from "./generatedKLineDataList";
import Layout from "./Layout";
import "./Kline.less";
import { httpSocket } from "../../config/api";
import { dbKLine } from "../../DB/KLine";

function getLanguageOptions(language) {
  return {
    candle: {
      tooltip: {
        labels: language === "en-US" ? ["T: ", "O: ", "C: ", "H: ", "L: "] : "",
      },
    },
  };
}
const types = [
  { key: "candle_solid", text: "candle solid" },
  { key: "candle_stroke", text: "candle stroke" },
  { key: "candle_up_stroke", text: "candle up stroke" },
  { key: "candle_down_stroke", text: "candle down stroke" },
  { key: "ohlc", text: "OHLC" },
  { key: "area", text: "area" },
];
function KlineChart({ assetName = "BTC", pairName = "IDR" }) {
  const chart = useRef();
  const [language, setLanguage] = useState("en-US");
  const [socketKline, setSocketKline] = useState(dbKLine);



  useEffect(() => {
    chart.current = init("real-time-k-line");
    return () => {
      dispose("real-time-k-line");
    };
  }, []);

  useEffect(() => {
    if (socketKline) {
      chart.current.applyNewData(socketKline);
    }
  }, [socketKline]);

  useEffect(() => {
    chart.current && chart.current.setStyleOptions(getLanguageOptions(language));
  }, [language]);

  return (
    <div className="col-12">
      <div className="justify-content-center">
        <Layout>
          <div id="real-time-k-line" className="k-line-chart" />
          {/* <div className="k-line-chart-menu-container">
            {types.map(({ key, text }) => {
              return (
                <button
                  key={key}
                  onClick={(_) => {
                    chart.current.setStyleOptions({
                      candle: {
                        type: key,
                      },
                    });
                  }}
                >
                  {text}
                </button>
              );
            })}
          </div> */}
        </Layout>
      </div>
    </div>
  );
}

export default KlineChart;
