import { io } from "socket.io-client"

// setDataMarket ----from---- LandingPage/TableCoin
// market ----from---- MarketPage

const CONNECTION_PORT = "https://socket.digitalexchange.id"

function connectSocketMarket(setData0, setData1, location, off, param) {
  const socket = io(CONNECTION_PORT, {
    transports: ["websocket"],
  })
  const CHANNEL = "tradedata-market"
  socket.emit("subscribe", "guest.tradedata-market")
  socket.on(CHANNEL, (data) => {
    if (off) {
      return socket.disconnect("subscribe", "guest.tradedata-market")
    }

    if (location === "landing-page") {
      setData0([
        {
          image: "https://digitalexchange.id/assets/img/coin/BTC.png",
          asset: "BTC",
          name: "Bitcoin",
          lastPrice: data.BTCIDR.last,
          change: data.BTCIDR.last_percentage,
        },

        {
          image: "https://digitalexchange.id/assets/img/coin/USDT.png",
          asset: "USDT",
          name: "USD Tether",
          lastPrice: data.USDTIDR.last,
          change: data.USDTIDR.last_percentage,
        },

        {
          image: "https://digitalexchange.id/assets/img/coin/ETH.png",
          asset: "ETH",
          name: "Ethereum",
          lastPrice: data.ETHIDR.last,
          change: data.ETHIDR.last_percentage,
        },

        {
          image: "https://digitalexchange.id/assets/img/coin/LTC.png",
          asset: "LTC",
          name: "Litecoin",
          lastPrice: data.LTCIDR.last,
          change: data.LTCIDR.last_percentage,
        },
      ])
    } else if (location === "market" || location === "market-search") {
      const ALL = []
      const IDR1 = []
      const IDR0 = []
      const USDT = []
      for (const e in data) {
        const coin = data[e]
        let status = false
        let assets = ""
        let pair = ""
        if (
          e.slice(e.length - 3, e.length) === "IDR" ||
          e.slice(e.length - 3, e.length) === "BTC"
        ) {
          status = true
          assets = e.slice(0, e.length - 3)
          pair = e.slice(e.length - 3, e.length)
        } else {
          assets = e.slice(0, e.length - 4)
          pair = e.slice(e.length - 4, e.length)
          if (pair == "USDT") {
            status = true
          }
        }
        let formatedNumber = 0
        if (Number(coin.last) < 1) {
          formatedNumber = Number(coin.last).toLocaleString()
        } else {
          formatedNumber = Number(coin.last)
        }

        let dataAssets = {
          img: `https://assets.digitalexchange.id/coin/${assets}.png`,
          assetsName: `${assets}/${pair}`,
          symbol: `${assets}${pair}`,
          // assetsName: `${assets}`,
          last_price: formatedNumber,
          last_price_percentage_24h: coin.last_percentage,
          volume: coin.vol,
          high24: Number(coin.high),
          low24: Number(coin.low),
          integrasi: coin.int,
        }

        ALL.push(dataAssets)

        if (status) {
          if (pair === "IDR") {
            if (coin.int == 0) {
              if (coin.beta == 1) {
                IDR1.push(dataAssets)
              } else {
                IDR0.push(dataAssets)
              }
            } else {
              IDR1.push(dataAssets)
            }
          } else if (pair === "USDT") {
            USDT.push(dataAssets)
          }
        }
      }

      if (location === "market") {
        setData0(IDR0)
        setData1(IDR1)
      } else if (location === "market-search") {
        setData0(ALL)
      }
    }
  })
}

export default connectSocketMarket
