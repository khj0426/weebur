#### 사용 기술

- Next 14.2.25
- 스타일링 : tailwindcss / radix-ui
- 상태관리 : nuqs
- 폼/유효성관리 : react-hook-form / zod
- 서버 상태 관리 : tanstack-query

#### 5월 29일 기록

- next 14.2.25버전으로 초기 세팅 완료 (14버전부터 보안적)
- 과제에 필요한 의존성 설치 완료

#### 페이지 구조 설계

라우트별로 다음과 같은 형태로 구성됩니다.

- models/query-key : useQuery/useSuspenseQuery에서 사용되는 쿼리 키를 관리합니다.
- models/server : 서버 스키마를 관리합니다.
- models.client : zod의 스키마등 서버 스키마가 아닌 것들을 정의합니다.
- hooks : 특정 라우트에서 사용되는 쿼리 파라미터, 쿼리, 뮤테이션을 관리합니다.
- components : 특정 라우트에서 사용되는 컴포넌트들을 정의합니다.

컴포넌트의 분기처리는 `Switcase`컴포넌트를 사용합니다.

useSuspenseQuery 등 suspense와 에러처리를 동시에 하기 위해 `AsyncBoundary`컴포넌트를 사용합니다.

#### radix-ui의 TextField와 react-hook-form사용시 발생한 문제점

react-hook-form에서는 register를 사용하려면 ref를 등록해야 합니다. 하지만 radix-ui의 TextField에는 ref를 주입할 수 없었고, 유효성 검사를 통과해도 오류가 발생했습니다. (invalid-type)

따라서 Controller를 사용하는 방식으로 수정해주었습니다.
