#!/bin/bash
# ============================================
# 포항 수달 (Pohang Sudal) 배포 가이드
# 아래 명령어를 순서대로 실행하세요
# ============================================

echo "🦦 Pohang Sudal 배포 시작!"
echo ""

# ============================================
# STEP 1: Firebase 로그인 & 프로젝트 생성
# ============================================
echo "=== Step 1: Firebase 설정 ==="
echo ""

# 1-1. Firebase 로그인 (브라우저 열림)
firebase login --reauth

# 1-2. Firebase 프로젝트 생성
firebase projects:create pohang-sudal --display-name "Pohang Sudal"

# 1-3. 프로젝트에 웹앱 추가
firebase apps:create WEB "pohang-sudal-web" --project pohang-sudal

# 1-4. 웹앱 설정값 가져오기 (.env.local에 복사할 값)
echo ""
echo "📋 아래 설정값을 .env.local 파일에 복사하세요:"
echo ""
firebase apps:sdkconfig WEB --project pohang-sudal

# 1-5. Firestore 활성화
echo ""
echo "🔥 Firestore를 활성화합니다..."
echo "Firebase 콘솔에서 수동으로 해야 합니다:"
echo "https://console.firebase.google.com/project/pohang-sudal/firestore"
echo "→ 'Create database' 클릭 → 'asia-northeast3 (Seoul)' 선택 → 'Start in test mode'"
echo ""

read -p "Firestore 활성화를 완료했으면 Enter를 누르세요..."

# ============================================
# STEP 2: GitHub 로그인 & 레포 생성
# ============================================
echo ""
echo "=== Step 2: GitHub 설정 ==="
echo ""

# 2-1. GitHub 로그인
gh auth login

# 2-2. GitHub 레포 생성 & push
gh repo create pohang-sudal --public --source=. --remote=origin --push

echo ""
echo "✅ GitHub 레포 생성 완료!"
echo ""

# ============================================
# STEP 3: Vercel 배포
# ============================================
echo ""
echo "=== Step 3: Vercel 배포 ==="
echo ""

# 3-1. Vercel 로그인 & 프로덕션 배포
vercel --prod

echo ""
echo "============================================"
echo "🎉 배포 완료!"
echo ""
echo "다음 단계:"
echo "1. Vercel 대시보드에서 도메인 설정"
echo "2. Vercel 환경변수에 Firebase 키 추가"
echo "3. 실제 사진으로 교체 (/public/images/)"
echo "4. OTA 플랫폼 등록 시작"
echo "============================================"
