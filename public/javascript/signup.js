async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#psw").value.trim();

  if (username && email && password) {
    console.log(username);
    const response = await fetch("api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/questionnare");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".nextbtn")
  .addEventListener("click", signupFormHandler);


