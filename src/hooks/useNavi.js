import { useNavigate } from "react-router-dom"
import { PATH } from "@/constants/path"

function useNavi() {
  // === constants ===
  const { HOME } = PATH
  // === hooks ===
  const navigate = useNavigate()

  // 홈페이지
  const goHome = () => navigate(HOME)

  // 특정 주소
  const goTo = (path) => navigate(path)

  return { goHome, goTo }
}

export { useNavi }