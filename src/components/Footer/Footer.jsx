import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-copy">
        © 2025 PoseBox · 심즈4 포즈 아카이브. 비공식 팬 사이트입니다.
      </p>
      <nav className="footer-links">
        <a href="/notice"     className="footer-link">공지사항</a>
        <a href="/contact"    className="footer-link">문의하기</a>
        <a href="/creator"    className="footer-link">포즈를 올리고 싶으신가요? →</a>
        <a href="/privacy"    className="footer-link">개인정보처리방침</a>
      </nav>
    </footer>
  )
}
