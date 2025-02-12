import { atom, selector } from "recoil"
import axios from "axios"
import axiosConfig from "../config/axios"
import { baseURLApi } from "../config/api"
const userToken = localStorage.getItem("token")

export const fix_total_balance = atom({
  key: "totalAssetBalance",
  default: 0,
})

export const get_data_total_wallet = selector({
  key: "key_data_total_wallet",
  get: async () => {
    let totalAsset = 0
    if (!userToken) {
      return null
    }

    try {
      let dataTicker = null
      let dataWallet = []
      let totalAsset = 0

      await axios
        .get(baseURLApi+"/allticker")
        .then(async ({ data }) => {
          if (data.status === "success") {
            dataTicker = data.data

            await axiosConfig
              .post("/wallet", {
                token: userToken,
              })
              .then(({ data }) => {
                if (data.status === "success") {
                  let newArr = data.data

                  newArr.forEach((wallet) => {
                    dataTicker.map((ticker) => {
                      if (
                        wallet.symbol === ticker.symbol.slice(0, -3) &&
                        ticker.symbol.slice(-3) === "IDR"
                      ) {
                        wallet.price = ticker.last_price
                      }
                    })
                  })
                  dataWallet = newArr
                }
              })
          }
        })
      return dataWallet
    } catch (error) {
      console.log(error)
    }
  },
})

const handleTotal = (arr) => {
  let total = 0
  arr.forEach((e) => {
    if (e.symbol === "IDR") {
      total = total + (+e.amount + +e.amount_frozen)
    } else {
      total = total = (+e.amount + +e.amount_frozen) * +e.price
    }
  })
  return total
}

// HELPER
const handleAddIdrEstimation = (dataTicker, amount, amountFrozen, symbol) => {
  let allData =
    dataTicker &&
    dataTicker.filter((el) => el.symbol.slice(0, -3) === symbol)[0]
      ?.last_price *
      (+amount + +amountFrozen)

  if (symbol === "IDR") {
    allData = +(+amount + +amountFrozen)
  }
  if (!isNaN(allData)) {
    return allData
  } else {
    return 0
  }
}
