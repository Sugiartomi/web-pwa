import { selector } from "recoil"
import axiosConfig from "../config/axios"
const userToken = localStorage.getItem("token")


export const get__data_user_profile = selector({
  key: "get_user_profile",
  get: async () => {
    let userProfile = null

    if(!userToken) {
      return null
    }

    await axiosConfig
      .post("/update-profile", {
        token: userToken,
      })
      .then(({ data }) => {
        if (data.status === "success") {
          userProfile = data.info
        }
      })
      .catch((err) => {
        console.log(err)
      })
    return userProfile
  },
})


