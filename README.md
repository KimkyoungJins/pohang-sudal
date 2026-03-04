# Pohang Sudal (포항수달) 🦦

> Discover Pohang Like a Local — 외국인 관광객을 위한 포항 로컬 가이드 투어 서비스

**Live Site:** https://pohang-sudal.vercel.app
**GitHub:** https://github.com/KimkyoungJins/pohang-sudal

---

## 프로젝트 개요

포항수달(Pohang Sudal)은 대한민국 포항시를 방문하는 외국인(미국/유럽) 관광객을 대상으로 영어 가이드 투어를 제공하는 관광 스타트업 웹사이트입니다. 운영자는 대한민국 정부 공인 **관광통역안내사** 자격을 보유하고 있습니다.

### 핵심 목표
- OTA(Airbnb Experiences, GetYourGuide 등)에 의존하지 않는 **직접 예약 채널** 확보
- 구글 검색을 통한 **유기적 트래픽 유입** (SEO 최적화 + 블로그 콘텐츠)
- 고객이 사이트에서 직접 **결제까지 완료**할 수 있는 시스템 (Stripe)

---

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 16.1.6 | React 프레임워크 (SSR/SSG, SEO 최적화) |
| **TypeScript** | 5.x | 타입 안정성 |
| **Tailwind CSS** | v4 | 유틸리티 기반 스타일링 (`@theme inline` 문법) |
| **Firebase Auth** | 12.10.0 | Google 소셜 로그인 (Popup 방식) |
| **Firebase Firestore** | 12.10.0 | 예약/설문/리뷰 데이터 저장 |
| **Stripe** | 20.4.0 | 온라인 카드 결제 (Checkout Session) |
| **Resend** | 6.9.3 | 이메일 알림 (예약 시 관리자 + 고객에게 발송) |
| **Vercel** | - | 배포 및 호스팅 |

---

## 전체 기능 목록

### 1. 메인 랜딩 페이지 (`/`)
- **Hero 섹션**: 하늘색→핑크 그라데이션 풀스크린 히어로, 플로팅 애니메이션
- **편집 스타일 소개문**: 세리프 폰트 인용구
- **벤토 그리드 투어 카드**: 5개 투어를 매거진 스타일 레이아웃으로 표시
- **Why Pohang Sudal**: 자격증, 로컬 지식, 맞춤 서비스 3가지 강점
- **설문 CTA**: 그라데이션 배경의 투어 추천 설문 유도
- **고객 리뷰 섹션**: Firebase에서 리뷰 로드 + 샘플 리뷰 표시
- **블로그 미리보기**: 최근 3개 블로그 글 카드

### 2. 투어 목록 (`/tours`)
- 5개 투어 전체 그리드 표시
- 카테고리 필터 배지 (Sunrise, Food, Culture, Nature, Coastal)
- 커스텀 투어 요청 CTA

### 3. 투어 상세 (`/tours/[slug]`)
- SSG로 5개 투어 페이지 사전 생성 (`generateStaticParams`)
- 투어별 고유 그라데이션 히어로
- 설명, 하이라이트, 포함/미포함 사항
- 사이드바: 가격, 시간, 난이도, 예약 버튼
- **고객 리뷰**: 해당 투어 필터링된 리뷰 표시 + 리뷰 작성 폼
- **JSON-LD 구조화 데이터**: `TouristTrip` 스키마

### 4. 스마트 설문 (`/survey`)
- **4단계 위저드 폼**:
  - Step 0: 관심사 다중 선택 (일출, 음식, 역사, 자연, 도시, 사진)
  - Step 1: 투어 길이 (반일/종일/유동적) + 예산 (Under $80 / $80-120 / $120+)
  - Step 2: 그룹 크기 + 체력 수준
  - Step 3: 연락처 정보
- **추천 알고리즘**: 가중 점수 기반 — 관심사(+3), 사진(+2), 체력/시간/예산 조합으로 상위 3개 투어 추천
- 결과를 Firebase Firestore `surveys` 컬렉션에 저장

### 5. 예약 시스템 (`/booking`)
- 필수 필드: 이름, 이메일, 투어 선택, 날짜, 인원 수
- 선택 필드: 전화번호, 국적, 메시지
- **URL 파라미터 연동**: `?tour=homigot-sunrise`로 투어 사전 선택
- **Google 로그인 자동 채우기**: 로그인 시 이름/이메일 자동 입력
- 제출 시: Firestore `bookings` 저장 → `/api/send-email` 호출

### 6. 블로그 (`/blog`, `/blog/[slug]`)
- 3개 SEO 콘텐츠 글:
  - "Top 10 Things to Do in Pohang" (Travel Guide, 8분)
  - "Homigot Sunrise: Complete Guide" (Destination Guide, 6분)
  - "A Foreigner's Guide to Korean Seafood" (Food Guide, 7분)
- **커스텀 마크다운 렌더러**: `##`, `###`, `-` 리스트, `**볼드**`, `[링크](url)`, `---` 구분선 지원
- 투어 페이지로의 **내부 크로스 링크** (SEO 가치)
- `BlogPosting` JSON-LD 스키마

### 7. About 페이지 (`/about`)
- 가이드 자기소개 (관광통역안내사 자격증)
- Why Pohang 4가지 매력 카드 (Coastal Beauty, Seafood, History, Steel City)
- 자격/보증 섹션 (정부 자격증, 보험, 만족 보증)
- CTA: Browse Tours + Contact Me

### 8. 관리자 대시보드 (`/admin`)
- **이메일 기반 접근 제어**: `kkjin722@gmail.com`만 접근 가능
- **예약 관리 탭**: 고객명, 투어, 날짜, 상태 표시 + 상태 변경 (confirmed/cancelled)
- **설문 관리 탭**: 고객 관심사, 여행 일정, 추천 투어 확인
- Firestore에서 실시간 데이터 로드

### 9. Google 인증
- **AuthProvider 컨텍스트**: `signInWithPopup` 기반 Google 로그인
- **에러 처리**: popup-blocked, unauthorized-domain 등 사용자 친화적 에러 메시지
- Navbar에 로그인/프로필 아바타/드롭다운 메뉴 표시
- 모바일 메뉴에도 로그인/로그아웃 기능

### 10. Stripe 결제 (`/api/checkout`)
- `POST` 요청으로 Checkout Session 생성
- 투어명, 가격, 수량, 고객 이메일 받아서 USD 결제 세션 생성
- 결제 성공/취소 시 `/booking` 페이지로 리다이렉트
- **Graceful degradation**: `STRIPE_SECRET_KEY` 미설정 시 에러 대신 안내 메시지 반환

### 11. 이메일 알림 (`/api/send-email`)
- **관리자 이메일**: HTML 테이블 형태로 예약 상세 정보 + 대시보드 링크
- **고객 확인 이메일**: 예약 접수 확인 + 24시간 내 연락 안내
- **Lazy import**: `RESEND_API_KEY` 미설정 시 빌드 에러 없이 스킵

### 12. 실시간 채팅 버튼 (FloatingChat)
- 모든 페이지 우하단 고정 플로팅 버튼
- 3가지 채널: WhatsApp, KakaoTalk, Email
- 그라데이션 토글 버튼 + fadeUp 애니메이션

### 13. SEO 최적화
- **JSON-LD 구조화 데이터**:
  - 루트 레이아웃: `TouristInformationCenter` + 5개 `Offer` (전체 투어 카탈로그)
  - 투어 상세: `TouristTrip` (개별 투어)
  - 블로그 글: `BlogPosting` (각 글)
- **Open Graph + Twitter Card**: 모든 페이지 메타 태그
- **Canonical URL**: `https://pohang-sudal.vercel.app`
- **SSG**: 모든 투어/블로그 페이지 정적 생성 (`generateStaticParams`)
- **키워드**: "Pohang tour guide", "things to do in Pohang", "Homigot sunrise" 등

### 14. Google Analytics
- `NEXT_PUBLIC_GA_ID` 설정 시 GA4 스크립트 자동 삽입
- `afterInteractive` 전략으로 성능 영향 최소화
- 미설정 시 렌더링하지 않음

---

## 디자인 시스템

### 컬러 팔레트
| 색상 | 변수명 | HEX | 용도 |
|------|--------|-----|------|
| Sky Blue | `--color-sky` | `#5eb8f0` | 주요 강조색, 링크, 버튼 |
| Sky Light | `--color-sky-light` | `#a3d5f7` | 호버 상태, 보조 강조 |
| Sky Pale | `--color-sky-pale` | `#e8f4fc` | 배경색, 뱃지 |
| Pink | `--color-pink` | `#f28dac` | 보조 강조색, 레이블 |
| Pink Light | `--color-pink-light` | `#fbb4c9` | 보조 요소 |
| Pink Pale | `--color-pink-pale` | `#fde8ef` | 배경색 |
| Coral | `--color-coral` | `#f7806a` | 경고, 미포함 표시 |
| Lavender | `--color-lavender` | `#c4b5f5` | 문화 카테고리 |
| Mint | `--color-mint` | `#7ed6c3` | 포함 표시, 자연 카테고리 |
| Dark | `--color-dark` | `#2d2d2d` | 텍스트, Footer 배경 |
| Gold | `--color-gold` | `#d4a853` | 보조 장식 |

### 그라데이션
- **Hero Gradient**: `sky → sky-light → pink-light → pink → coral` (135도)
- **버튼/CTA**: `sky → pink` 그라데이션

### 타이포그래피
- **본문**: Geist Sans (Google Fonts)
- **제목**: 시스템 Serif (Georgia, Times New Roman)
- **코드**: Geist Mono

### 애니메이션
- `fadeUp`: 0.8s ease-out, translateY(30px → 0)
- `float`: 4s ease-in-out infinite, translateY(0 → -10px)
- `img-zoom`: hover 시 scale(1.05), 0.7s cubic-bezier

---

## 프로젝트 구조

```
pohang-sudal/
├── src/
│   ├── app/                          # Next.js App Router 페이지
│   │   ├── layout.tsx                # 루트 레이아웃 (Navbar, Footer, Auth, GA, JSON-LD)
│   │   ├── page.tsx                  # 메인 랜딩 페이지
│   │   ├── globals.css               # Tailwind v4 테마 + 커스텀 CSS
│   │   ├── tours/
│   │   │   ├── page.tsx              # 투어 목록
│   │   │   └── [slug]/page.tsx       # 투어 상세 (SSG, 리뷰, JSON-LD)
│   │   ├── blog/
│   │   │   ├── page.tsx              # 블로그 목록
│   │   │   └── [slug]/page.tsx       # 블로그 글 (SSG, 마크다운 렌더러)
│   │   ├── survey/page.tsx           # 설문조사 (투어 추천)
│   │   ├── booking/page.tsx          # 예약/문의
│   │   ├── about/page.tsx            # 가이드 소개
│   │   ├── admin/page.tsx            # 관리자 대시보드 (이메일 보호)
│   │   └── api/
│   │       ├── checkout/route.ts     # Stripe 결제 API
│   │       └── send-email/route.ts   # Resend 이메일 알림 API
│   │
│   ├── components/                   # React 컴포넌트
│   │   ├── AuthProvider.tsx          # Firebase Auth 컨텍스트 + useAuth 훅
│   │   ├── Navbar.tsx                # 스크롤 반응형 네비게이션 + 인증
│   │   ├── Footer.tsx                # 사이트 푸터
│   │   ├── Hero.tsx                  # 풀스크린 히어로 섹션
│   │   ├── TourCard.tsx              # 투어 카드 (default/wide/tall 변형)
│   │   ├── SurveyForm.tsx            # 4단계 설문 위저드 + 추천 알고리즘
│   │   ├── BookingForm.tsx           # 예약 폼 (Auth 자동채우기, Firestore 저장)
│   │   ├── Reviews.tsx               # 리뷰 표시/작성 (Firebase + 샘플 데이터)
│   │   ├── FloatingChat.tsx          # WhatsApp/KakaoTalk/Email 플로팅 버튼
│   │   └── GoogleAnalytics.tsx       # GA4 스크립트 (조건부 렌더링)
│   │
│   └── lib/                          # 데이터 및 유틸리티
│       ├── firebase.ts               # Firebase App/Auth/Firestore 초기화
│       ├── tours.ts                  # 5개 투어 데이터 (Tour 인터페이스)
│       └── blog.ts                   # 3개 블로그 글 데이터 (BlogPost 인터페이스)
│
├── public/images/                    # 이미지 (현재 SVG 플레이스홀더)
├── next.config.ts                    # Google 프로필 이미지 도메인 허용
├── firebase.json                     # Firestore 규칙 파일 경로
├── firestore.rules                   # Firestore 보안 규칙
├── .env.local                        # 환경 변수 (Git 미추적)
├── .env.local.example                # 환경 변수 템플릿
├── FIREBASE_SETUP.md                 # Firebase 설정 가이드 (한국어)
├── DEPLOY_GUIDE.sh                   # 배포 가이드 스크립트
├── package.json                      # 의존성 및 스크립트
└── tsconfig.json                     # TypeScript 설정
```

---

## 데이터 아키텍처

### 정적 데이터 (TypeScript 파일)
투어와 블로그 콘텐츠는 CMS 없이 TypeScript 파일에 직접 정의합니다.

```typescript
// lib/tours.ts — Tour 인터페이스
interface Tour {
  slug: string;           // URL 경로 (예: "homigot-sunrise")
  title: string;          // 투어명
  subtitle: string;       // 부제목
  description: string;    // 상세 설명
  duration: string;       // "4 hours (5:00 AM - 9:00 AM)"
  price: number;          // USD 가격
  groupSize: string;      // "2-8 people"
  highlights: string[];   // 하이라이트 목록
  included: string[];     // 포함 사항
  notIncluded: string[];  // 미포함 사항
  meetingPoint: string;   // 미팅 장소
  difficulty: "Easy" | "Moderate" | "Challenging";
  image: string;          // 이미지 경로
}
```

### 동적 데이터 (Firebase Firestore)
| 컬렉션 | 용도 | 주요 필드 | 접근 권한 |
|--------|------|-----------|-----------|
| `bookings` | 예약 데이터 | name, email, phone, tourSlug, date, groupSize, status, createdAt | 누구나 생성 / 관리자만 읽기·수정 |
| `surveys` | 설문 결과 | interests[], duration, budget, groupSize, fitnessLevel, recommendations[], createdAt | 누구나 생성 / 관리자만 읽기 |
| `reviews` | 고객 리뷰 | name, country, tourSlug, rating, comment, date, createdAt | (규칙 추가 필요) |

### Firestore 보안 규칙
```javascript
function isAdmin() {
  return request.auth != null && request.auth.token.email == 'kkjin722@gmail.com';
}
// surveys, bookings: allow create (public), read/update/delete (admin only)
```

---

## 투어 상품

| # | 투어명 | Slug | 시간 | 가격 | 난이도 | 주요 내용 |
|---|--------|------|------|------|--------|-----------|
| 1 | Homigot Sunrise Tour | `homigot-sunrise` | 4시간 (05:00-09:00) | $89 | Easy | 호미곶 일출, 상생의 손, 한식 아침 |
| 2 | Seafood & Market Tour | `seafood-market` | 3.5시간 (10:00-13:30) | $75 | Easy | 죽도시장, 과메기, 회, 시장 문화 |
| 3 | Guryongpo Heritage Walk | `guryongpo-heritage` | 5시간 (09:00-14:00) | $95 | Easy | 일본인가옥거리, 근대역사관, 해산물 점심 |
| 4 | Temple & Waterfall Hiking | `temple-waterfall-hiking` | 7시간 (08:00-15:00) | $120 | Moderate | 보경사(602년), 내연산 12폭포 |
| 5 | Steel City & Ocean View | `steel-city-ocean-view` | 4.5시간 (13:00-17:30) | $79 | Easy | POSCO, 환호공원 스페이스워크, 영일대 |

---

## 설치 및 실행

### 사전 요구사항
- Node.js 18+
- npm
- Firebase 프로젝트 ([설정 가이드](./FIREBASE_SETUP.md))

### 설치

```bash
git clone https://github.com/KimkyoungJins/pohang-sudal.git
cd pohang-sudal
npm install
```

### 환경 변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local` 파일에 아래 값들을 채워넣으세요:

```env
# Firebase (필수)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Admin (필수)
ADMIN_EMAIL=kkjin722@gmail.com

# Stripe (선택 — 없으면 결제 기능 비활성화)
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# Resend (선택 — 없으면 이메일 알림 비활성화)
RESEND_API_KEY=re_xxx

# Google Analytics (선택 — 없으면 GA 비활성화)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 개발 서버 실행

```bash
npm run dev
# http://localhost:3000 에서 확인
```

### 빌드 및 배포

```bash
npm run build           # 프로덕션 빌드
npx vercel --prod       # Vercel에 배포
```

---

## 외부 서비스 설정 가이드

### Firebase
1. [Firebase Console](https://console.firebase.google.com/)에서 프로젝트 생성
2. Firestore Database 활성화 (서울 리전: `asia-northeast3`)
3. Authentication → Google 제공업체 활성화
4. 프로젝트 설정 → 웹 앱 추가 → SDK 설정 복사
5. `firestore.rules` 배포: `firebase deploy --only firestore:rules`
6. [상세 가이드](./FIREBASE_SETUP.md) 참조

### Stripe
1. [Stripe Dashboard](https://dashboard.stripe.com/)에서 계정 생성
2. API 키 복사 (Publishable Key + Secret Key)
3. Vercel 환경변수에 추가
4. 테스트 모드에서 먼저 테스트 (`sk_test_xxx`, `pk_test_xxx`)

### Resend
1. [Resend](https://resend.com/)에서 계정 생성
2. API Key 발급
3. 발신 도메인 검증 (커스텀 도메인 연결 후)
4. Vercel 환경변수에 `RESEND_API_KEY` 추가

### Google Analytics
1. [GA4](https://analytics.google.com/) 속성 생성
2. 측정 ID 복사 (G-XXXXXXXXXX)
3. Vercel 환경변수에 `NEXT_PUBLIC_GA_ID` 추가

---

## 핵심 아키텍처 결정

### 1. 데이터 저장 이원화
- **정적 콘텐츠** (투어, 블로그): TypeScript 파일에 직접 정의 → 빌드 시 SSG로 정적 페이지 생성. CMS 불필요, 빠른 로딩, SEO 최적화.
- **동적 데이터** (예약, 설문, 리뷰): Firebase Firestore → 실시간 CRUD. 서버리스로 백엔드 관리 불필요.

### 2. Graceful Degradation (선택적 서비스)
Stripe, Resend, GA는 API 키가 없어도 앱이 정상 작동합니다:
- Stripe 미설정 → 결제 대신 안내 메시지 반환
- Resend 미설정 → 이메일 스킵, 예약은 Firestore에 정상 저장
- GA 미설정 → 스크립트 렌더링 안 함

### 3. 이메일 기반 관리자 인증
별도 역할 관리 시스템 없이, Firebase Auth의 이메일과 Firestore 규칙에서 `kkjin722@gmail.com` 하드코딩으로 관리자 판별. MVP 단계에서 충분하며, 추후 역할 시스템으로 확장 가능.

### 4. 마크다운 렌더러 자체 구현
블로그 콘텐츠에 외부 마크다운 라이브러리(remark, MDX 등) 대신 간단한 커스텀 렌더러 사용. `##`, `**`, `[]()`, `-` 리스트만 지원하여 번들 사이즈 최소화.

---

## 현재 상태 및 알려진 제한사항

### 플레이스홀더 (런칭 전 교체 필요)
| 항목 | 현재 값 | 위치 |
|------|---------|------|
| 투어 이미지 | CSS 그라데이션 + 이모지 | `TourCard.tsx`, `tours/[slug]/page.tsx` |
| 전화번호 | `+82-10-XXXX-XXXX` | `Footer.tsx` |
| 이메일 | `hello@pohangsudal.com` | `Footer.tsx`, `FloatingChat.tsx` |
| WhatsApp 번호 | `8210XXXXXXXX` | `FloatingChat.tsx` |
| KakaoTalk 링크 | `open.kakao.com` | `FloatingChat.tsx` |
| Instagram/YouTube | `#` 링크 | `Footer.tsx` |

### 알려진 이슈
- **Google 로그인**: Firebase Identity Toolkit API 활성화 필요 — 미활성화 시 "Sign-in failed" 에러
- **리뷰 Firestore 규칙**: `reviews` 컬렉션에 대한 명시적 보안 규칙이 `firestore.rules`에 미추가
- **이미지**: `lib/tours.ts`에서 `.jpg` 경로를 참조하나, `public/images/`에는 `.svg` 플레이스홀더만 존재

---

## 로드맵

### Phase 1 — 런칭 전 필수
- [ ] 실제 포항 사진 추가 (이모지 → 실사 이미지)
- [ ] Footer 연락처 실제 정보로 교체
- [ ] 커스텀 도메인 구매 및 연결 (pohangsudal.com)
- [ ] Google 로그인 정상 작동 확인
- [ ] Firestore `reviews` 컬렉션 보안 규칙 추가
- [x] SEO 최적화 (JSON-LD, Open Graph)
- [x] WhatsApp/KakaoTalk 채팅 버튼
- [x] 블로그 시스템
- [x] 리뷰/후기 시스템

### Phase 2 — 수익 창출
- [ ] OTA 등록 (Airbnb Experiences, GetYourGuide, Klook)
- [ ] Stripe API 키 설정 및 테스트 결제
- [ ] Resend API 키 발급 및 설정
- [ ] Google Analytics 4 ID 설정
- [x] Stripe 결제 API 구현

### Phase 3 — 성장
- [ ] 블로그 콘텐츠 추가 작성 (포항 여행 가이드 10개+)
- [ ] 다국어 지원 (일본어 — 일본 관광객 타겟)
- [ ] Instagram 연동 + 피드 표시
- [ ] 캘린더 예약 가능일 실시간 표시
- [ ] 고객 리뷰 이메일 요청 자동화

### Phase 4 — 사업 등록 (법적)
- [ ] 사업자등록 (관할 세무서)
- [ ] 여행업 등록 (관할 구청/시청)
- [ ] 보증보험 가입 (여행업 등록 시 필수)
- [ ] 통신판매업 신고 (온라인 결제 시 필수)

---

## 라이선스

All rights reserved. &copy; 2026 Pohang Sudal (포항수달)
