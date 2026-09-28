import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants/regex'
import './SignupForm.css'
import { ICONS } from '@/constants/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import requestHandler from '@/utils/requestHandler'
import { API_PATH } from '@/constants/apiPath'

// Props
// - onSuccess   : () => void — 회원가입 성공 시 호출
// - onGoogle    : () => void
// - onGoLogin   : () => void
// - isModal     : boolean — 모달 안에서 쓸 때 true (배경/헤더 제거)
function SignupForm({ onSuccess, onGoogle, onGoLogin, isModal = false }) {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    else if (password.length > 50)
      newErrors.password = '비밀번호는 50자 미만이어야 합니다.'
    else if (!PASSWORD_REGEX.test(password))
      newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 모두 포함하여 8자 이상 작성해야 합니다.'

    if (!passwordConfirm)
      newErrors.passwordConfirm = '비밀번호를 한 번 더 입력해 주세요.'
    else if (password !== passwordConfirm)
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.'

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setServerError('')
    const normalizedEmail = email.trim().toLowerCase()

    requestHandler({
      method: 'post',
      url: `${API_PATH.USER.SIGNUP}`,
      payload: { email: normalizedEmail, password },
      setLoading,
      onSuccess: () => {
        onSuccess?.()
      },
      onError: (msg) => {
        setServerError(msg)
      },
    })
  }

  const FieldError = ({ field }) =>
    errors[field]
      ? <p className="sf-error" role="alert">{errors[field]}</p>
      : null

  const inner = (
    <div className="sf">

      {!isModal && (
        <div className="sf-header">
          <Link to={PATH.HOME} className="sf-logo">Sims4 PoseBox</Link>
          <p className="sf-sub">Sims4 Pose Archive</p>
        </div>
      )}

      <form className="sf-form" onSubmit={handleSubmit} noValidate>

        {/* 이메일 */}
        <div className="sf-field">
          <label className="sf-label" htmlFor="sf-email">이메일</label>
          <input
            id="sf-email"
            className={`sf-input${errors.email ? ' invalid' : ''}`}
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
        <div className="sf-field">
          <label className="sf-label" htmlFor="sf-password">비밀번호</label>
          <div className="sf-input-wrap">
            <input
              id="sf-password"
              className={`sf-input${errors.password ? ' invalid' : ''}`}
              type={showPassword ? 'text' : 'password'}
              maxLength={50}
              value={password}
              onChange={e => { setPassword(e.target.value); clearError('password') }}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="sf-eye-btn"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              <FontAwesomeIcon icon={showPassword ? ICONS.SHOW : ICONS.HIDE} />
            </button>
          </div>
          <FieldError field="password" />
        </div>

        {/* 비밀번호 확인 */}
        <div className="sf-field">
          <label className="sf-label" htmlFor="sf-pw-confirm">비밀번호 확인</label>
          <div className="sf-input-wrap">
            <input
              id="sf-pw-confirm"
              className={`sf-input${errors.passwordConfirm ? ' invalid' : ''}`}
              type={'password'}
              maxLength={50}
              value={passwordConfirm}
              onChange={e => { setPasswordConfirm(e.target.value); clearError('passwordConfirm') }}
              placeholder="비밀번호를 한 번 더 입력하세요"
              autoComplete="new-password"
            />
            {passwordConfirm && (
              <span className={`sf-match-icon${password === passwordConfirm ? ' ok' : ' ng'}`}>
                <FontAwesomeIcon icon={password === passwordConfirm ? ICONS.CHECK : ICONS.XMARK} />
              </span>
            )}
          </div>
          <FieldError field="passwordConfirm" />
        </div>

        {serverError && (
          <p className="sf-server-error" role="alert">{serverError}</p>
        )}

        <button
          type="submit"
          className="sf-submit-btn"
          disabled={loading}
        >
          {loading ? '가입 중...' : '회원가입'}
        </button>

        <div className="sf-divider">
          <span className="sf-divider-text">또는</span>
        </div>

        <button type="button" className="sf-google-btn" onClick={onGoogle}>
          <GoogleIcon />
          구글 계정으로 가입
        </button>

      </form>

      <p className="sf-footer-text">
        이미 계정이 있으신가요?&nbsp;
        <button type="button" className="sf-text-btn" onClick={onGoLogin}>
          로그인
        </button>
      </p>

    </div>
  )

  if (!isModal) {
    return <div className="sf-page">{inner}</div>
  }

  return inner
}

function GoogleIcon() {
  return (
    <svg className="sf-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default SignupForm
