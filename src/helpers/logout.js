export const handleLogut = (navigate) => {
  // dispatch(login_status(false));
  let emailRemember = localStorage.getItem("remember-me")
  let theme = JSON.parse(localStorage.getItem("theme"))
  if (emailRemember || theme) {
    localStorage.clear()
    if (emailRemember) {
      localStorage.setItem("remember-me", emailRemember)
    }
    if (theme) {
      localStorage.setItem("theme", theme)
    }
  } else {
    localStorage.clear()
  }
  navigate("/login")
  window.location.reload()
}
