import Header from '@/components/Header'
import Footer     from '@/components/Footer'
import HeroSection  from '@/features/poseSearch/components/HeroSection'
import RecentPoses  from '@/features/poseSearch/components/RecentPoses'
import { useAuth } from '@/contexts/AuthContext'

function HomePage() {
  // === hooks ===
  const { isLoggedIn } = useAuth()

  const handleSearch = (filters) => {
    // TODO: 검색 결과 페이지로 이동 (react-router navigate 등)
    // console.log('search filters:', filters)
  }

  return (
    <>
      <Header/>
      <main>
        <HeroSection onSearch={handleSearch} />
        <RecentPoses isLoggedIn={isLoggedIn} />
      </main>
      <Footer />
    </>
  )
}

export default HomePage