async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Incorrect email or password");
      document.location.reload();
    }
  } else if (!password || !email) {
    alert("You need to provide both: email and password");
  }
}


<<<<<<< HEAD
document.querySelector(".nextbtn").addEventListener("click", loginFormHandler);
=======
document.querySelector("#submit").addEventListener("click", loginFormHandler);
>>>>>>> 26f1144285d5773bc44f66b11e0572aa968ea70e


