import { refreshAccessToken } from "@/features/auth/utils/authApi";
import axios from "axios";

/**
 * axiosInstance
 * 
 * Axios를 프로젝트 전역에서 재사용할 수 있도록 기본 설정을 지정한 인스턴스.  
 * 모든 API 요청에 공통적으로 적용되는 `baseURL`, `headers`, `withCredentials` 옵션을 포함.
 * 
 * 주요 설정:
 * - `baseURL`: 환경변수(`VITE_SERVER_URL`)에서 불러와 서버 기본 주소를 지정  
 * - `headers`: 모든 요청에 기본 Content-Type을 JSON으로 지정  
 * - `withCredentials`: true로 설정하여 요청/응답 시 쿠키를 함께 주고받음.
 * 
 * @constant
 * @type {import("axios").AxiosInstance}
 * @property {string} baseURL - API 서버 기본 경로
 * @property {object} headers - 모든 요청에 적용되는 HTTP 헤더
 * @property {boolean} withCredentials - 쿠키 기반 인증(refreshToken) 허용 여부
 */

let getAccessToken = () => null
let setAccessTokenExternally = () => {}
let onAuthExpired = () => {}

// AccessToken 등록 및 꺼내오기, 만료 시 삭제하기
// AuthProvider에서 지정
export const registerAuthHandlers = (getter, setter, expiredHandler) => {
  getAccessToken = getter
  setAccessTokenExternally = setter
  onAuthExpired = expiredHandler
}

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    const token = getAccessToken()
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    /* refresh 요청 조건
        - 에러 코드가 401
        - 인증이 필요한 요청(requiresAuth=true)
        - 이전에 refresh 요청 시도를 하지 않음(_retry=false)
     */
    if (
      error.response?.status === 401 &&
      originalRequest.requiresAuth &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const newAccessToken = await refreshAccessToken()
        setAccessTokenExternally(newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
        
      } catch (refreshError) {
        onAuthExpired()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance