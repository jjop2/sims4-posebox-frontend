import SignupSuccess from '../features/auth/components/SignupSuccess/SignupSuccess'

function SignupSuccessPage() {
  const handleGoLogin = () => {
    // TODO: navigate('/login')
  }

  const handleGoCreator = () => {
    // TODO: navigate('/mypage') — 마이페이지 > 제작자 신청으로 이동
  }

  return (
    <SignupSuccess
      username="심즈러버"
      onGoLogin={handleGoLogin}
      onGoCreator={handleGoCreator}
    />
  )
}

export default SignupSuccessPage
