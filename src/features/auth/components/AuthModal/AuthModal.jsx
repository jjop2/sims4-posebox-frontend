import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import LoginForm from '@/features/auth/components/LoginForm/LoginForm'
import SignupForm from '@/features/auth/components/SignupForm/SignupForm'
import SignupSuccess from '@/features/auth/components/SignupSuccess/SignupSuccess'
import ForgotPasswordForm from '@/features/auth/components/ForgotPasswordForm/ForgotPasswordForm'
import ForgotPasswordSent from '@/features/auth/components/ForgotPasswordSent/ForgotPasswordSent'
import './AuthModal.css'

// authModalMode: 'login' | 'signup' | 'success' | 'forgotPassword' | 'forgotPasswordSent'

function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    switchAuthMode,
    login,
  } = useAuth()

  // 비밀번호 재설정 메일을 받을 이메일 저장
  const [resetEmail, setResetEmail] = useState('')

  // Esc 키로 닫기
  useEffect(() => {
    if (!isAuthModalOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeAuthModal()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isAuthModalOpen, closeAuthModal])

  // 모달 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isAuthModalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isAuthModalOpen])

  // 모달 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isAuthModalOpen) setResetEmail('')
  }, [isAuthModalOpen])

  if (!isAuthModalOpen) return null

  // === handlers ===
  const handleLoginSubmit = ({ email, password }) => {
    // 임시 목업 — API 연동 후 제거
    // login({ sub: email, role: 'USER', accountType: 'LOCAL' })
  }

  const handleGoogle = () => {
    // TODO: window.location.href = '/oauth2/authorization/google'
  }

  const handleForgotPasswordSubmit = (email) => {
    // TODO: POST /api/auth/forgot-password 연동
    console.log('forgot password:', { email })
    setResetEmail(email)
    switchAuthMode('forgotPasswordSent')
  }

  const handleResend = () => {
    // TODO: POST /api/auth/forgot-password 재전송
    console.log('resend forgot password mail:', { email: resetEmail })
  }

  const isSuccess = authModalMode === 'success'
  const isForgotPassword = authModalMode === 'forgotPassword' || authModalMode === 'forgotPasswordSent'
  const showTabs = !isSuccess && !isForgotPassword

  return (
    <div className="am-overlay">
      <div className="am">

        {/* 닫기 버튼 */}
        <button className="am-close" onClick={closeAuthModal} aria-label="닫기">✕</button>

        {/* 탭 — 성공/비밀번호 찾기 화면에서는 숨김 */}
        {showTabs && (
          <div className="am-tabs">
            <button
              className={`am-tab${authModalMode === 'login' ? ' active' : ''}`}
              onClick={() => switchAuthMode('login')}
            >
              로그인
            </button>
            <button
              className={`am-tab${authModalMode === 'signup' ? ' active' : ''}`}
              onClick={() => switchAuthMode('signup')}
            >
              회원가입
            </button>
          </div>
        )}

        {/* 폼 영역 */}
        <div className="am-body">
          {authModalMode === 'login' && (
            <LoginForm
              onGoogle={handleGoogle}
              onGoSignup={() => switchAuthMode('signup')}
              onForgotPassword={() => switchAuthMode('forgotPassword')}
              isModal
            />
          )}
          {authModalMode === 'signup' && (
            <SignupForm
              onSuccess={() => switchAuthMode('success')}
              onGoogle={handleGoogle}
              onGoLogin={() => switchAuthMode('login')}
              isModal
            />
          )}
          {isSuccess && (
            <SignupSuccess
              onGoLogin={() => switchAuthMode('login')}
              onGoCreator={() => {
                closeAuthModal()
                // TODO: 마이페이지 > 제작자 신청으로 navigate
              }}
            />
          )}
          {authModalMode === 'forgotPassword' && (
            <ForgotPasswordForm
              onSubmit={handleForgotPasswordSubmit}
              onBackToLogin={() => switchAuthMode('login')}
            />
          )}
          {authModalMode === 'forgotPasswordSent' && (
            <ForgotPasswordSent
              email={resetEmail}
              onResend={handleResend}
              onBackToLogin={() => switchAuthMode('login')}
            />
          )}
        </div>

      </div>
    </div>
  )
}

export default AuthModal
