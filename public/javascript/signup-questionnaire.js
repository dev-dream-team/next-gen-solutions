async function signupQuestionnaireFormHandler(event) {
  event.preventDefault();

  const age = document.querySelector("#age").value;
  const bio = document.querySelector("#bio").value;
  var gender = $("input:checked").val();
  const phone = document.querySelector("#phone").value;

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
    document.location.replace("/profile/more-info");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#submit")
  .addEventListener("click", signupQuestionnaireFormHandler);
