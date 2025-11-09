# Supabase 설정 가이드

## 1. Supabase 테이블 생성

Supabase 대시보드에서 다음 SQL을 실행하여 `rsvp` 테이블을 생성하세요.

### SQL 실행 방법
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택
3. 왼쪽 메뉴에서 **SQL Editor** 선택
4. **New query** 클릭
5. 아래 SQL 복사 후 붙여넣기
6. **RUN** 클릭

### SQL 코드
```sql
-- RSVP 테이블 생성
CREATE TABLE rsvp (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    attendance TEXT NOT NULL,
    companions INTEGER DEFAULT 1,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) 활성화
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

-- 모든 사람이 데이터를 삽입할 수 있도록 정책 생성 (읽기는 제한)
CREATE POLICY "Anyone can insert RSVP"
ON rsvp
FOR INSERT
TO anon
WITH CHECK (true);

-- 관리자만 조회 가능하도록 설정 (선택사항)
-- CREATE POLICY "Admins can view all RSVPs"
-- ON rsvp
-- FOR SELECT
-- TO authenticated
-- USING (true);
```

## 2. 데이터 확인 방법

### 대시보드에서 확인
1. 왼쪽 메뉴에서 **Table Editor** 선택
2. `rsvp` 테이블 선택
3. 제출된 RSVP 데이터 확인

### SQL로 확인
```sql
SELECT * FROM rsvp ORDER BY created_at DESC;
```

## 3. 완료!

이제 웹사이트에서 RSVP 폼을 작성하면 Supabase에 자동으로 저장됩니다.
