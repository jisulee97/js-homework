const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

/*

1. email 정규표현식을 사용한 조건처리 
   - false면 해당 input에 is--invalid 추가
   - true면 해당 input에 is--invalid 제거

2. pw 정규표현식을 사용한 validation
   - false면 해당 input에 is--invalid 추가
   - true면 해당 input에 is--invalid 제거

3. 로그인 버튼을 클릭시 user.id의 값과 input의 값을 비교
4. 로그인 버튼을 클릭시 user.pw의 값과 input의 값을 비교


5. 두 값이 일치 한다면 다음 페이지(welcome.html)로 이동

*/

// @ 기호 포함, .포함 이후 2글자 이상
function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

// 최소 6글자 이상, 0~9숫자 1개 이상 포함, 특수기호 1개 이상 포함
function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

const emailInput = document.querySelector("#userEmail");
const pwInput = document.querySelector("#userPassword");
const loginButton = document.querySelector(".btn-login");

let emailPass = false;
let pwPass = false;

// 태그가 가지고있는 고유한 능력 x

function handleCheckEmail() {
  const value = this.value;

  if (emailReg(value)) {
    this.classList.remove("is--invalid");
    emailPass = true;
  } else {
    this.classList.add("is--invalid");
    emailPass = false;
  }
}

function handleCheckPw() {
  const value = this.value;

  if (pwReg(value)) {
    this.classList.remove("is--invalid");
    pwPass = true;
  } else {
    this.classList.add("is--invalid");
    pwPass = false;
  }
}

function handleLogin(e) {
  e.preventDefault();

  if (emailPass && pwPass) {
    try {
      const id = emailInput.value;
      const pw = pwInput.value;

      const getUserId = user.id;
      const getUserPw = user.pw;

      if (id === getUserId && pw === getUserPw) {
        window.location.href = "welcome.html";
      } else {
        console.log("정확한 아이디와 비밀번호를 입력해 주세요.");
      }
    } catch (e) {
      alert(e.message);
    }
  } else {
    console.log("정확한 아이디와 비밀번호를 입력해 주세요.");
  }
}

emailInput.addEventListener("input", handleCheckEmail);
pwInput.addEventListener("input", handleCheckPw);
loginButton.addEventListener("click", handleLogin);
