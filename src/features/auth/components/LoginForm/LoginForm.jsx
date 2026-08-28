import { useState } from 'react'
import './LoginForm.css'
import { EMAIL_REGEX } from '@/constants/regex'
import requestHandler from '@/utils/requestHandler'

// Props
// - onSubmit        : ({ email, password }) => void
// - onGoogle        : () => void
// - onGoSignup      : () => void
// - onForgotPassword: () => void
// - isModal         : boolean — 모달 안에서 쓸 때 true (배경/헤더 제거)
function LoginForm({ onSubmit, onGoogle, onGoSignup, onForgotPassword, isModal = false }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const clearError = (field) =>
    setErrors(prev => ({ ...prev, [field]: '' }))

  const validate = () => {
    const newErrors = {}

    if (!email.trim())
      newErrors.email = '이메일을 입력해 주세요.'
    else if (!EMAIL_REGEX.test(email))
      newErrors.email = '잘못된 이메일 형식입니다.'

    if (!password)
      newErrors.password = '비밀번호를 입력해 주세요.'

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setErrors('')
    const normalizedEmail = email.trim().toLowerCase()

    requestHandler({
      method: 'post',
      url: '/user/login',
      payload: {email:normalizedEmail, password},
      setLoading,
      onSuccess: (data) => {
        // TODO: access_token context 저장
        console.log(data)
      },
      onError: (msg) => {
        setServerError(msg)
      }
    })
  }

  const FieldError = ({ field }) =>
    errors[field]
      ? <p className="lf-error" role="alert">{errors[field]}</p>
      : null

  const inner = (
    <div className="lf">
      <form className="lf-form" onSubmit={handleSubmit} noValidate>

        {/* 이메일 */}
        <div className="lf-field">
          <label className="lf-label" htmlFor="lf-email">이메일</label>
          <input
            id="lf-email"
            className={`lf-input${errors.email ? ' invalid' : ''}`}
            type="email"
            maxLength={254}
            value={email}
            onChange={e => { setEmail(e.target.value); clearError('email') }}
            placeholder="이메일을 입력하세요"
            autoComplete="email"
            autoFocus
          />
          <FieldError field="email" />
        </div>

        {/* 비밀번호 */}
        <div className="lf-field">
          <div className="lf-label-row">
            <label className="lf-label" htmlFor="lf-password">비밀번호</label>
            <button type="button" className="lf-forgot-link" onClick={onForgotPassword}>
              비밀번호를 잊으셨나요?
            </button>
          </div>
          <div className="lf-input-wrap">
            <input
              id="lf-password"
              className={`lf-input${errors.password ? ' invalid' : ''}`}
              type={'password'}
              maxLength={50}
              value={password}
              onChange={e => { setPassword(e.target.value); clearError('password') }}
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
            />
          </div>
          <FieldError field="password" />
        </div>

        {serverError && (
          <p className="sf-server-error" role="alert">{serverError}</p>
        )}

        <button
          type="submit"
          className="lf-submit-btn"
          disabled={loading}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>

        <div className="lf-divider">
          <span className="lf-divider-text">또는</span>
        </div>

        <button type="button" className="lf-google-btn" onClick={onGoogle}>
          <GoogleIcon />
          구글 계정으로 로그인
        </button>

      </form>

      {/* 모달에서는 탭으로 전환하므로 안내 문구만 */}
      <p className="lf-footer-text">
        아직 계정이 없으신가요?&nbsp;
        <button type="button" className="lf-text-btn" onClick={onGoSignup}>
          회원가입
        </button>
      </p>

    </div>
  )

  // 페이지로 쓸 때는 배경 래퍼 포함
  if (!isModal) {
    return <div className="lf-page">{inner}</div>
  }

  return inner
}

function GoogleIcon() {
  return (
    <svg className="lf-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default LoginForm
