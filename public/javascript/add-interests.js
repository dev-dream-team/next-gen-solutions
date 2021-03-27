async function signupInterestFormHandler(event) {
  event.preventDefault();

  // var interestIds = $("#interest input:checkbox:checked").val();
  var interestIds = [];
  var selectedInterests = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );

  for (var i = 0; i < selectedInterests.length; i++) {
    interestIds.push(parseInt(selectedInterests[i].attributes[3].nodeValue));
  }

  const user = document.querySelector("#user");
  const id = user.getAttribute("data-attr");

  if (!interestIds.length) {
    interestIds = [5]; // corresponds to 'none' option
  }
  const response = await fetch(`/api/userProfiles/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      interestIds,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

async function uploadFileHandler(e) {
  e.preventDefault(); //prevents default behavior, in this case, form submission reloading the page

  const response = await uploadImg();

  if (response.ok) {
    response
      .json()
      .then((data) => {
        setUserProfilePictureId(data);
      })
      .then(() => {
        alert("Your profile picture has been successfully uploaded");
        // window.location.replace("/dashboard");
      });
  } else {
    alert(response.statusText);
    return;
  }
}

const uploadImg = () => {
  const files = document.querySelector("[type=file]").files;
  let file = files[0];
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`/api/upload`, {
    method: "POST",
    body: formData,
  });
};

const setUserProfilePictureId = (resJson) => {
  const userId = resJson.user_id;
  return fetch(`/api/userProfiles/${userId}`, {
    method: "PUT",
    body: JSON.stringify({
      profile_url: resJson.url,
    }),
    headers: { "Content-Type": "application/json" },
  });
};
document
  .querySelector("#finishBtn")
  .addEventListener("click", signupInterestFormHandler);

document.querySelector("form").addEventListener("submit", uploadFileHandler);
