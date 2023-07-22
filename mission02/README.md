# 엘리멘탈 페이지 구현하기

---

엘리멘탈에 나오는 캐릭터들을 클릭했을 때 테두리 추가, 배경색/ 이미지/ 이름 변경, 각각에 맞는 음성이 나오도록 구현하기

---

- [x] 재사용 가능한 함수를 분리하고 함수를 중심으로 설계하는 방법에 대해 학습합니다.

![elemental](https://github.com/jisulee97/js-homework/assets/118723315/6b1b884f-4e97-48a9-b2f3-957c22ef7255)

### 페이지 설명

##### handleSlider 함수로 이벤트 위임 후 함수로 각각의 기능들을 구현하였다.

#### 1. node를 가져오는 변수 설정

```js
const nav = getNode(".nav");
const list = getNodes(".nav li");
const visualImg = getNode(".visual img");
const title = getNode("h1");
```

##### # 사전에 미리 정의된 함수

##### i. getNode 함수 : node를 가져오는 함수

```js
function getNode(node) {
  if (typeof node !== "string") {
    throw new Error("getNode 함수의 인수는 문자 타입 이어야 합니다.");
  }

  return document.querySelector(node);
}
```

##### ii. addClass/ removeClass 함수 : node에 사용된 각각의 클래스들을 추가/ 제거 해주는 함수

```js
function addClass(node, className) {
  if (typeof node === "string") node = getNode(node);
  if (typeof className !== "string") {
    throw new TypeError(
      "addClass 함수의 두 번째 인수는 문자 타입 이어야 합니다."
    );
  }
  node.classList.add(className);
}
```

```js
function removeClass(node, className) {
  if (typeof node === "string") node = getNode(node);
  if (!className) {
    node.className = "";
    return;
  }
  if (typeof className !== "string") {
    throw new TypeError(
      "removeClass 함수의 두 번째 인수는 문자 타입 이어야 합니다."
    );
  }
  node.classList.remove(className);
}
```

#### 2. handleSlider 함수 구현

```js
function handleSlider(e) {
  e.preventDefault();

  const target = e.target.closest("li");

  if (!target) return;

  list.forEach((li) => removeClass(li, "is-active"));

  addClass(target, "is-active");

  const index = target.dataset.index - 1;

  const { color, name, alt } = data[index];

  setBgColor(color);
  setImage(name, alt);
  setNameText(name);
  audioPlay(name);
}
nav.addEventListener("click", handleSlider);
```

- `const target = e.target.closest("li");` : target 에서 가장 가까운 요소를 li 로 지정
- `if (!target) return;` : target 이외의 다른 요소나 공백을 클릭할 경우 그 즉시 함수를 중단시킴
- ```
  list.forEach((li) => removeClass(li, "is-active"));
  addClass(target, "is-active");
  ```
  : list 안의 li 요소들을 forEach 를 이용하여 `is-active` 라는 클래스를 먼저 제거해준 후 target 을 클릭시 그 대상에게만 `is-active` 클래스를 넣어줌
- `const index = target.dataset.index - 1;` : index 값을 찾아오는 변수를 선언한 후 `target.dataset.index` 를 이용하여 각각의 `index` 를 찾아와줌(단, index 는 0 부터 시작하기 때문에 `index-1` 을 꼭 해줘야함!)
- `const { color, name, alt } = data[index];` : 객체의 구조 분해 할당을 이용하여 `data` 안의 각각의 키에게 `index` 값들을 할당해줌
- `nav.addEventListener("click", handleSlider);`: `nav` 에 클릭 이벤트를 걸어준 후 각각 구현한 함수를 실행시킬 수 있도록 이벤트 위임을 걸어줌

#### 3. setImage 함수 구현

```js
function setImage(name, alt) {
  visualImg.src = `./assets/${name}.jpeg`;
  visualImg.alt = alt;
}
```

- `visualImg` 의 assets 안에 있는 이미지 파일들의 숫자값과 alt 를 변경해주는 함수

#### 4. setBgColor 함수 구현

```js
function setBgColor(color) {
  const [a, b] = color;
  document.body.style.background = `linear-gradient(to bottom, ${a},${b})`;
}
```

- `data.js` 안에 있는 color 배열 중 `color` 배열을 구조 분해 할당 후 [a,b] 로 받아주어 `${a}`,`${b}` 로 값을 넣어줌

#### 5. setNameText 함수 구현

```js
function setNameText(name) {
  title.textContent = name;
}
```

- `node` 에서 `h1` 를 가져온 뒤 `title` 변수로 지정 후 `textContent` 속성을 이용하여 `name` 값을 바꿔줌

#### 6. audioPlay 함수 구현

```js
function audioPlay(name) {
  const audio = new AudioPlayer(`assets/audio/${name.toLowerCase()}.m4a`);
  audio.play(name);
}
```

- `new AudioPlayer` 라는 생성자 함수를 만든 후 `audio` 라는 변수에 할당 후 `audio.js` 파일에서 asset 의 값을 변경시
