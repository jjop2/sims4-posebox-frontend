import { API_PATH } from "@/constants/apiPath"
import axios from "axios"

/**
 * refreshAccessToken
 *
 * refresh token(httpOnly 쿠키)을 이용해 user 정보 및 새로운 access token를 발급받음.
 * 
 * @returns {Promise<{accessToken: string, user: object}>}
 */
export const refreshAccessToken = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}${API_PATH.AUTH.REFRESH}`,
    {},
    { withCredentials: true }
  )
  return res.data
}

/**
 * logoutRequest
 * 
 * logout 요청
 */
export const logoutRequest = async () => {
  await axios.post(
    `${import.meta.env.VITE_SERVER_URL}${API_PATH.AUTH.LOGOUT}`,
    {},
    { withCredentials: true }
  )
}