import SearchCard from '@/features/poseSearch/components/SearchCard/SearchCard'
import './HeroSection.css'

// Props
// - onSearch : (filters) => void
function HeroSection({ onSearch }) {
  return (
    <section className="hero">

      {/* 왼쪽: 문구 */}
      <div className="hero-text">
        <span className="hero-eyebrow">The Sims4 Pose Archive</span>
        <h1 className="hero-title">
          심즈4 포즈를<br />
          인원별로<br />
          빠르게 찾아보세요
        </h1>
        <div className="hero-divider" />
        <p className="hero-sub">
          검색어, 인원, 태그를 한 번에 설정하고<br />
          원하는 포즈를 찾아보세요.
        </p>
      </div>

      {/* 오른쪽: 통합 검색 패널 */}
      <SearchCard onSearch={onSearch} />

    </section>
  )
}

export default HeroSection
