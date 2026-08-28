import { useState } from 'react'
import { PEOPLE, ANIMALS } from '@/features/poseSearch/poseSearchConstants'

// 모든 인원/동물 카운트를 0으로 초기화
const initCounts = () =>
  Object.fromEntries([...PEOPLE, ...ANIMALS].map(({ key }) => [key, 0]))

function useSearchFilter() {
  // === states ===
  const [counts, setCounts] = useState(initCounts)
  const [selectedTags, setSelectedTags] = useState(new Set())

  // === handlers ===
  const setCount = (key, value) =>
    setCounts(prev => ({ ...prev, [key]: Math.max(0, value) }))

  const toggleTag = (tag) =>
    setSelectedTags(prev => {
      const next = new Set(prev)
      next.has(tag) ? next.delete(tag) : next.add(tag)
      return next
    })

  const resetAll = () => {
    setCounts(initCounts())
    setSelectedTags(new Set())
  }

  const hasAnyFilter =
    Object.values(counts).some(v => v > 0) || selectedTags.size > 0

  return { counts, selectedTags, setCount, toggleTag, resetAll, hasAnyFilter }
}

export default useSearchFilter
