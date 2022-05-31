// get DOM  elements
// const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Functions

// function to show success border
function showSuccess(input) {
  const icon = input.previousElementSibling.lastElementChild;
  icon.style.color = "green";
  icon.style.visibility = "visible";
  const formCtrl = input.parentElement;
  formCtrl.className = "form-control success";
}
// function to show error border and error message
function showError(input, msg) {
  const formCtrl = input.parentElement;
  formCtrl.className = "form-control error";
  const small = formCtrl.querySelector("small");
  small.innerText = msg;
  const icon = input.previousElementSibling.lastElementChild;
  icon.style.color = "green";
  icon.style.visibility = "hidden";
}
// function to check email format
function checkEmail(input) {
  //regular expression to check email validity inspired from stackoverflow
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let valid = String(input.value).toLowerCase().match(re);
  if (!valid) {
    showError(input, "Email is not valid");
  } else {
    showSuccess(input);
  }
}

// Function to check required lengths of fields
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be minimum ${min} characters`
    );
  } else if (input.value.lenght > max) {
    showError(
      input,
      `${getFieldName(input)} must be maxmimum ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
// Function to check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  } else {
    showSuccess(input2);
  }
}

// Function to check required input
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (!input.value) {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// function to get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners
//1. event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkEmail(email);
  checkLength(username, 3, 10);
  checkLength(password, 6, 15);
  checkPasswordsMatch(password, password2);
});
