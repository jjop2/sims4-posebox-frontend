// poseSearch 기능 전용 상수

export const PEOPLE = [
  { key: 'male',    label: '남심' },
  { key: 'female',  label: '여심' },
  { key: 'child',   label: '어린이' },
  { key: 'toddler', label: '유아' },
  { key: 'infant',  label: '영아' },
  { key: 'newborn', label: '신생아' },
]

export const ANIMALS = [
  { key: 'dog',    label: '개' },
  { key: 'cat',    label: '고양이' },
  { key: 'horse',  label: '말' },
  { key: 'puppy',  label: '강아지' },
  { key: 'kitten', label: '아기고양이' },
  { key: 'foal',   label: '망아지' },
]

// 고정 카테고리 (관리자 정의)
export const CATEGORIES = {
  관계: ['가족', '친구', '연인', '웨딩'],
  장소: ['실내', '야외'],
  자세: ['스탠딩', '착석(가구)', '착석(바닥)', '눕기'],
  소품: ['있음', '없음'],
}

// 썸네일 플레이스홀더 색상 (실제 이미지 업로드 전까지 사용)
export const THUMB_COLORS = {
  '':      '#C07C84',
  green:   '#5D9E7A',
  amber:   '#D4733B',
  purple:  '#7470AA',
  blue:    '#3A82B0',
}

export const THUMB_BG = {
  '':      '#F6ECED',
  green:   '#EDF5F0',
  amber:   '#FFF4E6',
  purple:  '#F0EEF8',
  blue:    '#E8F2F8',
}

// 목업 데이터 — API 연동 후 제거
export const RECENT_POSES = [
  { id: 1,  title: '커플 데이트 포즈',   creator: 'PoseMakerB',     members: ['남심 1', '여심 1'],                tags: ['연인', '야외'],       thumb: '',       photoCount: 5 },
  { id: 2,  title: '가족 산책 포즈',     creator: 'SimLife Studio',  members: ['남심 1', '여심 1', '영아 1', '개 1'], tags: ['가족', '야외'],    thumb: 'green',  photoCount: 4 },
  { id: 3,  title: '웨딩 촬영 포즈',     creator: 'PoseMakerB',     members: ['남심 1', '여심 1'],                tags: ['웨딩', '실내'],       thumb: 'amber',  photoCount: 8 },
  { id: 4,  title: '반려견과 산책 포즈', creator: 'SimCreator_A',   members: ['여심 1', '개 1'],                  tags: ['야외', '스탠딩'],     thumb: '',       photoCount: 3 },
  { id: 5,  title: '세 자매 포즈',       creator: 'SimLife Studio',  members: ['여심 2', '어린이 1'],              tags: ['가족', '실내'],       thumb: 'purple', photoCount: 6 },
  { id: 6,  title: '독서하는 심 포즈',   creator: 'PoseMakerB',     members: ['남심 1'],                          tags: ['실내', '착석(가구)'], thumb: 'purple', photoCount: 2 },
  { id: 7,  title: '바다 서퍼 포즈',     creator: 'SimCreator_A',   members: ['남심 1'],                          tags: ['야외', '스탠딩'],     thumb: 'blue',   photoCount: 3 },
  { id: 8,  title: '엄마와 아기 포즈',   creator: 'SimLife Studio',  members: ['여심 1', '영아 1'],                tags: ['가족', '실내'],       thumb: 'amber',  photoCount: 5 },
]
