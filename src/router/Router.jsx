import { Route, Routes } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import { PATH } from "@/constants/path"

function Router() {

  return (
    <>
      <Routes>
        <Route path={PATH.HOME} element={<HomePage />} />
      </Routes>
    </>
  )
}

export default Router