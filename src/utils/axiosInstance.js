import axios from "axios";

/**
 * axiosInstance
 * 
 * Axios를 프로젝트 전역에서 재사용할 수 있도록 기본 설정을 지정한 인스턴스.  
 * 모든 API 요청에 공통적으로 적용되는 `baseURL`, `headers` 옵션을 포함.
 * 
 * 주요 설정:
 * - `baseURL`: 환경변수(`VITE_SERVER_URL`)에서 불러와 서버 기본 주소를 지정  
 * - `headers`: 모든 요청에 기본 Content-Type을 JSON으로 지정  
 * 
 * @constant
 * @type {import("axios").AxiosInstance}
 * @property {string} baseURL - API 서버 기본 경로
 * @property {object} headers - 모든 요청에 적용되는 HTTP 헤더
 */

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

export default axiosInstance