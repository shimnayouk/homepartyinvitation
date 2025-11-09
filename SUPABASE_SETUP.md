# Supabase 설정 가이드

## ⚠️ 중요: 반드시 아래 설정을 완료해야 RSVP가 작동합니다!

## 1. Supabase 테이블 생성

### SQL 실행 방법
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택 (viqkuzrksrbejvuiiqvd)
3. 왼쪽 메뉴에서 **SQL Editor** 선택
4. **New query** 클릭
5. 아래 SQL 전체를 복사 후 붙여넣기
6. **RUN** (또는 Ctrl/Cmd + Enter) 클릭

### SQL 코드 (전체 복사)
```sql
-- 기존 테이블이 있다면 삭제 (선택사항)
-- DROP TABLE IF EXISTS rsvp CASCADE;

-- RSVP 테이블 생성
CREATE TABLE IF NOT EXISTS rsvp (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    attendance TEXT NOT NULL,
    companions INTEGER DEFAULT 1,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) 활성화
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있을 경우)
DROP POLICY IF EXISTS "Anyone can insert RSVP" ON rsvp;
DROP POLICY IF EXISTS "Enable insert for anon users" ON rsvp;

-- 누구나 RSVP를 제출할 수 있도록 INSERT 정책 생성
CREATE POLICY "Enable insert for anon users"
ON rsvp
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 선택사항: 인증된 사용자만 RSVP 목록을 볼 수 있도록 SELECT 정책 생성
CREATE POLICY "Enable read for authenticated users only"
ON rsvp
FOR SELECT
TO authenticated
USING (true);
```

## 2. 테이블 생성 확인

SQL 실행 후 왼쪽 메뉴에서:
1. **Table Editor** 클릭
2. `rsvp` 테이블이 보이는지 확인
3. 컬럼 구조 확인:
   - id (int8)
   - name (text)
   - attendance (text)
   - companions (int4)
   - message (text)
   - created_at (timestamptz)

## 3. 웹사이트에서 테스트

1. 웹사이트 접속
2. **F12** 또는 **개발자 도구** 열기
3. **Console** 탭 확인
4. 다음 메시지가 보여야 합니다:
   - ✅ Supabase client initialized
   - ✅ Supabase connection test successful

5. RSVP 폼 작성 후 제출
6. 콘솔에서 다음 확인:
   - 📝 Form submitted
   - 📤 Sending data to Supabase: {...}
   - ✅ RSVP saved successfully: [...]

## 4. 데이터 확인 방법

### 대시보드에서 확인
1. **Table Editor** → `rsvp` 테이블
2. 제출된 데이터 확인

### SQL로 확인
```sql
SELECT * FROM rsvp ORDER BY created_at DESC;
```

## 5. 문제 해결

### "relation rsvp does not exist" 오류
→ SQL 코드를 다시 실행하여 테이블 생성

### "new row violates row-level security policy" 오류
→ RLS 정책 SQL을 다시 실행

### 데이터가 저장되지 않음
→ 브라우저 콘솔에서 에러 메시지 확인 후 알려주세요

## 6. 완료!

설정이 완료되면 웹사이트에서 RSVP 폼이 정상 작동합니다.
