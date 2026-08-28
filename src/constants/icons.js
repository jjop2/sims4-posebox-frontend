// 웹 전체에서 사용하는 Font Awesome 아이콘 모음

import {
  faUser,
  faHeart as faHeartSolid,
  faArrowRightFromBracket,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

import {
  faHeart as faHeartRegular,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons'

export const ICONS = {
  USER: faUser,
  SAVED: faHeartSolid,
  UNSAVED: faHeartRegular,
  LOGOUT: faArrowRightFromBracket,
  SHOW: faEye,
  HIDE: faEyeSlash,
  CHECK: faCheck,
  XMARK: faXmark,
}