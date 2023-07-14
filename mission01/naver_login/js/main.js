const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

const inputId = document.querySelector("#userEmail");
const passWord = document.querySelector("#userPassword");
const loginButton = document.querySelector(".btn-login");

inputId.addEventListener("input", () => {
  let idValue = emailReg(inputId.value);
  if (idValue) {
    inputId.classList.remove("is--invalid");
  } else inputId.classList.add("is--invalid");
});

passWord.addEventListener("input", () => {
  let passwordValue = pwReg(passWord.value);
  if (passwordValue) {
    passWord.classList.remove("is--invalid");
  } else passWord.classList.add("is--invalid");
});

loginButton.addEventListener("click", (e) => {
  e.preventDefault(); // 버튼의 submit 이벤트가 작동되는것을 막기 위한 코드
  if (inputId.value === user.id && passWord.value === user.pw) {
    window.location.href = "welcome.html";
  } else alert("아이디와 비밀번호가 일치하지 않습니다.");
});
