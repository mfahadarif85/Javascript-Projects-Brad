// get DOM  elements
// const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Functions
// 1. function to show success border
function showSuccess(input) {
  const formCtrl = input.parentElement;
  formCtrl.className = "form-control success";
}
//2. function to show error border and error message
function showError(input, msg) {
  const formCtrl = input.parentElement;
  formCtrl.className = "form-control error";
  const small = formCtrl.querySelector("small");
  small.innerText = msg;
}
//3. function to check email format
function checkEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

// Event Listeners
//1. event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!username.value) {
    showError(username, "Username is required");
  } else if (username.value.length < 3 || username.value.length > 10) {
    showError(username, "Username should be between 3 to 10 characters");
  } else {
    showSuccess(username);
  }
  if (!email.value) {
    showError(email, "Email is required");
  } else if (!checkEmail(email.value)) {
    showError(email, "Email is not valid");
  } else {
    showSuccess(email);
  }
  if (!password.value) {
    showError(password, "Passwod is required");
  } else if (password.value.length < 6 || password.value.lenghth > 20) {
    showError(password, "Password should be between 3 to 20 characters");
  } else {
    showSuccess(password);
  }
  if (!password2.value) {
    showError(password2, "Confirm Password is required");
  } else if (password2.value !== password.value) {
    showError(password2, "Passwords should match");
  } else {
    showSuccess(password2);
  }
});
