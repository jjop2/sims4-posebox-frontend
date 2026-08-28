import { Route, Routes } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import { PATH } from "@/constants/path"
import SignupPage from "@/pages/SignupPage"
import LoginPage from "@/pages/LoginPage"

function Router() {

  return (
    <>
      <Routes>
        <Route path={PATH.HOME} element={<HomePage />} />
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.SIGNUP} element={<SignupPage />} />
      </Routes>
    </>
  )
}

export default Router