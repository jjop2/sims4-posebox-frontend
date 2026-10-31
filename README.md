# Sims4 PoseBox - Frontend

심즈4 포즈를 인원별·태그별로 검색할 수 있는 사이트입니다.
포즈 파일을 직접 배포하지 않고, 제작자의 원본 게시글로 연결하는 아카이브 서비스입니다.

개발 진행 중인 프로젝트입니다. 현재는 회원/인증 화면과 메인 페이지 UI를 중심으로 구현했습니다.

> 🔗 [Backend](https://github.com/jjop2/sims4-posebox-backend.git)

## 기술 스택
- React 19, Vite, React Router
- Context API, Axios
- FontAwesome

## 구현 기능
- 회원가입 (이메일/비밀번호, 클라이언트 Validation, 이메일 정규화)
- 로그인 / 로그아웃 (JWT Access Token 수신)
- 로그인 유지: 앱 진입 시 Refresh 요청으로 세션 복원
- Access Token 만료(401) 시 자동 재발급 후 원래 요청 재시도 (Axios Interceptor)
- 공통 API 요청 처리 (Axios 인스턴스, 에러 코드 기반 메시지 매핑)
- 로그인/회원가입 팝업(모달) UI
- 메인 페이지 UI (인원 선택 검색 카드, 최근 포즈 목록 - 목업 데이터)

## 설계 결정
- **Access Token은 메모리(React state), Refresh Token은 httpOnly 쿠키**: XSS로 토큰이 노출될 여지를 최소화
- **토큰 처리를 Axios Interceptor로 일원화**: 인증이 필요한 요청에만(`requiresAuth`) 토큰을 붙이고, 401이면 한 번만 재발급을 시도
- **Axios 인스턴스가 AuthContext를 직접 import하지 않음**: 토큰 getter/setter를 `registerAuthHandlers`로 주입해 순환 의존 방지
- **서버 에러는 ErrorCode 기준으로 메시지 매핑**: 서버 메시지를 그대로 노출하지 않고 프론트에서 정의한 문구 사용

## 실행 방법
1. `npm install`
2. `.env.example`을 `.env.local`로 복사하고 `VITE_SERVER_URL`에 백엔드 주소 입력
3. `npm run dev`

백엔드가 함께 실행 중이어야 로그인/회원가입이 동작합니다. ([Backend](https://github.com/jjop2/sims4-posebox-backend.git) 참고)

## 알려진 한계 / 로드맵
- 비밀번호 찾기: UI만 구현, 서버 연동 전
- Google 로그인: 버튼 UI만 구현, OAuth 연동 전
- 동시에 여러 요청이 401을 받으면 Refresh가 중복 호출될 수 있음 (Refresh Rotation 사용 시 백엔드 경쟁 조건과 함께 개선 예정)
- 포즈 목록은 목업 데이터 (API 연동 후 교체)
- 예정: 인원별·태그별 포즈 검색, 포즈 상세/업로드, 찜 기능
