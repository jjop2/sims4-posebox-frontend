import './SignupSuccess.css'

// Props
// - onGoLogin   : () => void
// - onGoCreator : () => void
function SignupSuccess({ onGoLogin, onGoCreator }) {
  return (
    <div className="ss">
      <span className="ss-icon" aria-hidden="true">🎉</span>

      <h2 className="ss-title">가입을 환영해요!</h2>
      <p className="ss-desc">
        PoseBox 회원이 되셨어요.<br />
        이제 원하는 포즈를 찾고 즐겨찾기 해보세요.
      </p>

      <button className="ss-login-btn" onClick={onGoLogin}>
        로그인하러 가기
      </button>

      <div className="ss-creator-wrap">
        <p className="ss-creator-label">포즈 제작자이신가요?</p>
        <button className="ss-creator-btn" onClick={onGoCreator}>
          제작자 등록 신청하기 →
        </button>
      </div>
    </div>
  )
}

export default SignupSuccess
