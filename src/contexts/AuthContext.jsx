// 현재 접속한 유저 정보 + 인증 모달 context

import { createContext, useContext, useState, useCallback } from 'react'

// === context ===
export const AuthContext = createContext(null)

// === provider ===
function AuthProvider({ children }) {
  // === states ===
  const [user, setUser] = useState(null)

  // 'login' | 'signup' | 'success' | 'forgotPassword' | 'forgotPasswordSent'
  const [authModalMode, setAuthModalMode] = useState('login')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // === auth handlers ===
  const login = (userData) => {
    setUser(userData)
    setIsAuthModalOpen(false)
  }

  const logout = () => {
    setUser(null)
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

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoggedIn: !!user,
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
