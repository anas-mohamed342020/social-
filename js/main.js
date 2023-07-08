const baseURL = 'https://assignment-5-kappa.vercel.app/'

const userBaseURL = baseURL + 'users'
// const postBaseURL = baseURL + 'posts'

async function signIn(data) {
  let response = await fetch(`${userBaseURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let res = await response.json();
  return res;
}

async function collectDateSignin() {
  let user = $("#user").val();
  let password = $("#password").val();
  let data = {
    user,
    password,
  };
  let res = await signIn(data);
  if (res.message.startsWith('welcome')) {
    localStorage.setItem("_id", res.user._id);
    localStorage.setItem("name", `${res.user.firstName} ${res.user.lastName}`);
    window.location.replace("home.html");
    console.log("Done", res);
  } else {
    alert(res.message);
  }
}

async function signUp(data) {
  let response = await fetch(`${userBaseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let res = await response.json();
  return res;
}

async function collectDateSignup() {
  let email = $("#email").val();
  let userName = $("#name").val();
  let password = $("#password").val();
  let cPassword = $("#cPassword").val();
  let phone = $("#phone").val();
  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();
  let gander = $("#gander").val();
  let age = $("#age").val();

  if (password == cPassword) {
    let data = {
      userName,
      email,
      password,
      firstName,
      lastName,
      gander,
      age,
      phone
    };
    console.log(data);
    let res = await signUp(data);
    if (res.message == "Done") {
      window.location.replace("index.html");
    } else {
      alert(res.message);
    }
  } else {
    alert("password not match");
  }
}

async function forget(email) {
  let response = await fetch("http://localhost:3000/user/sendvcode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  let res = await response.json();
  return res;
}
async function sendCode() {
  let email = $("#email").val();
  data = {
    email,
  };
  if (email) {
    let res = await forget(data);
    if (res.message == "Done check your email") {
      alert(res.message);
      localStorage.setItem("user email", email);
      window.location.replace("forgetpassword.html");
    } else {
      alert(res.message);
    }
  } else {
    alert("Enter your email");
  }
}

async function changePass(data) {
  let response = await fetch("http://localhost:3000/user/changeforget", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let res = await response.json();
  return res;
}

async function collectDateForget() {
  let aCode = $("#activation").val();
  let nPassword = $("#password").val();
  let cnPassword = $("#cpassword").val();
  let email = localStorage.getItem("user email");
  if (nPassword == cnPassword) {
    data = {
      aCode,
      nPassword,
      cnPassword,
      email,
    };
    let res = await changePass(data);
    console.log(res);
    if (res.message == "Done") {
      window.location.replace("index.html");
    } else {
      alert(res.message);
    }
  } else {
    alert("Password and confirm password doesn't match");
  }
}