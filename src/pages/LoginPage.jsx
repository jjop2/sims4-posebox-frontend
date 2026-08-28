import { useNavigate } from 'react-router-dom'
import LoginForm from '../features/auth/components/LoginForm/LoginForm'
import { PATH } from '@/constants/path'

function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = ({ loginId, password }) => {
    // TODO: POST /api/auth/login
    console.log('login:', { loginId, password })
  }

  const handleGoogle = () => {
    // TODO: window.location.href = '/oauth2/authorization/google'
  }

  const handleGoSignup = () => {
    navigate(PATH.SIGNUP)
  }

  return (
    <LoginForm
      onSubmit={handleSubmit}
      onGoogle={handleGoogle}
      onGoSignup={handleGoSignup}
    />
  )
}

export default LoginPage
