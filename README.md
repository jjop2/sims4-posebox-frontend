# Sims4 PoseBox - Frontend
React 기반으로 개발 중인 Sims4 PoseBox 풀스택 프로젝트입니다.
Sims4의 다양한 포즈들을 인원별, 태그별로 쉽게 검색할 수 있는 사이트로 계획하고 있습니다.
현재 인증(Authentication) 관련 화면을 중심으로 구현하고 있으며, 백엔드(Spring Boot + JWT)와 연동하고 있습니다.

## 기술 스택

* React (Vite)
* React Router
* Context API
* Axios
* FontAwesome

## 구현 기능

* 회원가입 (이메일/비밀번호 기반, 클라이언트 측 Validation 적용)
* 로그인 (JWT Access Token 수신)
* 공통 API 요청 처리 (Axios 인스턴스, 에러 코드 기반 메시지 매핑)
* 로그인/회원가입 팝업(모달) UI

## 진행 예정

* Refresh Token 연동 (백엔드 구현 후)
* OAuth (Google 로그인) 연동
* 인원별 포즈 검색
* 즐겨찾기

---

## Backend Repository

> 🔗 [Backend](https://github.com/jjop2/sims4-posebox-backend.git)

---

> 🚧 This project is under active development.
> Features and documentation will be continuously updated.
