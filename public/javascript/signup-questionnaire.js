async function signupQuestionnaireFormHandler(event) {
  event.preventDefault();

  const age = document.querySelector("#age").value;
  const bio = document.querySelector("#bio").value;
  var gender = $("input:checked").val();
  const phone = document.querySelector("#phone").value;

<<<<<<< HEAD
  // const id = window.location.toString().split("/")[
  //   window.location.toString().split("/").length - 1
  // ];
=======
>>>>>>> 26f1144285d5773bc44f66b11e0572aa968ea70e
  const user = document.querySelector("#user");
  const id = user.getAttribute("data-attr");

  const response = await fetch(`/api/userProfiles/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      age,
      bio,
      gender,
      phone,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
<<<<<<< HEAD
    document.location.replace("/profile/upload-img");
=======
    document.location.replace("/profile/more-info");
>>>>>>> 26f1144285d5773bc44f66b11e0572aa968ea70e
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".nextbtn")
  .addEventListener("click", signupQuestionnaireFormHandler);
