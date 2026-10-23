# LOGAN — RP World Guide

2026년 미국을 배경으로 한 RP 소개 홈페이지입니다.

## 페이지
- `/`: 세계관, 고정일정, 로건그룹, 로건하우스, 벨 웨더
- `/characters/`: 주연 캐릭터 딘 헤스 로건
- `/supporting/`: 로건하우스 동료와 로건가 가족
- 모든 페이지 가장자리: 벤크로프트 소개 패널

## 구성
- 순수 HTML / CSS / JavaScript. 패키지 설치나 빌드 불필요.
- 외부 폰트, 이미지 서버, 분석 도구에 의존하지 않음.
- `assets/logan-house.svg`: 건축 모티프 일러스트. 확정 건물 도면이 아님.
- `index.html`: 세계관 및 모든 일정 콘텐츠.
- `styles.css`: 공통 반응형 스타일.
- `app.js`: 일정 전환, 패널 제어, 읽던 위치 복원.
- 이미지 원본 비율 유지. 향후 인물 이미지는 width/height를 원본 크기로 설정.
- 연례 일정은 현실 달력 자동 계산이 아닌 제공된 RP 설정 기준.
- 성인 관계 정보는 `/characters/`의 19+ 펼침 영역에 구분하여 표시.

## Vercel
1. GitHub의 `gbe-gif/Of` 저장소를 Import.
2. Framework Preset: `Other`.
3. Root Directory: 저장소 루트.
4. Build Command: 없음. Install Command: 없음.
5. Output Directory: 기본값(루트 `.`).
6. Deploy.

환경변수와 서버 기능은 필요하지 않습니다. 연결한 브랜치에 새 커밋이 반영되면 Vercel의 Git 연동을 통해 배포됩니다.

## 로컬 미리보기
원하는 정적 HTTP 서버로 저장소 루트를 제공하세요. 예: Python이 있는 환경에서 `python -m http.server 4173`.
절대경로 링크를 사용하므로 HTML 파일을 직접 여는 대신 HTTP 서버를 사용합니다.

## 콘텐츠 원칙
설명은 말머리표와 명사형 종결을 사용합니다.
캐릭터는 제공된 설정만 반영하고, 성격유형/성격 키워드/말투 예시는 표시하지 않습니다.
프로필의 나이, 성별, 별명, 생일, 키, MBTI는 정보가 제공된 경우에만 배지로 추가합니다.

Vercel 설정 참고: https://vercel.com/docs/builds/configure-a-build

