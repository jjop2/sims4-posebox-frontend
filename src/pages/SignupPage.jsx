import SignupForm from '@/features/auth/components/SignupForm/SignupForm'

function SignupPage() {
  const handleSubmit = ({ username, password, email }) => {
    // TODO: POST /api/auth/signup
    console.log('signup:', { username, password, email })
  }

  const handleGoogle = () => {
    // TODO: window.location.href = '/oauth2/authorization/google'
  }

  const handleGoLogin = () => {
    // TODO: navigate('/login')
  }

  return (
    <SignupForm
      onSubmit={handleSubmit}
      onGoogle={handleGoogle}
      onGoLogin={handleGoLogin}
    />
  )
}

export default SignupPage
