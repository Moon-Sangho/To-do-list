const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser";
const SHOWING_CN = "showing";

// localStorage에 사용자 이름 저장
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

// 사용자 이름 입력 후 enter 시 localStorage에 저장
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

// 사용자 이름 묻기
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

// 인사말 출력 설정
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}

// localStorage 이름 저장 여부에 따라 사용자 이름 묻기 or 인사말 출력
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();