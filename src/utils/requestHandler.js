import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGES, NETWORK_ERROR_MESSAGE } from "@/constants/errorMessages"
import axiosInstance from "./axiosInstance"

const requestHandler = async ({
  method,
  url,
  payload = {},
  onSuccess,
  onError,
  setLoading,
  params
}) => {
  const m = method?.toLowerCase?.() || "get"

  try {
    setLoading?.(true)

    let res
    if (m === "get") {
      res = await axiosInstance.get(url, { params: params ?? payload })
    } else if (m === "delete") {
      res = await axiosInstance.delete(url, { data: payload, params })
    } else {
      res = await axiosInstance[m](url, payload, params ? { params } : undefined)
    }

    onSuccess?.(res.data)
    return { ok: true, data: res.data }
  } catch (err) {
    let msg
    let errorCode

    if (err?.response) {
      errorCode = err.response.data?.errorCode
      msg = ERROR_MESSAGES[errorCode] || DEFAULT_ERROR_MESSAGE
    } else {
      msg = NETWORK_ERROR_MESSAGE
    }
    
    onError?.(msg, err)
    return { ok: false, message: msg }
  } finally {
    setLoading?.(false)
  }
}

export default requestHandler