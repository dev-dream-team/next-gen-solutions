// async function handleLogout() {
//   const response = await fetch("/api/users/logout", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//   });
//   if (response.ok) {
//     document.location.replace("/login");
//   } else {
//     alert.response(response.statusText);
//   }
// }
// function checkIfSessionIsActive() {
//   setInterval(
//     function () {
//       fetch("/api/session").then((resp) => {
//         if (!resp.ok) {
//           alert(
//             "You've been logged out, please re-login to access your dashboard"
//           );
//           location.replace("/login");
//         }
//       });
//     },
//     30010 //30.01 seconds
//   );
// }

// checkIfSessionIsActive();

// document.querySelector("#logout").addEventListener("click", handleLogout);


async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logout').addEventListener('click', logout);