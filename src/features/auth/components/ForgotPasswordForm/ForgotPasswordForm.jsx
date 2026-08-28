import { useState } from 'react'
import { EMAIL_REGEX } from '@/constants/regex'
import './ForgotPasswordForm.css'

// Props
// - onSubmit       : (email) => void
// - onBackToLogin  : () => void
function ForgotPasswordForm({ onSubmit, onBackToLogin }) {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  const clearError = (field) =>
    setErrors(prev => ({ ...prev, [field]: '' }))

  const validate = () => {
    const newErrors = {}

    if (!email.trim())
      newErrors.email = '이메일을 입력해 주세요.'
    else if (!EMAIL_REGEX.test(email))
      newErrors.email = '잘못된 이메일 형식입니다.'

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    onSubmit?.(email)
  }

  const FieldError = ({ field }) =>
    errors[field]
      ? <p className="fpf-error" role="alert">{errors[field]}</p>
      : null

  return (
    <div className="fpf">
      <p className="fpf-desc">
        비밀번호 재설정 링크를 받을<br />
        이메일 주소를 입력해 주세요.
      </p>

      <form className="fpf-form" onSubmit={handleSubmit} noValidate>
        <div className="fpf-field">
          <label className="fpf-label" htmlFor="fpf-email">이메일</label>
          <input
            id="fpf-email"
            className={`fpf-input${errors.email ? ' invalid' : ''}`}
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

        <button type="submit" className="fpf-submit-btn">재설정 링크 보내기</button>
      </form>

      <button type="button" className="fpf-back-btn" onClick={onBackToLogin}>
        ← 로그인으로 돌아가기
      </button>
    </div>
  )
}

export default ForgotPasswordForm
