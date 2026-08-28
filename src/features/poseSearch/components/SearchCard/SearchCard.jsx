import { useState } from 'react'
import Stepper from '@/features/poseSearch/components/Stepper/Stepper'
import useSearchFilter from '@/features/poseSearch/hooks/useSearchFilter'
import { PEOPLE, ANIMALS, CATEGORIES } from '@/features/poseSearch/poseSearchConstants'
import './SearchCard.css'

// Props
// - onSearch : (filters) => void
//   filters = { keyword, searchCategory, counts, selectedTags }
function SearchCard({ onSearch }) {
  // === hooks ===
  const { counts, selectedTags, setCount, toggleTag, resetAll } = useSearchFilter()

  // === state ===
  const [keyword,         setKeyword]         = useState('')
  const [searchCategory,  setSearchCategory]  = useState('pose')

  // === 활성 필터 칩 목록 ===
  const activeChips = [
    ...Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([key, val]) => {
        const person = [...PEOPLE, ...ANIMALS].find(p => p.key === key)
        return { id: `count-${key}`, label: `${person?.label ?? key} ${val}`, onRemove: () => setCount(key, 0) }
      }),
    ...[...selectedTags].map(tag => ({
      id: `tag-${tag}`,
      label: tag,
      onRemove: () => toggleTag(tag),
    })),
    ...(keyword.trim()
      ? [{ id: 'keyword', label: `"${keyword}"`, onRemove: () => setKeyword('') }]
      : []),
  ]

  const hasAnyFilter = activeChips.length > 0

  // === handlers ===
  const handleSearch = () => {
    onSearch?.({ keyword, searchCategory, counts, selectedTags })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="sc">

      {/* ── 검색어 ── */}
      <div className="sc-section">
        <p className="sc-section-label">검색어</p>
        <div className="sc-keyword">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="6.5" stroke="#9E9E9E" strokeWidth="1.8" />
            <path d="M14 14l3.5 3.5" stroke="#9E9E9E" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            className="sc-keyword-input"
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="포즈명, 제작자명, 태그 입력…"
          />
          <select
            className="sc-keyword-cat"
            value={searchCategory}
            onChange={e => setSearchCategory(e.target.value)}
          >
            <option value="pose">포즈명</option>
            <option value="creator">제작자명</option>
            <option value="tag">태그</option>
          </select>
        </div>
      </div>

      {/* ── 인원 ── */}
      <div className="sc-section">
        <p className="sc-section-label">인원 설정</p>
        <div className="sc-people-grid">
          <div>
            <p className="sc-col-label">사람</p>
            {PEOPLE.map(({ key, label }) => (
              <div key={key} className={`sc-filter-row${counts[key] > 0 ? ' active' : ''}`}>
                <span className="sc-filter-name">{label}</span>
                <Stepper value={counts[key]} onChange={v => setCount(key, v)} />
              </div>
            ))}
          </div>
          <div>
            <p className="sc-col-label">동물</p>
            {ANIMALS.map(({ key, label }) => (
              <div key={key} className={`sc-filter-row${counts[key] > 0 ? ' active' : ''}`}>
                <span className="sc-filter-name">{label}</span>
                <Stepper value={counts[key]} onChange={v => setCount(key, v)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 태그 ── */}
      <div className="sc-section">
        <p className="sc-section-label">태그</p>
        <div className="sc-tag-grid">
          {Object.entries(CATEGORIES).map(([cat, tags]) => (
            <div key={cat}>
              <p className="sc-cat-label">{cat}</p>
              <div className="sc-chips">
                {tags.map(tag => (
                  <button
                    key={tag}
                    className={`sc-chip${selectedTags.has(tag) ? ' selected' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 활성 필터 + 검색버튼 ── */}
      <div className="sc-footer">
        <div className="sc-active-filters">
          {hasAnyFilter
            ? activeChips.map(chip => (
                <button key={chip.id} className="sc-active-chip" onClick={chip.onRemove}>
                  {chip.label} <span className="sc-chip-x">×</span>
                </button>
              ))
            : <span className="sc-no-filter">조건을 선택하면 여기에 표시됩니다</span>
          }
        </div>
        <div className="sc-footer-actions">
          {hasAnyFilter && (
            <button className="sc-reset-btn" onClick={resetAll}>초기화</button>
          )}
          <button className="sc-search-btn" onClick={handleSearch}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="6.5" stroke="white" strokeWidth="2" />
              <path d="M14 14l3.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            검색하기
          </button>
        </div>
      </div>

    </div>
  )
}

export default SearchCard
