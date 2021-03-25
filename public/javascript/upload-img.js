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
        window.location.replace("/dashboard");
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

document.querySelector("form").addEventListener("submit", uploadFileHandler);
