import { API_PATH } from "@/constants/apiPath"
import axios from "axios"

/**
 * refreshAccessToken
 *
 * refresh token(httpOnly 쿠키)을 이용해 새로운 access token을 발급받음.
 * 
 * @returns {Promise<string>} 새로 발급된 access token
 */
export const refreshAccessToken = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}${API_PATH.AUTH.REFRESH}`,
    {},
    { withCredentials: true }
  )
  return res.data.accessToken
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