import { AuthProvider } from '@/contexts/AuthContext'
import Router from '@/router/Router'
import AuthModal from '@/features/auth/components/AuthModal/AuthModal'

function App() {
  return (
    <AuthProvider>
      <Router />
      {/* 앱 최상단에 한 번만 렌더링 — 어디서 openAuthModal()을 호출해도 표시됨 */}
      <AuthModal />
    </AuthProvider>
  )
}

export default App
