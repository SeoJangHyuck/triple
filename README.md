# 리액트를 활용한 트리플 페이지 구성

## 1. 프로젝트 실행 방법

<pre>
git clone https://github.com/SeoJangHyuck/triple.git
npm install
npm run start
</pre>

- create-react-app 버전: v5.0.1
- Node.js 버전: v16.15.1
- NPM 버전: v8.11.0

---

## 2. 사용한 기술과 이유

### 2-1) Craco

- 이미지 파일을 절대경로로 import 하기 위하여 시용
- Component에서 복잡한 경로에서 import 할때,<br>상대경로보다 경로를 파악하기 편하여 개발 및 유지보수시 좋기 때문
- [craco.config.js 참고](./craco.config.js)

```javascript
const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
}
```

- [tsconfig.paths.json 참고](./tsconfig.paths.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

### 2-2) styled-reset

- HTML5 시멘틱 요소별 고유 스타일을 제거하고 원하는 스타일로 개발하고자 사용
- [globalStyles.tsx 참고](./src/app/globalStyles.tsx)

```javascript
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
    ${reset};
...
```

### 2-3) SCSS

- CSS를 구조화 하여 표현할 수 있어서 한눈에 스타일을 파악하기 편하여 유지보수에 용이

---

## 3. 기능 설명

### 3-1) 라우팅

- [app.tsx](./src/app/app.tsx) 파일내 라우팅 구현
- 기본 경로와 /intro 이후 붙는 경로는 전부 Intro Component 출력
- 그 밖에 경로에 대해서는 NotFound Component 출력

```javascript
const App = () => (
  <div>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/intro/*" element={<Intro />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
)
```

### 3-2) 등장 애니메이션

- [statistic.scss](./src/app//intro/statistic/statistic.scss)에서 float_ani를 통하여 애니메이션 구현
- position: relative의 속성을 퉁하여 컨텐츠의 위치는 유지한 상태로 위치를 변화시켜 애니메이션 구현

```scss
@keyframes float_ani {
  0% {
    top: 10px;
    opacity: 0;
  }
  100% {
    top: 0px;
    opacity: 1;
  }
}

...

 & > .statistic_standard {
    position: relative;
    ...
    animation: float_ani 0.7s ease-in-out forwards;
 }

```

### 3-2) 카운트 애니메이션

- [statistic.tsx](./src/app//intro/statistic/statistic.tsx)에서 makeTimingFunction()함수에 카운트가 올라가는 delay time을 저장하여 애니메이션 구현

```javascript
// 카운트 애니메이션을 위해서 특정 시간에 이벤트가 발생할수 있도록
// time list를 만드는 함수
// 조건: 증가속도가 확 느려지는 효과 구현 (Ease-Out)
// 마지막 1초의 시간동안 5번의 카운트에서 delay를 100주면서 속도를 확 줄이는 형태
function makeTimingFunction(maxTime: number, maxCount: number) {
  const timeList: number[] = [0]
  let delay = 1
  for (let time = 1; time <= maxTime; time += delay) {
    if (time < maxTime - 1000) {
      delay = (maxTime - 1000) / (maxCount - 5)
    } else {
      delay += 100
    }
    if (time + delay <= maxTime) {
      timeList.push(time)
    }
  }
  timeList.push(maxTime)
  return timeList
}

...

// 여행자 카운트 애니메이션
  useEffect(() => {
    const timeFuncList: any[] = []  // setTimeout clear를 위해 선언
    // delay time list를 for문을 돌면서 이벤트 발생
    makeTimingFunction(maxTime, maxCount.user).forEach((time) => {
      const timeOut = setTimeout(() => {
        setUserCount((c) => c + 1)  // 이벤트 발생
      }, time)
      timeFuncList.push(timeOut)  // setTimeout clear를 위해 저장
    })
    return () => {
      timeFuncList.forEach((timeFunc) => { // setTimeout clear 진행
        clearTimeout(timeFunc)
      })
    }
  }, [])

```

---

## 4. 추가 사항

### 4-1) favicon

- [index.html](./public/index.html) 파일내 트리플 favicon과 관련 meta 태그 작성

### 4-2) 상단정렬

- 홈페이지에서 레이아웃은 상단 정렬이었지만, 현재 코드는 중앙 정렬로 되어있음
- 만양 상단정렬을 하고 싶다면 아래 [statistic.scss](./src/app//intro/statistic/statistic.scss)의 주석을 풀면 상단 정렬이 됨

```scss
& > .statistic_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 33.3333%;
    // margin-bottom: 70px;       // .statistic_info를 상단정렬하고 싶으면 주석을 풀어주세요
```
