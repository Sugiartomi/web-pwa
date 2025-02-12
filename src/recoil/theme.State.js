import { atom, selector } from "recoil"


export const getTheme = atom({
    key: "get_theme",
    default: JSON.parse(localStorage.getItem("theme")),
  })