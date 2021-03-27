async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#psw").value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/profile/questionnaire');
    } else {
      alert(response.statusText);
    }
  }
}
<<<<<<< HEAD
document.querySelector(".nextbtn").addEventListener("click", signupFormHandler);
=======
document.querySelector("#submit").addEventListener("click", signupFormHandler);
>>>>>>> 26f1144285d5773bc44f66b11e0572aa968ea70e

