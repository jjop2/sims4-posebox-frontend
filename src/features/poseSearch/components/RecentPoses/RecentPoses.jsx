import { useState } from 'react'
import PoseCard from '@/components/PoseCard/PoseCard'
import { RECENT_POSES } from '@/features/poseSearch/poseSearchConstants'
import '@/features/poseSearch/components/RecentPoses/RecentPoses.css'

// Props
// - isLoggedIn : boolean — 즐겨찾기 기능 활성화 여부
export default function RecentPoses({ isLoggedIn }) {
  const [favSet, setFavSet] = useState(new Set())

  const handleFav = (id) => {
    if (!isLoggedIn) {
      // TODO: 로그인 유도 모달 열기
      return
    }
    setFavSet(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleCardClick = (id) => {
    // TODO: 포즈 상세 모달 열기
  }

  return (
    <section className="recent">
      <div className="recent-inner">
        <div className="recent-header">
          <p className="recent-title">
            최근 등록된 포즈&nbsp;&nbsp;
            <span className="recent-accent">New</span>
          </p>
          <button className="recent-view-all">전체 보기 →</button>
        </div>

        <div className="recent-grid">
          {RECENT_POSES.map(pose => (
            <PoseCard
              key={pose.id}
              pose={pose}
              onFav={handleFav}
              favSet={favSet}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
