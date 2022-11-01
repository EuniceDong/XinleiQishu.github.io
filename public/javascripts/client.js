function MyClientModule() {
  const msgDiv = document.getElementById("messages");
  const authMessage = document.getElementById("authMessage");
  const btn_signup = document.getElementById("btn_signup");
  // const form_signup = document.getElementById("signup_form");
  // const btn_signin = document.getElementById("signup_back");
  // const btn_signup = document.getElementById("signup");
  // const form_signin = document.getElementById("signin_form");
  function checkIfSignError() {
    const urlParams = new URLSearchParams(window.location.search);
    // https://stackoverflow.com/a/901144/18410211
    const params = new Proxy(urlParams, {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    console.log("urlParams", params.auth);

    if (params.auth !== null) {
      msgDiv.style.display = "block";

      if (params.auth === "true") {
        authMessage.innerHTML = "authenticated";
        msgDiv.classList.add("alert-success");
      } else if (params.auth === "false") {
        authMessage.innerHTML = "error authenticating";
        msgDiv.classList.add("alert-danger");
      }
    }
  }

  async function checkIfLoggedIn() {
    console.log("check if logged in");
    const res = await fetch("/getUser");
    const user = await res.json();
    console.log(user);

    const signoutbtn = document.getElementById("signout");
    signoutbtn.onclick = async () => {
      await signout();
    };

    async function signout() {
      await fetch("/signout");
    }

    return user.user !== undefined;
  }

  function userSignUp() {
    // btn_signin.onclick = () => toggle(false, form_signin, form_signup);
    btn_signup.onclick = () => (window.location.href = "../html/signup.html");
  }

  checkIfLoggedIn();
  userSignUp();
}

MyClientModule();
