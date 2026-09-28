// 현재 접속한 유저 정보 + 인증 모달 context

import { logoutRequest, refreshAccessToken } from '@/features/auth/utils/authApi'
import { registerAuthHandlers } from '@/utils/axiosInstance'
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

// === context ===
export const AuthContext = createContext(null)

// === provider ===
function AuthProvider({ children }) {
  // === states ===
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  // 'login' | 'signup' | 'success' | 'forgotPassword' | 'forgotPasswordSent'
  const [authModalMode, setAuthModalMode] = useState('login')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // === auth handlers ===
  const login = (accessToken, user) => {
    setAccessToken(accessToken)
    setUser(user)
    setIsAuthModalOpen(false)
  }

  const logout = async () => {
    try {
      await logoutRequest()
    } catch (err) {
      console.error('Logout request failed:', err)
    } finally {
      setAccessToken(null)
      setUser(null)
    }
  }

  // === modal handlers ===
  const openAuthModal = useCallback((mode = 'login') => {
    setAuthModalMode(mode)
    setIsAuthModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false)
  }, [])

  const switchAuthMode = useCallback((mode) => {
    setAuthModalMode(mode)
  }, [])

  // === register access token ===
  useEffect(() => {
    registerAuthHandlers(
      () => accessToken,
      (token) => setAccessToken(token),
      () => {
        setAccessToken(null)
        setUser(null)
      }
    )
  }, [accessToken])

  // === refresh access token ===
  // 마운트 시 자동으로 refresh 요청하여 로그인 유지
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const newAccessToken = await refreshAccessToken()
        setAccessToken(newAccessToken)
      } catch (refreshError) {
        // refresh 실패 = 로그인 이력 없음 또는 refresh token 만료 -> 비로그인 상태 유지
      }
    }

    restoreSession()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoggedIn: !!accessToken,
      isAuthModalOpen,
      authModalMode,
      openAuthModal,
      closeAuthModal,
      switchAuthMode,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// === hook ===
function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
