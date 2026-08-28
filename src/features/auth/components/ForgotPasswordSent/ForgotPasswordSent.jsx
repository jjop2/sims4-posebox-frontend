import './ForgotPasswordSent.css'

// Props
// - email         : string  — 재설정 링크를 받은 이메일
// - onResend      : () => void
// - onBackToLogin : () => void
function ForgotPasswordSent({ email, onResend, onBackToLogin }) {
  return (
    <div className="fps">
      <span className="fps-icon" aria-hidden="true">📩</span>

      <h2 className="fps-title">메일을 보냈어요</h2>
      <p className="fps-desc">
        {email && <><strong>{email}</strong>로<br /></>}
        비밀번호 재설정 링크를 보내드렸어요.<br />
        메일함을 확인해주세요.
      </p>

      <button className="fps-login-btn" onClick={onBackToLogin}>
        로그인으로 돌아가기
      </button>

      <p className="fps-resend-text">
        메일을 받지 못하셨나요?&nbsp;
        <button type="button" className="fps-resend-btn" onClick={onResend}>
          다시 보내기
        </button>
      </p>
    </div>
  )
}

export default ForgotPasswordSent
