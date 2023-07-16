const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

const re = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/,
};

const inputId = document.querySelector("#userEmail");
const passWord = document.querySelector("#userPassword");
const loginButton = document.querySelector(".btn-login");

/*
1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리
*/

function checkReg(text, reKey) {
  return re[reKey].test(String(text).toLowerCase());
}

function classToggle(tag, value) {
  if (value) {
    tag.classList.remove("is--invalid");
  } else tag.classList.add("is--invalid");
}

function onChangeInput(tag, reKey) {
  let value = checkReg(tag.value, reKey);

  classToggle(tag, value);
}

inputId.addEventListener("input", () => onChangeInput(inputId, "email"));

passWord.addEventListener("input", () => onChangeInput(passWord, "password"));

function onLogin(e) {
  e.preventDefault(); // 버튼의 submit 이벤트가 작동되는것을 막기 위한 코드
  if (inputId.value === user.id && passWord.value === user.pw) {
    window.location.href = "welcome.html";
  } else alert("아이디와 비밀번호가 일치하지 않습니다.");
}

loginButton.addEventListener("click", onLogin);
