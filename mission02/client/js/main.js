/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

const nav = getNode(".nav");
const list = getNodes(".nav li");
const visualImg = getNode(".visual img");
const title = getNode("h1");

// 함수 분리

function setImage(name, alt) {
  visualImg.src = `./assets/${name}.jpeg`;
  visualImg.alt = alt;
}

function setBgColor(color) {
  const [a, b] = color;
  document.body.style.background = `linear-gradient(to bottom, ${a},${b})`;
}

function setNameText(name) {
  title.textContent = name;
}

function audioPlay(name) {
  const audio = new AudioPlayer(`assets/audio/${name.toLowerCase()}.m4a`);
  audio.play(name);
}

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
