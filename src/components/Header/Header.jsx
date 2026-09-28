import { useState, useRef, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { ICONS } from '@/constants/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '@/contexts/AuthContext'
import { NAV_MENU } from '@/constants/navigation'

// === 역할별 헬퍼 함수 ===
// 트리거는 역할 상관없이 동일한 아이콘만 표시하고,
// 닉네임 등 식별 정보는 드롭다운 패널 안에서만 보여준다.
function getIdentityName(user) {
  if (user?.role === 'CREATOR') return user.nickname
  return null  // USER/ADMIN은 별도 표시 이름 없음 → 역할 뱃지로 대체
}

function getRoleLabel(role) {
  if (role === 'CREATOR') return '포즈 제작자'
  if (role === 'ADMIN')   return '관리자'
  return '일반 회원'
}

function getDropdownItems(role, logout) {
  const mypage     = { icon: ICONS.USER,   label: '마이페이지',  action: null }
  const saved      = { icon: ICONS.SAVED,  label: '찜한 포즈',   action: null }
  const upload     = { icon: ICONS.UPLOAD, label: '포즈 업로드', action: null }
  const myUpload   = { icon: ICONS.FOLDER, label: '내 업로드',   action: null }
  const admin      = { icon: ICONS.ADMIN,  label: '관리자 패널', action: null }
  const divider    = null
  const logoutItem = { icon: ICONS.LOGOUT, label: '로그아웃',   action: logout, danger: true }

  const items = {
    USER:    [mypage, saved,                   divider, logoutItem],
    CREATOR: [mypage, saved, upload, myUpload, divider, logoutItem],
    ADMIN:   [admin,  upload,                  divider, logoutItem],
  }

  return items[role] ?? items.USER
}

function Header() {
  // === hooks ===
  const { user, isLoggedIn, logout, openAuthModal } = useAuth()
  const avatarWrapRef = useRef(null)

  // === state ===
  const [currentNav, setCurrentNav] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // === 드롭다운 외부 클릭 감지 ===
  useEffect(() => {
    if (!dropdownOpen) return
    const handleClickOutside = (e) => {
      if (!avatarWrapRef.current?.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  // === dropdown data ===
  const dropdownItems = getDropdownItems(user?.role, logout)

  return (
    <header className="header">
      {/* 로고 */}
      <Link to={PATH.HOME} className="header-logo">Sims4 PoseBox</Link>

      {/* 네비 */}
      <nav className="header-nav">
        {
          NAV_MENU.map((nav) => (
            <Link
              key={nav.id}            
              to={nav.path}
              onClick={() => setCurrentNav(nav.id)}
              className={`nav-link ${currentNav === nav.id ? 'active' : ''}`}
            >
              {nav.label}
            </Link>
          ))
        }
      </nav>

      {/* 인증 영역 */}
      <div className="header-auth">
        {!isLoggedIn ? (
          <button className="btn-login" onClick={() => openAuthModal('login')}>
            로그인
          </button>
        ) : (
          <div className="avatar-wrap" ref={avatarWrapRef}>
            <button
              className="avatar-btn"
              onClick={() => setDropdownOpen(o => !o)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="계정 메뉴"
            >
              <span className="avatar-circle">
                <FontAwesomeIcon icon={ICONS.USER} />
              </span>
              <span className="avatar-caret">▾</span>
            </button>

            {dropdownOpen && (
              <div className="avatar-dropdown">
                {/* 닉네임(CREATOR만) + 역할 뱃지 */}
                <div className="dropdown-role">
                  {getIdentityName(user) && (
                    <span className="dropdown-name">{getIdentityName(user)}</span>
                  )}
                  <span className={`role-badge ${user?.role?.toLowerCase()}`}>
                    {getRoleLabel(user?.role)}
                  </span>
                </div>
                <div className="dropdown-divider" />

                {dropdownItems.map((item, i) =>
                  item === null
                    ? <div key={i} className="dropdown-divider" />
                    : (
                      <button
                        key={item.label}
                        className={`dropdown-item${item.danger ? ' danger' : ''}`}
                        onClick={() => { item.action?.(); setDropdownOpen(false) }}
                      >
                        <span className="di-icon"><FontAwesomeIcon icon={item.icon} /></span>
                        {item.label}
                      </button>
                    )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
