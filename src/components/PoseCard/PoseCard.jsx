import { useState } from 'react'
import { THUMB_COLORS, THUMB_BG } from '@/features/poseSearch/poseSearchConstants'
import './PoseCard.css'

// 실제 이미지가 없을 때 표시하는 SVG 플레이스홀더
function ThumbPlaceholder({ thumb }) {
  const color = THUMB_COLORS[thumb] ?? THUMB_COLORS['']
  return (
    <svg width="44" height="44" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="28" cy="18" r="8" fill={color} opacity="0.28" />
      <path
        d="M14 44c0-7.7 6.3-14 14-14s14 6.3 14 14"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.28"
      />
    </svg>
  )
}

// Props
// - pose    : 포즈 데이터 객체
// - onFav   : 즐겨찾기 토글 (id) => void
// - favSet  : 즐겨찾기된 id Set
// - onClick : 카드 클릭 핸들러
function PoseCard({ pose, onFav, favSet, onClick }) {
  const [hovered, setHovered] = useState(false)
  const isFaved = favSet?.has(pose.id)
  const bg = THUMB_BG[pose.thumb] ?? THUMB_BG['']

  return (
    <article
      className={`pc${hovered ? ' pc--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick?.(pose.id)}
    >
      <div className="pc-thumb" style={{ background: bg }}>
        <ThumbPlaceholder thumb={pose.thumb} />

        {/* 즐겨찾기 — 우측 하단 */}
        <button
          className={`pc-fav${hovered || isFaved ? ' visible' : ''}`}
          onClick={e => { e.stopPropagation(); onFav?.(pose.id) }}
          aria-label={isFaved ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          {isFaved ? '🩷' : '🤍'}
        </button>
      </div>

      <div className="pc-body">
        <p className="pc-title">{pose.title}</p>
        <p className="pc-creator">by {pose.creator}</p>
        <div className="pc-members">
          {pose.members.map(m => (
            <span key={m} className="pc-badge">{m}</span>
          ))}
        </div>
        <div className="pc-tags">
          {pose.tags.map(t => (
            <span key={t} className="pc-tag">{t}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default PoseCard
